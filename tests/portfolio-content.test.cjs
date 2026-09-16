const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const root = resolve(__dirname, '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const script = readFileSync(resolve(root, 'assets/js/script.js'), 'utf8');
const section = id => {
    const match = html.match(new RegExp(`<section id="${id}"[^>]*>([\\s\\S]*?)</section>`));
    assert.ok(match, `Missing section: ${id}`);
    return match[1];
};
const resume = section('resume');
const about = section('about');
const entries = [...resume.matchAll(/<li class="rt-item[^\"]*" data-cat="([^\"]*)">([\s\S]*?)<\/li>/g)];

test('NTT DATA is the latest experience, with dates, curricular status and project context', () => {
    assert.equal(entries[0][1], 'exp');
    for (const text of ['NTT DATA Green Engineering', 'jun 2026 – ago 2026', 'Prácticas curriculares', 'Oviedo', 'React', 'Iberdrola', 'subestaciones eléctricas']) {
        assert.ok(entries[0][2].includes(text), `Missing NTT DATA detail: ${text}`);
    }
    assert.doesNotMatch(entries[0][2], /extracurriculares|\d+\s+horas/i);
    assert.ok(resume.includes('Cirque du Soleil'));
    assert.ok(resume.includes('INGenium VisionAI'));
});

test('About reflects the final degree stage and aviation context without implying an Indra job', () => {
    for (const text of ['fase final', 'modalidad bilingüe', 'NTT DATA', 'React', 'Iberdrola', 'VATSIM', 'FlyByWire', 'ADS-B', 'Aeroingenium', 'ATM']) {
        assert.ok(about.includes(text), `Missing profile detail: ${text}`);
    }
    assert.doesNotMatch(resume + about, /[Cc]uarto (año|curso)/);
    assert.ok(about.includes('Quiero orientar mi carrera'));
});

test('Skills include React and .NET without the old routing-focused labels', () => {
    assert.ok(about.includes('<span>React</span>'));
    assert.ok(about.includes('<span>.NET</span>'));
    assert.ok(about.includes('PyTorch · OpenCV (intro)'));
    assert.doesNotMatch(about, /Routing &amp; switching|OSI \/ TCP-IP/);
});

test('Hero uses the optimized replacement portrait in both themes and preloads it', () => {
    const asset = readFileSync(resolve(root, 'assets/images/mario-hero.webp'));
    assert.equal(asset.toString('ascii', 0, 4), 'RIFF');
    assert.equal(asset.toString('ascii', 8, 12), 'WEBP');
    assert.ok(asset.length < 200_000, 'Hero should stay lightweight');
    assert.match(html, /rel="preload" as="image" href="assets\/images\/mario-hero\.webp"/);
    for (const name of ['style.css', 'theme-v2.css']) {
        const css = readFileSync(resolve(root, 'assets/css', name), 'utf8');
        assert.ok(css.includes("url('../images/mario-hero.webp')"));
        assert.ok(!css.includes("url('../images/mario.jpg')"));
    }
    const theme = readFileSync(resolve(root, 'assets/css/theme-v2.css'), 'utf8');
    assert.match(theme, /@media \(max-width: 768px\)[\s\S]*?--portrait-position: 74% center;/);
});

test('Hero name has an explicit gap, wraps and retains the intended Fraunces font', () => {
    const theme = readFileSync(resolve(root, 'assets/css/theme-v2.css'), 'utf8');
    const name = theme.match(/\.theme-v2 \.hero-name \{([^}]+)\}/)[1];
    assert.ok(html.includes('<span>Mario</span> <em>Rodríguez</em>'));
    assert.ok(html.includes('family=Fraunces:ital,opsz,wght@'));
    assert.match(theme, /--serif: 'Fraunces'/);
    for (const declaration of ['font-family: var(--serif)', 'flex-direction: row', 'flex-wrap: wrap', 'column-gap: 0.20em']) {
        assert.ok(name.includes(declaration), `Missing name layout rule: ${declaration}`);
    }
    assert.doesNotMatch(theme, /align-self: left/);
});

test('Portrait is smaller and more opaque independently of the text and background', () => {
    const theme = readFileSync(resolve(root, 'assets/css/theme-v2.css'), 'utf8');
    const portrait = theme.match(/\.theme-v2 \.hero-bg::before \{([^}]+)\}/)[1];
    assert.ok(portrait.includes('inset: 6% 0 6% 10%'));
    assert.ok(portrait.includes('transform: scale(0.69)'));
    assert.ok(portrait.includes('opacity: 1'));
    assert.ok(portrait.includes('mask-composite: intersect'));
});

test('Actual resume filter handler includes NTT DATA in experience and retains other categories', () => {
    // Run the existing filter against small DOM doubles: no browser dependency needed.
    const makeNode = attrs => {
        const classes = new Set();
        return {
            classes,
            getAttribute: key => attrs[key],
            addEventListener(type, handler) { this[type] = handler; },
            classList: {
                add: cls => classes.add(cls),
                remove: cls => classes.delete(cls),
                toggle: (cls, state) => state ? classes.add(cls) : classes.delete(cls)
            }
        };
    };
    const buttons = ['all', 'award', 'exp', 'edu', 'cert'].map(value => makeNode({ 'data-rf': value }));
    const items = entries.map(entry => makeNode({ 'data-cat': entry[1] }));
    const context = vm.createContext({
        window: { addEventListener() {} },
        document: {
            addEventListener() {}, // Do not initialize unrelated page effects.
            querySelectorAll: selector => selector === '.rf-btn' ? buttons : items
        }
    });
    vm.runInContext(script, context);
    vm.runInContext('initResumeFilters()', context);
    for (const button of buttons) {
        button.click();
        const filter = button.getAttribute('data-rf');
        items.forEach((item, i) => {
            const visible = filter === 'all' || entries[i][1].split(/\s+/).includes(filter);
            assert.equal(!item.classes.has('is-hidden'), visible);
        });
        assert.ok(button.classes.has('active'));
        assert.equal(buttons.filter(b => b.classes.has('active')).length, 1);
    }
});

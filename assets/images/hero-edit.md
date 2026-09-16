# Homepage portrait update

- Date: 2026-09-16.
- Active asset: `mario-hero.webp` (1711 × 919, optimized WebP).
- Edit target: the new user-supplied smiling portrait, `imagen.jpeg`.
- Style reference: the previous `mario.jpg` hero background, retained unchanged for reversibility.
- Method: built-in image generation/editing tool; WebP encoding with Sharp.
- Intent: retain the new portrait's identity, smile and uniform, with near-monochrome grading, a dark seamless background and the subject on the right. HTML copy and page UI are not baked into the image.
- Integration: existing warm/cool overlays and bottom fade retained; top-aligned desktop background and a mobile crop with stronger shading for text readability.
- Review: edited asset inspected visually; automated asset/reference/filter checks. A full browser-rendered review was not available in this environment.

## Exact edit prompt

Use case: identity-preserve. Asset type: production-ready wide photographic background for an existing dark cinematic personal portfolio website, NOT a website screenshot. Edit input image 1 (new smiling portrait in black uniform and tie). Input image 2 is ONLY a reference for wide framing, right-hand subject placement, near-monochrome grading and near-black seamless background; do NOT use its face, hairstyle, pose, expression or t-shirt. Preserve EXACTLY the identity and facial proportions, natural smiling expression and visible teeth, hairstyle, gaze, black jacket, tie, white shirt, and shoulder embroidery of the man in image 1. This is photographic retouching, relighting and background replacement, not a new portrait. Remove the grey wall and replace with a nearly black charcoal seamless studio background (#09090a), very subtle depth. Wide landscape canvas approximately 1.86:1 (prefer 2560x1376 or similar). Left 58% is uninterrupted almost-black negative space for existing HTML text. Place portrait on right: face centered at approximately 77% width, full hair visible with safe margin near top, head from about 10% to 62% height, shoulders and upper torso continuing to bottom. Preserve pose; scale/crop/reposition only. Match the restrained moody low-key black-and-white editorial lighting of image 2; subdued highlights, natural skin texture, soft directional face illumination, left cheek slightly darker, no harsh halo or hard cutout edges. The dark jacket and lower torso blend gradually into black toward bottom and sides; keep the white shirt and teeth softly lit rather than glowing. Produce moderately legible face because the website applies additional dark gradient overlays. No typography, logos, UI, buttons, code symbols, orange decoration, borders, watermarks, extra people or objects. The only source of identity and clothing is image 1.

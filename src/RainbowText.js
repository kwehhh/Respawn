import Spawn from './Spawn.js';

const DEFAULT_INTERVAL_SPEED = 150;

function toHsl(h, s, l) {
  return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;
}

function generateRainbowColors(count, { saturation, lightness, hueOffset } = {}) {
  const safeCount = Math.max(1, Number(count) || 1);
  const s = typeof saturation === 'number' ? saturation : 100;
  const l = typeof lightness === 'number' ? lightness : 50;
  const offset = typeof hueOffset === 'number' ? hueOffset : 0;

  const step = 360 / safeCount;
  return Array.from({ length: safeCount }, (_, i) => toHsl(offset + i * step, s, l));
}

/**
 * RainbowText
 * A small, reusable "Technologic"-style text effect:
 * per-character spans + rotating color palette.
 *
 * Returns a DOM element (so it composes naturally with `Spawn` children).
 * Adds `__respawnCleanup()` for `Unmount` to call.
 */
export default function RainbowText(options = {}) {
  const {
    text = '',
    intervalSpeed = DEFAULT_INTERVAL_SPEED,
    style,
    className,
    tag = 'span',
    saturation = 100,
    lightness = 50,
    hueOffset = 0,
  } = options;

  const value = String(text);
  const chars = value.split('');
  const colors = generateRainbowColors(chars.length, { saturation, lightness, hueOffset });

  const spans = chars.map((ch) =>
    Spawn({
      tag: 'span',
      // Use white-space: pre on the parent; keep children raw
      children: ch,
      style: {
        transition: `all ${intervalSpeed}ms ease`,
      },
    })
  );

  const container = Spawn({
    tag,
    className,
    children: spans,
    style: {
      whiteSpace: 'pre',
      ...(style || {}),
    },
  });

  if (!spans.length) return container;

  let tick = 0;
  const paint = () => {
    for (let i = 0; i < spans.length; i++) {
      spans[i].style.color = colors[(i + tick) % colors.length];
    }
  };

  paint();

  const id = setInterval(() => {
    tick = (tick + 1) % colors.length;
    paint();
  }, intervalSpeed);

  container.__respawnCleanup = () => clearInterval(id);

  return container;
}


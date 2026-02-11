import Spawn, { Mount, RainbowText } from '@nurvus/respawn';

const el = Spawn({
  className: 'respawn',
  children: [
    Spawn({
      children: RainbowText({
        text: 'Your Respawn is ready.',
        intervalSpeed: 150,
        style: {
          padding: 20,
          fontWeight: 'bold',
          fontSize: '36px',
          zIndex: 1,
          display: 'inline-block',
        },
      }),
      style: {
        // (container styling is applied inside RainbowText via its `style` option)
      }
    }),
  ],
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#222222',
    color: '#ffffff'
  }
});

Mount(document.body, el);

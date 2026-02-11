import Spawn, { Respawn } from '@nurvus/respawn';

export default class RespawnTest {
  constructor() {

    this.respawn = this.respawn.bind(this);
    this.btnEl = Spawn({
      tag: 'button',
      children: 'Respawn',
      events: {
        click: this.respawn
      }
    });

    this.elASub1 = Spawn({
      children: 'sub 1'
    });
    this.elASub2 = Spawn({
      children: 'sub 2'
    });
    this.elASub3 = Spawn({
      children: 'sub 3'
    });

    this.elA = Spawn({
      children: [
        'A',
        this.elASub1,
        this.elASub2,
        this.elASub3
      ],
      style: {
        width: 20,
        height: 20,
        background: 'blue'
      }
    });

    this.el = this.render();

    return this;
  }

  respawn() {
    this.elA = Respawn(this.elA, Spawn({
      children: [
        'A New',
        this.elASub1,
        this.elASub2,
        this.elASub3
      ],
      style: {
        background: 'green'
      }
    }));
    this.el = Respawn(this.el, this.render());








    // const newEl = this.render();
    // this.el.replaceWith(newEl);
    // this.el = newEl;

    // console.log(this.el);
  }

  render() {
    return Spawn({
      className: 'respawned',
      children: [
        'hi',
        this.btnEl,
        Spawn({
          tag: 'p',
          children: [
            'P tag'
          ]
        }),
        this.elA
      ],
      style: {
        width: 400,
        height: 400,
        background: 'red',
        padding: 20
      }
    });
  }
}
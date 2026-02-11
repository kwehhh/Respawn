import Spawn, { Respawn } from "@nurvus/respawn";

const getRandom = (min, max) => {
return Math.floor((Math.random() * (max - min + 1))  + min);
}

function getBlockStyle() {
  return {
    minWidth: 20,
    minHeight: 20,
    padding: 5,
    background: `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
  }
};

const generateTree = (depth = 0) => {
  if (depth) {
    const childrenCount = getRandom(0, 10);
    const children = [];
    for (let i = 0; i < childrenCount; i++) {
      children.push(Spawn({
        style: {
          ...getBlockStyle(),
          display: 'inline-block'
        },
        children: `${depth}-${i}`,
      }));
    }

    children.push(Spawn({
      style: {
        ...getBlockStyle(),
        display: 'inline-block'
      },
      children: generateTree( depth - 1)
    }))

    return Spawn({
      style: {
        ...getBlockStyle(),
        display: 'inline-block'
      },
      className: `${depth}`,
      children
    });
  }

  return Spawn({
    style: {
      ...getBlockStyle(),
      display: 'inline-block'
    },
    className: `${depth}`,
    children: depth
  });
};

export default function RandomDOMTree() {
  const respawner = (nextEl) => {
    const el = nextEl || Spawn({
      children: generateTree(10)
    });

    setTimeout(() => {
      const nextOfNextEl = Respawn(el, Spawn({
        children: generateTree(getRandom(1, 15))
      }));

      respawner(nextOfNextEl);
    }, 1000);

    return el;
  };

  return respawner;
}
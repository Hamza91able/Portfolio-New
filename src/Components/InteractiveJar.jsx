import { useEffect, useRef } from "react";
import { Engine, Render, Bodies, World, Composite, Events } from "matter-js";
import { JAR, jarStyle, shuffle } from "../Helpers";

function InteractiveJar({ start, setStart }) {
  const scene = useRef();
  const engine = useRef(Engine.create());

  useEffect(() => {
    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        wireframes: false,
        background: "transparent",
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showSleeping: false,
        hasBounds: true,
        isFixed: true,
        delta: false,
        positionIterations: true,
      },
    });

    Composite.add(engine.current.world, [
      Bodies.rectangle(570, 340, 40, 480, jarStyle),
      Bodies.rectangle(385, 340, 40, 480, jarStyle),
      Bodies.rectangle(480, 570, 210, 40, jarStyle),
      Bodies.rectangle(600, 600, 900, 20, jarStyle),
    ]);

    Engine.run(engine.current);
    Render.run(render);

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });

    return () => {
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    if (start) fillMarbles(1);
  }, [start]);

  const fillMarbles = (size) => {
    var list = [];
    var list1 = [];
    var list2 = [];
    var list3 = [];
    var s;

    for (var i = 0; i < 50; i++) {
      list1.push(JAR.kids[Math.floor(Math.random() * JAR.kids.length)].color);
    }

    if (size === 1) {
      list = shuffle(list1);
      s = JAR.rad[0];
    } else if (size === 2) {
      list = shuffle(list2);
      s = JAR.rad[1];
    } else if (size === 3) {
      list = shuffle(list3);
      s = JAR.rad[2];
    }

    var body,
      x,
      y,
      i = 0;
    y = 0;
    const rad_multiplier = 1;
    if (list && list.length > 0) {
      while (i < list.length) {
        var c = JAR.palette[parseInt(list[i])];
        var r = s * rad_multiplier;
        x = 450 + Math.trunc(50 * Math.random());
        y -= s;
        body = Bodies.circle(x, y, r, {
          isSensor: false,
          render: {
            lineWidth: 5,
            strokeStyle: "transparent",
            fillStyle: c,
          },
        });
        Composite.add(engine.current.world, [body]);
        i++;
      }
    }

    setTimeout(() => {
      setStart(false);
    }, 2000);
  };

  return (
    <div
      ref={scene}
      onClick={() => fillMarbles(1)}
      // style={{ position: "absolute" }}
    />
  );
}

export default InteractiveJar;

import { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Runner,
  Common,
  MouseConstraint,
  Mouse,
  Composite,
  Svg,
  Bodies,
} from "matter-js";
import decop from "poly-decomp";

// SVG
import TestSVG from "../Assets/SVGs/svg.svg";

const jarStyle = {
  isStatic: true,
  render: {
    lineWidth: 1,
    strokeStyle: "transparent",
    fillStyle: "transparent",
  },
};

function InteractiveName(props) {
  const scene = useRef();
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  useEffect(() => {
    Common.setDecomp(decop);

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
      Bodies.rectangle(400, 0, 900, 50, jarStyle),
      Bodies.rectangle(400, 600, 900, 50, jarStyle),
      Bodies.rectangle(800, 300, 50, 800, jarStyle),
      Bodies.rectangle(0, 300, 50, 800, jarStyle),
    ]);

    Runner.run(runner.current, engine.current);
    Render.run(render);

    // add bodies
    if (typeof fetch !== "undefined") {
      var select = function (root, selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector));
      };

      var loadSvg = function (url) {
        return fetch(url)
          .then(function (response) {
            return response.text();
          })
          .then(function (raw) {
            return new window.DOMParser().parseFromString(raw, "image/svg+xml");
          });
      };

      loadSvg(TestSVG).then(function (root) {
        var color = Common.choose(["#f55a3c"]);

        var vertexSets = select(root, "path").map(function (path) {
          return Svg.pathToVertices(path, 30);
        });

        Composite.add(
          engine.current.world,
          Bodies.fromVertices(
            400,
            80,
            vertexSets,
            {
              render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1,
              },
            },
            true
          )
        );
      });
    } else {
      Common.warn("Fetch is not available. Could not load SVG.");
    }

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );

    let touchStart = null;
    mouseConstraint.mouse.element.addEventListener("touchstart", (event) => {
      if (!mouseConstraint.body) {
        touchStart = event;
      }
    });

    mouseConstraint.mouse.element.addEventListener("touchend", (event) => {
      event.preventDefault();
      touchStart = null;
    });

    mouseConstraint.mouse.element.addEventListener("touchmove", (event) => {
      if (!mouseConstraint.body && touchStart) {
        event.preventDefault();
        let start = touchStart.touches[0].clientY;
        let end = event.touches[0].clientY;
        let delta = start - end;
        window.scrollTo(0, window.scrollY + delta);
        touchStart = event;
      }
    });

    Composite.add(engine.current.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });

    return () => {
      Render.stop(render);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={scene}
      style={{
        position: "absolute",
      }}
      id="stage"
    />
  );
}

export default InteractiveName;

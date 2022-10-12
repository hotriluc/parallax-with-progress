import "./App.css";
import { useSpring, animated } from "react-spring";
import { useEffect, useState, useCallback, useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const progressBarOffset = 50;

function App() {
  const ref = useRef();
  const [prevOffsetY, setPrevOffsetY] = useState(0);
  const [springs, api] = useSpring(() => ({
    from: { scaleX: 0 },
  }));

  const scrollHandler = useCallback(() => {
    const { current, space, layers } = ref.current;
    const progressBarX = current / (space * (layers.size - 1));

    // Check what section we are in
    let n = 0;
    while (n <= layers.size) {
      // if top offset then change to - offset
      // if bottom offset then -> - (space - offset)
      if (
        n * space - progressBarOffset < current &&
        current < (n + 1) * space - progressBarOffset
      ) {
        break;
      }
      n++;
    }

    api.start({
      to: { scaleX: progressBarX, backgroundColor: n % 2 ? "black" : "white" },
    });

    setPrevOffsetY(current);
  }, [api]);

  useEffect(() => {
    const parallaxWrapper = document.querySelector("#parallax");

    if (ref && ref.current) {
      parallaxWrapper.addEventListener("scroll", scrollHandler, false);

      // cleanup
      return () => {
        parallaxWrapper.removeEventListener("scroll", scrollHandler, false);
      };
    }
  }, [prevOffsetY, scrollHandler]);

  return (
    <>
      <animated.div
        style={{
          position: "absolute",
          width: "60%",
          height: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          top: progressBarOffset,
          right: "50%",
          x: "50%",
          zIndex: 100,
          ...springs,
        }}
      />
      <Parallax pages={4} ref={ref} id="parallax">
        <ParallaxLayer offset={0} speed={0.5} factor={1.5} className="section">
          <div style={{ height: 500, width: 500 }}>
            <h1>Scroll down</h1>

            <img src="/pic-1.jpg" alt="" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1} className="section">
          <div style={{ height: 500, width: 500 }}>
            <img src="/pic-2.jpg" alt="" />
            <h1>Scroll down</h1>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={1} factor={2} className="section">
          <div style={{ height: 500, width: 500 }}>
            <img src="/pic-3.jpg" alt="" />
            <h1>Scroll down</h1>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} className="section">
          <div style={{ height: 500, width: 500 }}>
            <img src="/pic-4.jpg" alt="" />

            <h1>Scroll up</h1>
          </div>
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

export default App;

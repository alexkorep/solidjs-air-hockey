import { createSignal, createEffect, onCleanup } from "solid-js";

const WIDTH = 800;
const HEIGHT = 600;
function App() {
  const [getBallDX, setBallDX] = createSignal(2);
  const [getBallDY, setBallDY] = createSignal(2);
  const [getBallX, setBallX] = createSignal(WIDTH / 2);
  const [getBallY, setBallY] = createSignal(100);

  const [getX, setX] = createSignal(WIDTH / 2);
  const [getY, sety] = createSignal(HEIGHT / 2);

  const setXY = (x, y) => {
    setX(x);
    sety(y);
  };

  createEffect(() => {
    const frameUpdate = setInterval(() => {
      let x = getBallX() + getBallDX();
      let y = getBallY() + getBallDY();

      const dxNewSpeed = Math.max(0, Math.abs(getBallDX()) * 0.5);
      const dyNewSpeed = Math.max(0, Math.abs(getBallDY()) * 0.5);
      if (x > WIDTH) {
        x = WIDTH;
        setBallDX(-dxNewSpeed);
      } else if (x < 0) {
        x = 0;
        setBallDX(dxNewSpeed);
      }

      if (y > HEIGHT) {
        y = HEIGHT;
        setBallDY(-dyNewSpeed);
      } else if (y < 0) {
        y = 0;
        setBallDY(dyNewSpeed);
      }

      const dist = Math.sqrt(Math.pow(x - getX(), 2) + Math.pow(y - getY(), 2));
      if (dist < 60) {
        const dx = x - getX()
        const dy = y - getY()
        setBallDX(-dx/(dx + dy)*5)
        setBallDY(-dy/(dx + dy)*5)
      }

      setBallX(x);
      setBallY(y);
    }, 1000 / 60); // 60 FPS
    onCleanup(() => clearInterval(frameUpdate));
  });

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style="background-color:green"
      onMouseMove={(evt) => {
        setXY(evt.clientX, evt.clientY);
      }}
      onTouchMove={(evt) => {
        setXY(evt.touches[0].clientX, evt.touches[0].clientY);
      }}
    >
      <circle
        cx={getX()}
        cy={getY()}
        r="40"
        stroke="black"
        stroke-width="3"
        fill="red"
      />
      <circle
        cx={getBallX()}
        cy={getBallY()}
        r="20"
        stroke="black"
        stroke-width="3"
        fill="yellow"
      />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}

export default App;

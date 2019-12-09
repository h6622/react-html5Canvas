import React, { useRef } from "react";
import { createGlobalStyle } from "styled-components";
import { number } from "prop-types";

const GlobalStyle = createGlobalStyle`
    canvas {
      width: 100vw;
      height: 100vh;
        background-color: beige;
    }
`;

const Canvas = () => {
  const canvasRef = useRef();

  const getMousePos = (xRef, yRef) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    return {
      x: Math.floor(
        ((xRef - canvasRect.left) / (canvasRect.right - canvasRect.left)) *
          canvasRef.current.width
      ),
      y: Math.floor(
        ((yRef - canvasRect.top) / (canvasRect.bottom - canvasRect.top)) *
          canvasRef.current.height
      )
    };
  };

  const drawArc = (mouseX, mouseY) => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, 2 * Math.PI, true);
    ctx.stroke();
  };

  const onClickCanvas = e => {
    const mousePos = getMousePos(e.clientX, e.clientY);
    drawArc(mousePos.x, mousePos.y);
  };

  return (
    <>
      <GlobalStyle />
      <canvas onClick={onClickCanvas} ref={canvasRef}></canvas>
    </>
  );
};

export default Canvas;

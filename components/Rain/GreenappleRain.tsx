import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const GreenappleRain: React.FC = () => {
  const [apples, setApples] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const shouldDrop = Math.random();
      if (shouldDrop) {
        setApples((prev) => [...prev, Date.now()]);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {apples.map((id) => (
        <Apple key={id} left={Math.random() * 100} />
      ))}
    </>
  );
};

export default GreenappleRain;

// ---------------- STYLED ---------------- //

const fall = keyframes`
  0% {
    top: -50px;
    opacity: 1;
    transform: rotate(0deg);
  }
  100% {
    top: 100vh;
    opacity: 1;
    transform: rotate(360deg);
  }
`;

const Apple = styled.img.attrs(() => ({
  src: "/apple.png",
  alt: "green apple",
}))<{ left: number }>`
  position: fixed;
  top: -50px;
  left: ${({ left }) => left}vw;
  width: 40px;
  height: 40px;
  z-index: 0;
  animation: ${fall} 3.5s linear forwards;
`;

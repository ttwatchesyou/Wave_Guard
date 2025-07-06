import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const TomatoRain: React.FC = () => {
  const [tomatoes, setTomatoes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const shouldDrop = Math.random();
      if (shouldDrop) {
        setTomatoes((prev) => [...prev, Date.now()]);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {tomatoes.map((id) => (
        <Tomato key={id} left={Math.random() * 100} />
      ))}
    </>
  );
};

export default TomatoRain;

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

const Tomato = styled.img.attrs(() => ({
  src: "/tomato.png",
  alt: "tomato",
}))<{ left: number }>`
  position: fixed;
  top: -50px;
  left: ${({ left }) => left}vw;
  width: 40px;
  height: 40px;
  z-index: 0;
  animation: ${fall} 3.5s linear forwards;
`;

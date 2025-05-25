import React, { useEffect, useState } from "react";
import styled from "styled-components";

const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#5f27cd"];

function MainPartSection() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const fromColor = colors[index % colors.length];
  const toColor = colors[(index + 1) % colors.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setIndex((prev) => (prev + 1) % colors.length);
      }, 2000); // ช่วงเวลา transition
    }, 4000); // รวมเวลา transition + พัก

    return () => clearInterval(interval);
  }, []);

  return (
    <ColorTransitionWrapper from={fromColor} to={toColor} animate={animate}>
      MainPartSection
    </ColorTransitionWrapper>
  );
}

export default MainPartSection;

const ColorTransitionWrapper = styled.div<{
  from: string;
  to: string;
  animate: boolean;
}>`
  width: 100%;
  height: 90vh;
  background: linear-gradient(
    to right,
    ${({ from }) => from},
    ${({ to }) => to}
  );
  background-size: 200% 100%;
  background-position: ${({ animate }) =>
    animate ? "left center" : "right center"};
  transition: background-position 2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 1024px) {
    height: 100vh;
  }
`;

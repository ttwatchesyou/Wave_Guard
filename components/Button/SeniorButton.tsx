import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

function SeniorButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/Senior");
  };

  return <StyledButton onClick={handleClick}>รุ่นพี่</StyledButton>;
}

export default SeniorButton;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  padding: 10px 20px;
  background-color: #ffb22c;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fa812f;
  }
`;

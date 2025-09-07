import React from "react";
import styled from "styled-components";
import { useMqttControl } from "../../hook/useMqttControl";

interface MqttControlButtonsProps {
  disableOn?: boolean;
}

export const MqttControlButtons: React.FC<MqttControlButtonsProps> = ({
  disableOn,
}) => {
  const { turnOn, turnOff } = useMqttControl();

  return (
    <ButtonWrapper>
      <Button onClick={turnOn} color="#4CAF50" disabled={disableOn}>
        เปิด
      </Button>
      <Button onClick={turnOff} color="#F44336">
        ปิด
      </Button>
    </ButtonWrapper>
  );
};

// ================== Styled Components ==================
const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const Button = styled.button<{ color: string }>`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  background-color: ${(p) => p.color};
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

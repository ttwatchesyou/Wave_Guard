import React from "react";
import styled from "styled-components";
import GaugeChart from "react-gauge-chart";
import { useMqttTemp } from "../../hook/useMqttTemp";

function MainPartSection() {
  const temp = useMqttTemp();

  return (
    <MainSection>
      <MainBox>
        <Title>ยินดีต้อนรับสู่แผนกเมคคาทรอนิกส์และหุ่นยนต์</Title>
        <Subtitle>อุณหภูมิจาก MQTT</Subtitle>

        <GaugeWrapper>
          <GaugeChart
            id="temp-gauge"
            nrOfLevels={20}
            percent={temp ? temp / 100 : 0} // สมมุติ temp สูงสุด 100
            textColor="#fff"
            formatTextValue={(val: number) => `${temp ?? 0} °C`}
            colors={["#00FF00", "#FFBF00", "#FF0000"]}
          />
        </GaugeWrapper>
      </MainBox>
    </MainSection>
  );
}

export default MainPartSection;

// ================== Styled Components ==================

const MainSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fffbde;
`;

const MainBox = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #1e3271;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  margin: 20px 0;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffdc7c;
  margin-bottom: 16px;
  text-align: center;
  font-family: "Prompt", sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #ffffffcc;
  margin-bottom: 30px;
  text-align: center;
  font-family: "Prompt", sans-serif;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const GaugeWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

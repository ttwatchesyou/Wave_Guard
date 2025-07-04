import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import TomatoRain from "../../../components/Tamato/TomatoRain";

type Props = {};

const JuniorPage = ({}: Props) => {
  return (
    <MainSection>
      <TomatoRain />
      <MainBox>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Title>ยินดีต้อนรับรุ่นน้อง 🎉</Title>
            <Description>
              กดปุ่มด้านล่างเพื่อสุ่มคำใบ้จากรุ่นพี่ของคุณ
            </Description>
            {/* ปุ่มสุ่มหรืออื่น ๆ สามารถเพิ่มตรงนี้ได้ภายหลัง */}
          </Col>
        </Row>
      </MainBox>
    </MainSection>
  );
};

export default JuniorPage;

// Styled Components
const MainSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fffbde;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MainBox = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #1e3271;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px 0;
  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px 0;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: white;
  font-size: 1.2rem;
`;

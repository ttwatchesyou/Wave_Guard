import React from 'react'
import styled from "styled-components"
import JuniorButton from '../../../components/Button/JuniorButton'
import SeniorButton from '../../../components/Button/SeniorButton'
import { Row, Col } from 'antd'
import TomatoRain from '../../../components/Rain/TomatoRain'
import CloverRain from '../../../components/Rain/CloverRain'
import GreenappleRain from '../../../components/Rain/GreenappleRain'



function MainPartSection() {
  return (
    <MainSection>
      <TomatoRain />
       <CloverRain />
      <GreenappleRain />
      <MainBox>
       <Title>ยินดีต้อนรับสู่แผนกเมคคาทรอนิกส์และหุ่นยนต์ </Title>
   <Subtitle>เลือกว่า "คุณคือใคร?" แล้วกดปุ่มได้เลย </Subtitle>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={12}>
            <JuniorButton />
          </Col>
          <Col xs={24} sm={12} md={8} lg={12}>
            <SeniorButton />
          </Col>
        </Row>
      </MainBox>
      {/* <CornerImage src="/celebrate.svg" alt="Decoration" /> */}
    </MainSection>
  )
}

export default MainPartSection

const CornerImage = styled.img`
  width: 600px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 80px;
  }
`;


const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffdc7c;
  margin-bottom: 16px;
  text-align: center;
  font-family: 'Prompt', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #ffffffcc;
  margin-bottom: 40px;
  text-align: center;
  font-family: 'Prompt', sans-serif;
`;


const MainSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #FFFBDE;
  @media (max-width: 768px) {
    padding: 10px;
  }
`

const MainBox = styled.div`
  width: 100%;
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
`
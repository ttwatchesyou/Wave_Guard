import React from 'react'
import styled from "styled-components"
import JuniorButton from '../../../components/Button/JuniorButton'
import SeniorButton from '../../../components/Button/SeniorButton'
import { Row, Col } from 'antd'
import TomatoRain from '../../../components/Tamato/TomatoRain'



function MainPartSection() {
  return (
     <MainSection>
      <TomatoRain />
      <MainBox>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={12}>
            <JuniorButton />
          </Col>
          <Col xs={24} sm={12} md={8} lg={12}>
            <SeniorButton />
          </Col>
        </Row>
      </MainBox>
    </MainSection>
  )
}

export default MainPartSection

const MainSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
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
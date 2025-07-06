/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { Row, Col, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TomatoRain from "../../../components/Rain/TomatoRain";

const { TextArea } = Input;

type Props = {};

function SeniorPage({}: Props) {
  return (
    <MainSection>
      <TomatoRain />
      <MainBox>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Title>ส่งคำใบ้ให้รุ่นน้อง 💌</Title>
          </Col>
          <Col span={24}>
            <Label>ชื่อของคุณ (รุ่นพี่):</Label>
            <StyledInput placeholder="กรอกชื่อของคุณ" />
          </Col>
          <Col span={24}>
            <Label>คำใบ้:</Label>
            <StyledTextArea rows={4} placeholder="พิมพ์คำใบ้ของคุณที่นี่" />
          </Col>
          <Col span={24}>
            <Label>อัปโหลดรูปภาพ (ไม่บังคับ):</Label>
            <Upload>
              <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
            </Upload>
          </Col>
          <Col span={24}>
            <SubmitButton type="primary">ส่งคำใบ้</SubmitButton>
          </Col>
        </Row>
      </MainBox>
    </MainSection>
  );
}

export default SeniorPage;

// Styled Components
const MainSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fffbde;
`;

const MainBox = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 24px;
  background-color: #1e3271;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 24px;
`;

const Label = styled.label`
  color: white;
  display: block;
  margin-bottom: 8px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: #fa812f;
  border: none;

  &:hover {
    background-color: #ffb22c !important;
  }
`;

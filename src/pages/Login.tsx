import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import AuthContext from "../context/authContext";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();
  const { login, token } = useContext(AuthContext);

  const [form, setForm] = useState({ studentId: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { [key: string]: string } = {};

    if (!form.studentId.trim()) newErrors.studentId = "กรุณากรอกรหัสนักศึกษา";
    if (!form.password.trim()) newErrors.password = "กรุณากรอกรหัสผ่าน";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post("/api/auth/login", form);
      const token = response.data.token;

      if (token) {
        login(token);
        setShouldRedirect(true);
      } else {
        setErrors({ general: "ไม่พบโทเคนการเข้าสู่ระบบ" });
      }
    } catch (err: any) {
      setErrors({
        general: err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ",
      });
    }
  };

  useEffect(() => {
    if (token && shouldRedirect) {
      router.push("/dashboard");
    }
  }, [token, shouldRedirect, router]);

  const handleGoToRegister = () => {
    router.push("/register");
  };

  return (
    <>
      <Head>
        <title>Mechatronics and Robotics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/logo/MechaLogo.png" rel="icon" />
        <meta property="og:title" content="Mechatronics and Robotics" />
      </Head>
      <Wrapper>
        <FormBox onSubmit={handleSubmit}>
          <h2>เข้าสู่ระบบ</h2>
          <Row gutter={16}>
            <Col span={24}>
              <Input
                name="studentId"
                type="text"
                placeholder="รหัสนักศึกษา"
                value={form.studentId}
                onChange={handleChange}
                required
              />
              {errors.studentId && <ErrorText>{errors.studentId}</ErrorText>}
            </Col>

            <Col span={24}>
              <PasswordWrapper>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="รหัสผ่าน"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <IconToggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </IconToggle>
              </PasswordWrapper>
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </Col>
          </Row>

          {errors.general && <ErrorText>{errors.general}</ErrorText>}

          <ButtonRow>
            <LoginButton type="submit">เข้าสู่ระบบ</LoginButton>
            <RegisterButton type="button" onClick={handleGoToRegister}>
              สมัครสมาชิก
            </RegisterButton>
          </ButtonRow>
        </FormBox>
      </Wrapper>
    </>
  );
};


export default LoginPage;

// Styled Components (เหมือนเดิม)
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fffbde;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormBox = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;

  h2 {
    margin-bottom: 24px;
    font-family: "Prompt", sans-serif;
  }

  .ant-row {
    row-gap: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-sizing: border-box;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const IconToggle = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 18px;
  cursor: pointer;
  color: #888;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 6px;
  font-size: 0.9rem;
  text-align: left;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const LoginButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #1e3271;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #162757;
  }
`;

const RegisterButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #e0e0e0;
  color: #1e3271;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #d1d1d1;
  }
`;

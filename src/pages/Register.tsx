import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Head from "next/head";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
const validateStudentId = (studentId: string) =>
  /^\d{2}\d{4,11}$/.test(studentId);
const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) errors.push("อย่างน้อย 8 ตัวอักษร");
  if (!/[A-Z]/.test(password)) errors.push("ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว");
  if (!/[0-9]/.test(password)) errors.push("ต้องมีตัวเลขอย่างน้อย 1 ตัว");
  return errors;
};

const calculateAge = (birthDateStr: string) => {
  if (!birthDateStr) return "";
  const today = new Date();
  const birthDate = new Date(birthDateStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age.toString();
};

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    firstname: "",
    lastname: "",
    nickname: "",
    age: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      let updated = { ...prev, [name]: value };
      if (name === "birthDate") updated.age = calculateAge(value);
      return updated;
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "รูปแบบอีเมลไม่ถูกต้อง" }));
    }
    if (name === "studentId" && value && !validateStudentId(value)) {
      setErrors((prev) => ({
        ...prev,
        studentId: "รูปแบบรหัสนักศึกษาไม่ถูกต้อง",
      }));
    }
    if (name === "password" && value) {
      const passErrors = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        password: passErrors.length ? passErrors.join(", ") : "",
      }));
    }
    if (name === "confirmPassword" && value !== form.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "รหัสผ่านไม่ตรงกัน" }));
    }
    if (name === "birthDate") {
      if (value && new Date(value) > new Date()) {
        setErrors((prev) => ({
          ...prev,
          birthDate: "วันเกิดไม่สามารถเป็นวันที่ในอนาคตได้",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { [key: string]: string } = {};

    if (!validateEmail(form.email)) newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (!validateStudentId(form.studentId))
      newErrors.studentId = "รูปแบบรหัสนักศึกษาไม่ถูกต้อง";
    const passErrors = validatePassword(form.password);
    if (passErrors.length > 0) newErrors.password = passErrors.join(", ");
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    if (!form.firstname.trim()) newErrors.firstname = "กรุณากรอกชื่อจริง";
    if (!form.lastname.trim()) newErrors.lastname = "กรุณากรอกนามสกุล";
    if (!form.nickname.trim()) newErrors.nickname = "กรุณากรอกชื่อเล่น";
    if (form.birthDate && new Date(form.birthDate) > new Date()) {
      newErrors.birthDate = "วันเกิดไม่สามารถเป็นวันที่ในอนาคตได้";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post("/api/auth/register", {
        email: form.email,
        password: form.password,
        studentId: form.studentId,
        firstname: form.firstname,
        lastname: form.lastname,
        nickname: form.nickname,
        age: form.age,
        birthDate: form.birthDate,
      });
      router.push("/Login");
    } catch (err: any) {
      setErrors({ general: err.response?.data?.message || "เกิดข้อผิดพลาด" });
    }
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
          <h2>สมัครสมาชิก</h2>
          <Row gutter={16}>
            <Col span={24}>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </Col>
            <Col xs={24} sm={12}>
              <PasswordWrapper>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="รหัสผ่าน"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <ToggleIcon onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </ToggleIcon>
              </PasswordWrapper>
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </Col>
            <Col xs={24} sm={12}>
              <PasswordWrapper>
                <Input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="ยืนยันรหัสผ่าน"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <ToggleIcon onClick={() => setShowConfirm((prev) => !prev)}>
                  {showConfirm ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </ToggleIcon>
              </PasswordWrapper>
              {errors.confirmPassword && (
                <ErrorText>{errors.confirmPassword}</ErrorText>
              )}
            </Col>
            <Col xs={24} sm={12}>
              <Input
                name="studentId"
                type="text"
                placeholder="รหัสนักศึกษา"
                value={form.studentId}
                onChange={handleChange}
                required
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {errors.studentId && <ErrorText>{errors.studentId}</ErrorText>}
            </Col>
            <Col xs={24} sm={12}>
              <Input
                name="firstname"
                type="text"
                placeholder="ชื่อจริง"
                value={form.firstname}
                onChange={handleChange}
                required
              />
              {errors.firstname && <ErrorText>{errors.firstname}</ErrorText>}
            </Col>
            <Col xs={24} sm={12}>
              <Input
                name="lastname"
                type="text"
                placeholder="นามสกุล"
                value={form.lastname}
                onChange={handleChange}
                required
              />
              {errors.lastname && <ErrorText>{errors.lastname}</ErrorText>}
            </Col>
            <Col xs={24} sm={12}>
              <Input
                name="nickname"
                type="text"
                placeholder="ชื่อเล่น"
                value={form.nickname}
                onChange={handleChange}
                required
              />
              {errors.nickname && <ErrorText>{errors.nickname}</ErrorText>}
            </Col>
            <Col xs={24} sm={12}>
              <Input
                name="birthDate"
                type="date"
                placeholder="วันเกิด"
                value={form.birthDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
              />
              {errors.birthDate && <ErrorText>{errors.birthDate}</ErrorText>}
            </Col>
            <Col xs={24} sm={12}>
              <Input
                name="age"
                type="number"
                placeholder="อายุ"
                value={form.age}
                readOnly
                disabled
              />
            </Col>
          </Row>

          {errors.general && <ErrorText>{errors.general}</ErrorText>}
          <Button type="submit">สมัคร</Button>
        </FormBox>
      </Wrapper>
    </>
  );
};

export default RegisterPage;

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
  padding: 32px;
  border-radius: 12px;
  box-shadow: #1e3271;
  width: 100%;
  max-width: 600px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-family: "Prompt", sans-serif;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-sizing: border-box;

  &[type="date"] {
    border: 2px solid #1e3271;
    border-radius: 16px;

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(29%) sepia(96%) saturate(3081%) hue-rotate(219deg)
        brightness(87%) contrast(84%);
    }
  }

  @media (max-width: 768px) {
    &[type="date"] {
      font-size: 1.1rem;
      padding: 16px;
      border-radius: 20px;
      width: 100vw;
      max-width: 100%;
    }
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
  font-size: 1.1rem;

  &:hover {
    color: #1e3271;
  }
`;

const Button = styled.button`
  width: 100%;
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

const ErrorText = styled.p`
  color: red;
  margin-bottom: 8px;
  font-size: 0.9rem;
  text-align: left;
`;

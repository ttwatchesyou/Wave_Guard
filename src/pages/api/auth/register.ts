import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, studentId, firstname, lastname, nickname, age } = req.body;

  try {
    await connectToDatabase();

    // ตรวจสอบ email ซ้ำ
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email นี้มีอยู่แล้ว' });
    }

    // ตรวจสอบ studentId ซ้ำ
    const existingStudent = await User.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'รหัสนักศึกษานี้มีอยู่แล้ว' });
    }

    // หาว่ารหัสเป็นของรุ่นไหน
    const currentYear = new Date().getFullYear(); // เช่น 2025
    const currentPrefix = (currentYear % 100) + 43; // เช่น 68

    const prefix = parseInt(studentId.slice(0, 2));

    let role: 'junior' | 'senior';

    if (prefix === currentPrefix) {
      role = 'junior';
    } else if (prefix === currentPrefix - 1) {
      role = 'senior';
    } else if (prefix < currentPrefix - 1) {
      return res.status(403).json({ message: 'คุณได้เข้าร่วมกิจกรรมไปแล้วในปีก่อน' });
    } else {
      return res.status(403).json({ message: 'ไม่สามารถระบุรุ่นได้จากรหัสนี้' });
    }

    // เข้ารหัส password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      studentId,
      password: hashedPassword,
      firstname,
      lastname,
      nickname,
      age,
      role,
    });

    return res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', role, userId: newUser._id });
  } catch (err) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
  }
}

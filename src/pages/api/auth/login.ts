import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { studentId, password } = req.body;

  try {
    await connectToDatabase();

    const user = await User.findOne({ studentId });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบบัญชีผู้ใช้นี้" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

    // ส่งข้อมูลบางส่วนกลับไป
    return res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: {
        id: user._id,
        studentId: user.studentId,
        role: user.role,
        nickname: user.nickname,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
}

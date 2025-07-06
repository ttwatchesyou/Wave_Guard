import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  studentId?: string;
  firstname: string;
  lastname: string;
  nickname: string;
  age: number;
  role: 'junior' | 'senior' | 'admin';
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  studentId: { type: String },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  nickname: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['junior', 'senior', 'admin'], required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

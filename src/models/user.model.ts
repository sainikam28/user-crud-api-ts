import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

/**
 * 🔐 Pre-save hook to hash password
 */
userSchema.pre('save', async function () {
  // this refers to the document
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model<IUser>('User', userSchema);

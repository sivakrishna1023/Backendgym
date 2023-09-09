import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken';
// Define an interface for your model
interface MemberDocument extends Document {
  name: string;
  gmail: string;
  Password: string;
  joinedat: Date;

  getJWTToken(): string;
  comparepassword(password: string): Promise<boolean>;
}

const membersSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
  },
  gmail: {
    type: String,
    //required: true,
  },
  Password: {
    type: String,
    //required: true,
  },
  joinedat: {
    type: Date,
    default: Date.now(),
  },
});

membersSchema.methods.getJWTToken = function () {
  const Secret = process.env.SECRET as string;
  return jwt.sign({ id: this._id },"123", { expiresIn: `1h` });
};

membersSchema.methods.comparepassword = async function (password: string) {
  return this.Password===password;
};

export const Members = mongoose.model<MemberDocument>('member', membersSchema);

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const user = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

user.statics.createNewUser = async function (
  email: string,
  password: string
): Promise<"string"> {
  const hashedpwd = await bcrypt.hash(password, 5);
  const user = await mongoose
    .model("User")
    .create({ email: email, password: hashedpwd });
  return await user.generateToken();
};

user.methods.signInUser = async function (
  password: string
): Promise<"string"> | null {
  if (await bcrypt.compare(password, this.password)) {
    return await this.generateToken();
  }
  return null;
};

user.methods.generateToken = async function (): Promise<"string"> {
  const token = jwt.sign({ id: this._id }, process.env.TOKEN_SECRET);
  return token;
};

user.statics.decryptToken = async function (token): Promise<"string"> {
  if (!token) return null;

  const result = jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return null;
    return decoded.id;
  });
  return result;
};

export default mongoose.model("User", user);

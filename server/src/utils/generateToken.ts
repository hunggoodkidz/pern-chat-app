import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants.js";

// Define the type for the payload expected by generateToken
type UserPayload = {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
};

export default async function generateToken(user: UserPayload): Promise<string>{
  const token = jwt.sign(
    {
      email: user?.email,
      id: user?.id,
      name: user?.name,
      imageUrl: user?.imageUrl,
    },
    JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
}

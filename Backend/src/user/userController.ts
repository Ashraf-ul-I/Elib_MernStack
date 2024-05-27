import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from './userModels';
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { UserTypes } from './userTypes';

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All Fields are required");
    return next(error);
  }

  try {
    // Check if user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      const error = createHttpError(409, 'User already exists with this email'); // 409 Conflict
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, 'Error while checking user existence'));
  }

  let newUser: UserTypes;
  try {
    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
  } catch (error) {
    return next(createHttpError(500, 'Error while creating user'));
  }

  try {
    // Token Generation
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, { expiresIn: '7d' });

    // Response
    res.json({ accessToken: token, message: "User registered" });
  } catch (error) {
    return next(createHttpError(500, 'Error while generating token'));
  }
};

export { createUser };

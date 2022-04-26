import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { Raw } from 'typeorm';
import { User } from '../entities/user';
import { isAuthenticated } from '../middleware/auth';
import { AuthenticatedRequest } from '../types';

const router = express.Router();

router.get('/me', isAuthenticated, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
          value: `%${req.email}%`,
        }),
      },
    });
    console.log({ email: req.email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({
      where: {
        email: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
          value: `%${email}%`,
        }),
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User doesn't exist",
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: 'Password is incorrect',
      });
    }
    const accessToken = jwt.sign({ email: email }, process.env.HASHING_KEY, {
      expiresIn: '1d',
    });

    return res.json({ accessToken });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({
      where: {
        email: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
          value: `%${email}%`,
        }),
      },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign({ email: email }, process.env.HASHING_KEY, {
      expiresIn: '1d',
    });

    return res.status(200).json({ ...user, accessToken });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

export { router as authRouter };

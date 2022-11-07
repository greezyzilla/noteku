// eslint-disable-next-line import/no-extraneous-dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/lib/prisma,';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body;

      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) throw new Error('user not found');
      if (!(await bcrypt.compare(password, user.password))) throw new Error('password not match the record');

      const accessToken = jwt.sign({
        user: user.name,
        email: user.email,
      }, process.env.JWT_KEY!);

      res.status(200).json({ error: false, accessToken });
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
}

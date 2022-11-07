// eslint-disable-next-line import/no-extraneous-dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import prisma from '../../../utils/lib/prisma,';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { email, password, name } = req.body;
      await prisma.user.create({
        data: {
          id: uuid(),
          email,
          name,
          password: await bcrypt.hash(password, 10),
          Notes: {
            create: [
              {
                title: `Welcome to Notes, ${name}!`,
                body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
              },
            ],
          },
        },
      });
      res.status(200).json({ error: false });
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
}

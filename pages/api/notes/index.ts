// eslint-disable-next-line import/no-extraneous-dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../utils/lib/prisma,';

interface UserInterface{
  name : string;
  email : string;
}

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Not Authorized');

    const user = jwt.verify(token, process.env.JWT_KEY!) as UserInterface | undefined;
    if (req.method === 'GET') {
      const userProfile = await prisma.user.findFirst({
        where: { email: user?.email },
        include: { Notes: true },
      });

      // avoid bigint map error
      const mappedProfile = JSON.parse(JSON.stringify(userProfile, (_key, value) => (typeof value === 'bigint' ? +value.toString() : value)));
      const notes = mappedProfile.Notes;

      res.status(200).json({ error: false, data: { notes } });
    }

    if (req.method === 'POST') {
      const { title, body } = req.body;
      const userProfile = await prisma.user.findFirst({
        where: { email: user?.email },
        select: { id: true },
      });

      const note = await prisma.note.create({
        data: { title, body, userId: userProfile?.id! },
      });

      if (!note) throw new Error('Failed adding note');
      res.status(200).json({ error: false, data: { note: { ...note, id: +note.id.toString() } } });
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
}

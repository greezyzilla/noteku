// eslint-disable-next-line import/no-extraneous-dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../utils/lib/prisma,';
import { NoteInterface } from '../../../interfaces';

interface UserInterface{
  name : string;
  email : string;
}

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Not Authorized');
    const user = jwt.verify(token, process.env.JWT_KEY!) as UserInterface | undefined;

    const id = BigInt(+req.query.id! || 0);
    const note = await prisma.user.findFirst({
      where: { email: user?.email },
      include: { Notes: { where: { id } } },
    });
    if (!note?.Notes.length) throw new Error('Failed deleting note');

    // EDIT NOTE
    if (req.method === 'PUT') {
      const {
        title, body, starred, archived, createdAt,
      } = req.body as NoteInterface;

      const newNote = await prisma.note.update({
        data: {
          title, body, starred, archived, createdAt,
        },
        where: { id },
      });
      res.status(200).json({ error: false, data: { note: { ...newNote, id: +`${newNote.id}` } } });
    }

    // DELETE NOTE
    if (req.method === 'DELETE') {
      await prisma.note.delete({ where: { id } });
      res.status(200).json({ error: false });
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
}

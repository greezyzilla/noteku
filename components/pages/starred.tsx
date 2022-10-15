import { useAppSelector } from '../../app/hooks';
import { NoteList } from '../organisms';
import Dashboard from '../templates/dashboard';

export default function Starred() {
  const { notes } = useAppSelector((state) => state.note);
  const filteredNotes = notes.filter((note) => note.starred);

  return (
    <Dashboard>
      <NoteList notes={filteredNotes} />
    </Dashboard>
  );
}

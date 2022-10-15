import { useAppSelector } from '../../app/hooks';
import { NoteList } from '../organisms';
import Dashboard from '../templates/dashboard';

export default function Archived() {
  const { notes } = useAppSelector((state) => state.note);
  const filteredNotes = notes.filter((note) => note.archived);

  return (
    <Dashboard>
      <NoteList notes={filteredNotes} />
    </Dashboard>
  );
}

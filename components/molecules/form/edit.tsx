import { ChangeEvent, ComponentProps, useState } from 'react';
import { createPortal } from 'react-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import {
  Button, InputText, InputTextarea, Modal,
} from '../../atoms';
import { useAppDispatch } from '../../../app/hooks';
import { editNote } from '../../../features/note';
import { NoteInterface } from '../../../interfaces';

interface EditNoteFormProps {
  children : ComponentProps<any>;
  note: NoteInterface;
}

const initialState = {
  note: {
    title: '',
    archived: false,
    starred: false,
    body: '',
  },
  isActive: false,
};

export default function EditNoteForm({ children, note } : EditNoteFormProps) {
  const [data, setData] = useState({
    ...initialState,
    note: {
      ...initialState.note,
      ...note,
    },
  });

  const dispatch = useAppDispatch();

  const onCloseHandle = () => {
    setData({
      ...initialState,
      note: {
        ...initialState.note,
        ...note,
      },
    });
  };

  const onOpenHandle = () => {
    setData((prevState) => ({ ...prevState, isActive: true }));
  };

  const onChangeHandle = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === 'title' && event.target.value.length > 50) return;
    setData((prevState) => ({
      ...prevState,
      note: {
        ...prevState.note,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const onSubmitHandle = async () => {
    await dispatch(editNote(data.note));
    onCloseHandle();
  };

  const modalComponent = data.isActive
    ? createPortal(
      <Modal onClose={onCloseHandle}>
        <div className="w-[320px] divide-y shadow-2xl dark:divide-slate-600 sm:w-[500px]">
          <div className="flex items-center gap-4 bg-gradient-to-l from-orange-400 to-orange-600 px-5 pt-5 pb-4">
            <div className="rounded-md bg-orange-100 p-2">
              <PencilSquareIcon className="h-3 w-3 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-white">EDIT NOTE</h2>
          </div>
          <div className="flex flex-col gap-4 divide-y-2 px-5 pt-4 pb-5 sm:px-8">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <InputText
                name="title"
                title="Title"
                placeholder="What do you call this note?"
                onChange={(e) => onChangeHandle(e)}
                value={data.note.title}
                limit={50}
              />
              <InputTextarea
                name="body"
                title="Body"
                placeholder="Something you want to write about this note?"
                onChange={(e : any) => onChangeHandle(e)}
                value={data.note.body}
              />
            </form>
          </div>
          <div className="flex h-14">
            <Button onClick={onCloseHandle}>Close</Button>
            <Button onClick={onSubmitHandle} isFilled>Submit</Button>
          </div>
        </div>
      </Modal>,
      document.body,
    ) : null;
  return (
    <>
      {modalComponent}
      {children({ onClick: onOpenHandle })}
    </>
  );
}

import { ChangeEvent, ComponentProps, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import {
  Button, InputText, InputTextarea, Modal,
} from '../../atoms';
import { useAppDispatch } from '../../../app/hooks';
import { addNote } from '../../../features/note';

const initialState = {
  note: {
    title: '',
    archived: false,
    starred: false,
    body: '',
  },
  isActive: false,
};

export default function AddNoteForm({ children } : {children : ComponentProps<any>}) {
  const [data, setData] = useState({
    ...initialState,
    note: {
      ...initialState.note,
      id: +new Date(),
      createdAt: new Date().toISOString(),
    },
  });

  const dispatch = useAppDispatch();

  const onCloseHandle = () => {
    setData({
      ...initialState,
      note: {
        ...initialState.note,
        id: +new Date(),
        createdAt: new Date().toISOString(),
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
    await dispatch(addNote(data.note));
    onCloseHandle();
  };

  const modalComponent = data.isActive
    ? createPortal(
      <Modal onClose={onCloseHandle}>
        <div className="w-[320px] divide-y shadow-2xl dark:divide-slate-600 sm:w-[500px]">
          <div className="flex items-center gap-4 bg-gradient-to-l from-blue-400 to-blue-600 px-5 pt-5 pb-4 dark:from-blue-700 dark:to-blue-800">
            <div className="rounded-md bg-blue-100 p-2 dark:bg-slate-900/80">
              <PlusIcon className="h-3 w-3 text-blue-600 shadow-sm dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white dark:text-slate-900/90">ADD NEW NOTE</h2>
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

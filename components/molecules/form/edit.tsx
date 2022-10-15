import { ChangeEvent, Component, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Button, InputText, InputTextarea, Modal,
} from '../../atoms';
import { NoteInterface } from '../../../interfaces';

interface EditNoteFormState{
  data : NoteInterface;
  isActive : boolean;
}

interface EditNoteFormProps{
  note: NoteInterface;
  onEdit(_note: NoteInterface) : void;
  children(_params : { onClick: () => void }) : void;
}

export default class EditNoteForm extends Component<EditNoteFormProps, EditNoteFormState> {
  constructor(props : EditNoteFormProps) {
    super(props);
    const { note } = props;
    this.state = { data: note, isActive: false };
  }

  onCloseHandle() {
    const { note } = this.props;
    this.setState({ data: note, isActive: false });
  }

  onOpenHandle() {
    const { note } = this.props;
    this.setState({ data: note, isActive: true });
  }

  onChangeHandle(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.target.name === 'title' && event.target.value.length > 50) return;
    this.setState((prevState : EditNoteFormState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [event.target.name]: event.target.value,
      },
    }));
  }

  onSubmitHandle() {
    const { onEdit } = this.props;
    const { data } = this.state;

    onEdit(data);
    this.onCloseHandle();
  }

  render() {
    const { isActive, data: { title, body } } = this.state;
    const { children } = this.props;

    const modalComponent = isActive
      ? createPortal(
        <Modal onClose={() => this.onCloseHandle()}>
          <div className="w-[320px] divide-y shadow-2xl sm:w-[500px]">
            <div className="flex items-center gap-4 bg-gradient-to-l from-orange-400 to-orange-600 px-5 pt-5 pb-4">
              <div className="rounded-md bg-orange-100 p-2">
                <PencilSquareIcon className="h-3 w-3 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-white">EDIT NOTE</h2>
            </div>
            <div className="flex flex-col gap-4 divide-y-2 px-5 pt-4 pb-5 sm:px-8">
              <form className="flex flex-col gap-4" onSubmit={(e : FormEvent) => e.preventDefault()}>
                <InputText
                  name="title"
                  title="Title"
                  placeholder="What do you call this note?"
                  onChange={(e : ChangeEvent<HTMLInputElement>) => this.onChangeHandle(e)}
                  value={title}
                  limit={50}
                  isSecondary
                />
                <InputTextarea
                  name="body"
                  title="Body"
                  placeholder="Something you want to write about this note?"
                  onChange={(e : ChangeEvent<HTMLTextAreaElement>) => this.onChangeHandle(e)}
                  value={body}
                  isSecondary
                />
              </form>
            </div>
            <div className="flex">
              <Button onClick={() => this.onCloseHandle()} isSecondary>Close</Button>
              <Button onClick={() => this.onSubmitHandle()} isSecondary isFilled className="h-14">Submit</Button>
            </div>
          </div>
        </Modal>,
        document.body,
      ) : null;
    return (
      <>
        {modalComponent}
        {children({ onClick: () => this.onOpenHandle() })}
      </>
    );
  }
}

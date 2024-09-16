import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
} from 'react';
import TextField from './TextField';
import { updateTitle } from '../api/ComissionAPI';
import useLoaderStore from '../store/loaderStore';

interface EditableTextProps {
  initialText: string;
  id?: string;
  onSubmit?: (text: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText = '',
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(initialText);
  const { setLoading } = useLoaderStore((state) => state);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempText(event.target.value);
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    setText(tempText);
    if (id) updateTitle(id, tempText);
    setIsEditing(false);
    setLoading(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick} className="flex flex-row">
      {isEditing ? (
        <>
          <TextField
            name="title"
            type="text"
            value={tempText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button onClick={handleSubmit} style={{ marginLeft: '5px' }}>
            ✔️
          </button>
          <button onClick={handleCancel} style={{ marginLeft: '5px' }}>
            ❌
          </button>
        </>
      ) : (
        <h3 className="text-black text-xl font-bold tracking-tight text-start mb-1">
          {text}
        </h3>
      )}
    </div>
  );
};

export default EditableText;

import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
} from "react";
import TextField from "./TextField";
import { updateTitle } from "../api/ComissionAPI";
import useLoaderStore from "../store/loaderStore";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface EditableTextProps {
  initialText: string;
  id?: string;
  onSubmit?: (text: string) => void;
  isPointScale?: boolean; // New prop to control if the item is a point scale
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText = "",
  id,
  isPointScale = false, // Default to false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(initialText);
  const { setLoading } = useLoaderStore((state) => state);

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
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-row items-center">
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
          <button onClick={handleSubmit} style={{ marginLeft: "5px" }}>
            <CheckIcon width={30} className="ml-1 text-green-600" />
          </button>
          <button onClick={handleCancel} style={{ marginLeft: "5px" }}>
            <XMarkIcon width={30} className="ml-1 text-red-600" />
          </button>
        </>
      ) : (
        <>
          <h3 className="text-black text-xl font-bold tracking-tight text-start mb-1">
            {text}
          </h3>
          {/* Conditionally render the Edit button if it's not a point scale */}
          {!isPointScale && (
            <button
              onClick={() => setIsEditing(true)}
              style={{ marginLeft: "5px", cursor: "pointer" }}
              className="px-2 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <PencilSquareIcon width={25} className="ml-1 text-blue-600" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EditableText;

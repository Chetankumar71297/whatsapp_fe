import EmojiPicker from "emoji-picker-react";
import { CloseIcon, EmojiIcon } from "../../../svg";
import { useEffect, useState } from "react";

export default function EmojiPickerApp({ message, setMessage, inputRef }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [cursorPosition, setCursorPosition] = useState();

  //change the cursor position in the input field
  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  //update the input field with emoji and update the new cursor position
  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        {showEmojiPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/*Emoji picker*/}
      {showEmojiPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      ) : null}
    </li>
  );
}

import { AttachmentIcon } from "../../../../svg";
import Menu from "./Menu";

export default function Attachments({
  showAttachments,
  setShowAttachments,
  setShowEmojiPicker,
}) {
  return (
    <li className="relative">
      <button
        onClick={() => {
          setShowEmojiPicker(false);
          setShowAttachments((prev) => !prev);
        }}
        type="button"
        className="btn"
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/*menu*/}
      {showAttachments ? <Menu /> : null}
    </li>
  );
}

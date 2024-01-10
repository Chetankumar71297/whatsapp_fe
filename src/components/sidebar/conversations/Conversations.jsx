import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversation } = useSelector((state) => state.chat);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversation &&
          conversation.map((convo) => (
            <Conversation convo={convo} key={convo._id} />
          ))}
      </ul>
    </div>
  );
}

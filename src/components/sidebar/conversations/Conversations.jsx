import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversation, activeConversation } = useSelector(
    (state) => state.chat
  );

  return (
    <div className="convos scrollbar">
      <ul>
        {conversation &&
          conversation
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo) => <Conversation convo={convo} key={convo._id} />)}
      </ul>
    </div>
  );
}

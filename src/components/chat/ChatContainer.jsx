import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect } from "react";
import { getConversationMessages } from "../../features/chatSlice";
import { ChatActions } from "./actions";
import { checkOnlineStatus } from "../../utils/chat";
import FilesPreview from "./preview/files/FilesPreview";

export default function ChatContainer({
  onlineUsers,
  typing,
  convoIdInTypingEvent,
  callUser,
}) {
  const dispatch = useDispatch();

  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/*Container*/}
      <div>
        {/*Chat header*/}
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
          callUser={callUser}
        />
        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            {/*chat messages*/}
            <ChatMessages
              typing={typing}
              convoIdInTypingEvent={convoIdInTypingEvent}
            />
            {/*chat actions*/}
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
}

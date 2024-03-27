import { useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useRef } from "react";
import TypingStatusShower from "./TypingStatusShower";
import FileMessage from "./files/FileMessage";

export default function ChatMessages({ typing, convoIdInTypingEvent }) {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const scrollToThisRef = useRef(null); //keep ref of div to which scrolling will take place

  //scrolling functionality
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    scrollToThisRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
      bg-cover bg-no-repeat
      "
    >
      {/*Container*/}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/*Messages*/}
        {messages &&
          messages.map((message) => (
            <>
              {/*message files*/}
              {message.files.length > 0
                ? message.files.map((file) => (
                    <FileMessage
                      fileMessageData={file}
                      message={message}
                      key={message._id}
                      me={user._id === message.sender._id}
                    />
                  ))
                : null}
              {/*message text*/}
              {message.message.length > 0 ? (
                <Message
                  message={message}
                  key={message._id}
                  me={user._id === message.sender._id}
                />
              ) : null}
            </>
          ))}
        {typing && convoIdInTypingEvent === activeConversation._id ? (
          <TypingStatusShower />
        ) : (
          ""
        )}
        <div className="mt-10" ref={scrollToThisRef}></div>
        {/*Chat will automatically scrolled to this div.Without this we have to manually scroll every time if messages go to the bottom of screen*/}
      </div>
    </div>
  );
}

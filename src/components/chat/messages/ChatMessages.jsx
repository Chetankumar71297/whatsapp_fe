import { useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useRef } from "react";

export default function ChatMessages() {
  const { messages } = useSelector((state) => state.chat);
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
            <Message
              message={message}
              key={message._id}
              me={user._id === message.sender._id}
            />
          ))}
        <div ref={scrollToThisRef}></div>
        {/*Chat will automatically scrolled to this div.Without this we have to manually scroll every time if messages go to the bottom of screen*/}
      </div>
    </div>
  );
}

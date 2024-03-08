import { forwardRef, useContext, useEffect, useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { useSelector } from "react-redux";

//forwardRef allows custom component to pass it's ref to it's parent component.React doesn't allow child custom component to directly pass ref to it's parent component, only built in component like input component are allowed.
const Input = forwardRef(({ message, setMessage }, ref) => {
  const [typing, setTyping] = useState(false);
  const [lastTypingTime, setLastTypingTime] = useState(null);
  const socket = useContext(SocketContext);
  const { activeConversation } = useSelector((state) => state.chat);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    setLastTypingTime(new Date().getTime());
  };

  useEffect(() => {
    let timerId;
    if (typing) {
      let timer = 2000;
      timerId = setTimeout(() => {
        let timeNow = new Date().getTime();
        let timeDifference = timeNow - lastTypingTime;
        //emit "stop typing" event when timeDifference become 2 seconds
        if (timeDifference >= timer && typing) {
          socket.emit("stop typing", activeConversation._id);
          setTyping(false);
        }
      }, timer);
    }
    //cleanup function for useEffect.This cleanup function will remove the previously set timer if that timer is of no use
    return () => {
      clearTimeout(timerId);
    };
  }, [activeConversation._id, lastTypingTime, socket, typing]);

  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
        ref={ref}
      />
    </div>
  );
});

export default Input;

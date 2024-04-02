import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { useEffect, useRef, useState } from "react";
import {
  getConversation,
  updateMessagesAndConversation,
} from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";

const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
};
function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //typing status(typing event)
  const [typing, setTyping] = useState(false);
  const [convoIdInTypingEvent, setConvoIdInTypingEvent] = useState(null);
  //call
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState(callData);
  const [callAccepted, setCallAccepted] = useState(false);
  const { receivingCall, callEnded, socketId } = call;

  const myVideoRef = useRef();
  const friendVideoRef = useRef();

  //get user media and socket id for video chat
  useEffect(() => {
    setUpMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });
  }, []);

  const setUpMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        //myVideoRef.current.srcObject = stream;
      });
  };

  //join user into socket io
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get online users", (onlineUsersArray) => {
      setOnlineUsers(onlineUsersArray);
    });
  }, [user]);

  //get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversation(user.token));
    }
  }, [user]);

  useEffect(() => {
    //listening when server receives a message
    socket.on("received message", (message) => {
      dispatch(updateMessagesAndConversation(message));
    });
    //listening when a person on the other side of conversation is typing
    socket.on("typing", (convoId) => {
      setTyping(true);
      setConvoIdInTypingEvent(convoId);
    });
    //listening when a person on the other side of conversation has stoped typing for more than 2 seconds
    socket.on("stop typing", () => setTyping(false));
  }, []);
  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex py-[19px]">
          {/*sidebar*/}
          <Sidebar
            onlineUsers={onlineUsers}
            typing={typing}
            convoIdInTypingEvent={convoIdInTypingEvent}
          />
          {activeConversation._id ? (
            <ChatContainer
              onlineUsers={onlineUsers}
              typing={typing}
              convoIdInTypingEvent={convoIdInTypingEvent}
            />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/*call*/}
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        myVideoRef={myVideoRef}
        friendVideoRef={friendVideoRef}
        stream={stream}
      />
    </>
  );
}

//Before useContext existed, there was an older way to read context:(SomeContext.Consumer)
//It is Legacy way
const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;

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
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";
import Peer from "simple-peer"; //helps to create an offer easily

const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
  name: "",
  picture: "",
  signal: "",
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
  const [stream, setStream] = useState(null);
  const [show, setShow] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const { receivingCall, callEnded, socketId } = call;

  const myVideoRef = useRef(null);
  const friendVideoRef = useRef(null);
  const connectionRef = useRef(null);

  //get user media and socket id for video chat
  useEffect(() => {
    //setUpMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on("friend calling", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
      setShow(true);
    });
    socket.on("end call", () => {
      console.log(stream);
      if (stream) {
        console.log("hi3");
        stream.getTracks().forEach((track) => track.stop());
      }
      // Close the peer connection
      if (connectionRef.current) {
        console.log("hi2");
        connectionRef.current.destroy(); // Close the peer connection
      }

      myVideoRef.current = null;
      friendVideoRef.current = null;
      setCallAccepted(false);
      setShow(false);
      setStream(null);
      setCall({ ...call, callEnded: true, receivingCall: false });
      //myVideoRef.current.srcObject = null;
      //friendVideoRef.current.srcObject = null;
    });
  }, []);

  //calling functionality
  const callUser = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setShow(true);
        setStream(stream);
        //enableMedia(stream);
        setCall({
          ...call,
          name: getConversationName(user, activeConversation.users),
          picture: getConversationPicture(user, activeConversation.users),
        });
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
        // peer.addStream(stream);
        peer.on("signal", (data) => {
          //setUpMedia(peer);
          socket.emit("call user", {
            userToCall: getConversationId(user, activeConversation.users),
            signal: data,
            from: socketId,
            name: user.name,
            picture: user.picture,
          });
        });
        peer.on("stream", (stream) => {
          if (peer && friendVideoRef) {
            friendVideoRef.current.srcObject = stream;
          }
        });
        //setUpMedia(peer);
        socket.on("call accepted", (signal) => {
          setCall({
            ...call,
            signal: signal,
          });
          setCallAccepted(true);
          peer.signal(signal);
          console.log(peer);
        });
        console.log(peer);
        //peer.removeAllListeners();
        connectionRef.current = peer;
      });
    //enableMedia();
    // setShow(true)
  };

  const enableMedia = (stream) => {
    myVideoRef.current.srcObject = stream;
    //setShow(true);
  };

  //answering call functionality
  const answerCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setCallAccepted(true);
        setStream(stream);

        const peer = new Peer({
          initiator: false,
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:global.stun.twilio.com:3478" },
              {
                urls: "stun:stun.relay.metered.ca:80",
              },
              {
                urls: "turn:in.relay.metered.ca:80",
                username: "89d518048543f6f73ea7570c",
                credential: "JEn0txk7UtE3WT7w",
              },
              {
                urls: "turn:in.relay.metered.ca:80?transport=tcp",
                username: "89d518048543f6f73ea7570c",
                credential: "JEn0txk7UtE3WT7w",
              },
              {
                urls: "turn:in.relay.metered.ca:443",
                username: "89d518048543f6f73ea7570c",
                credential: "JEn0txk7UtE3WT7w",
              },
              {
                urls: "turns:in.relay.metered.ca:443?transport=tcp",
                username: "89d518048543f6f73ea7570c",
                credential: "JEn0txk7UtE3WT7w",
              },
            ],
          },
          trickle: false,
          stream: stream,
        });
        //peer.addStream(stream);
        peer.on("signal", (data) => {
          console.log(data);
          socket.emit("answer call", {
            signal: data,
            respondingTo: call.socketId,
          });
        });
        peer.on("stream", (stream) => {
          friendVideoRef.current.srcObject = stream;
        });
        //setUpMedia(peer);
        peer.signal(call.signal);

        connectionRef.current = peer;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //end call
  const endCall = () => {
    console.log("1");
    // Close the peer connection
    if (connectionRef.current) {
      connectionRef.current.removeAllListeners();
      connectionRef.current.destroy(); // Close the peer connection
      socket.off("call accepted"); //removing this listener because if not removed then it runs with previous signal object(or answer received by remote peer). This phenomena leads to an error:- (cannot signal after peer is destroyed) from peer.signal() method
    }

    // Stop the local stream
    if (stream) {
      console.log(stream);
      stream.getTracks().forEach((track) => track.stop());
    }
    //connectionRef?.current?.removeStream(stream);
    //connectionRef?.current?.removeAllListeners();
    //connectionRef?.current?.destroy();
    console.log("2");
    if (call.receivingCall) {
      socket.emit("end call", {
        userIdOfUserToRespond: null,
        socketIdOfUserToRespond: call.socketId,
      });
    } else {
      socket.emit("end call", {
        userIdOfUserToRespond: getConversationId(
          user,
          activeConversation.users
        ),
        socketIdOfUserToRespond: null,
      });
    }

    myVideoRef.current = null;
    friendVideoRef.current = null;
    setCallAccepted(false);
    setShow(false);
    setStream(null);
    setCall({ ...call, callEnded: true, receivingCall: false });
    //myVideoRef.current.srcObject = null;
    //friendVideoRef.current.srcObject = null;
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
              callUser={callUser}
            />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/*call*/}
      <div className={show ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideoRef={myVideoRef}
          friendVideoRef={friendVideoRef}
          stream={stream}
          answerCall={answerCall}
          show={show}
          endCall={endCall}
          enableMedia={enableMedia}
        />
      </div>
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

import { useState } from "react";
import CallActions from "./CallActions";
import Header from "./Header";
import Ringing from "./Ringing";
import VideoChatScreen from "./VideoChatScreen";

export default function Call({
  call,
  setCall,
  callAccepted,
  myVideoRef,
  friendVideoRef,
  stream,
}) {
  const { receivingCall, callEnded, name, picture } = call;
  const [showActions, setShowActions] = useState(false);
  return (
    <>
      {console.log(receivingCall)}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${
          receivingCall && !callAccepted ? "hidden" : ""
        }`}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/*container*/}
        <div>
          <div>
            {/*header*/}
            <Header />
            {/*video chat screen*/}
            <VideoChatScreen name={name} />
            {/*call actions*/}
            {showActions ? <CallActions /> : null}
          </div>
          <div>
            {/*friend video*/}
            <div>
              <video
                ref={friendVideoRef}
                playsInline
                muted
                autoPlay
                className="largeVideoCall"
              ></video>
            </div>
            {/*my video*/}
            <div>
              <video
                ref={myVideoRef}
                playsInline
                muted
                autoPlay
                className={`smallVideoCall ${
                  showActions ? "moveVideoCall" : ""
                }`}
              ></video>
            </div>
          </div>
        </div>
      </div>
      {/*ringing*/}
      {receivingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </>
  );
}

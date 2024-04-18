import { useEffect, useState } from "react";
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
  answerCall,
  show,
  endCall,
  enableMedia,
}) {
  const { receivingCall, callEnded, name, picture } = call;
  const [showActions, setShowActions] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (myVideoRef.current || (callAccepted && myVideoRef.current)) {
      enableMedia(stream);
    }
  }, [stream, show, myVideoRef, callAccepted]);
  return (
    <>
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
            {showActions ? <CallActions endCall={endCall} /> : null}
          </div>
          <div>
            {/*friend video*/}
            {callAccepted && !callEnded ? (
              <div>
                <video
                  ref={friendVideoRef}
                  playsInline
                  muted
                  autoPlay
                  className={toggle ? "smallVideoCall" : "largeVideoCall"}
                  onClick={() => {
                    setToggle((prev) => !prev);
                  }}
                ></video>
              </div>
            ) : null}
            {/*my video*/}
            {stream ? (
              <div>
                <video
                  ref={myVideoRef}
                  playsInline
                  muted
                  autoPlay
                  className={`${toggle ? "largeVideoCall" : "smallVideoCall"} ${
                    showActions ? "moveVideoCall" : ""
                  }`}
                  onClick={() => {
                    setToggle((prev) => !prev);
                  }}
                ></video>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/*ringing*/}
      {receivingCall && !callAccepted ? (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      ) : null}
      {/*ringtone*/}
      {!callAccepted && show ? (
        <audio src="../../../../audio/ringing.mp3" autoPlay loop></audio>
      ) : null}
    </>
  );
}

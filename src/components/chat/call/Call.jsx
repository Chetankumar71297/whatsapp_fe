import { useState } from "react";
import CallActions from "./CallActions";
import Header from "./Header";
import Ringing from "./Ringing";
import VideoChatScreen from "./VideoChatScreen";

export default function Call({ call, setCall, callAccepted }) {
  const { receivingCall, callEnded } = call;
  const [showActions, setShowActions] = useState(false);
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg"
      onMouseOver={() => setShowActions(true)}
      onMouseOut={() => setShowActions(false)}
    >
      {/*container*/}
      <div>
        <div>
          {/*header*/}
          <Header />
          {/*video chat screen*/}
          <VideoChatScreen name="jignesh" />
          {/*call actions*/}
          {showActions ? <CallActions /> : null}
        </div>
      </div>
      {/*ringing*/}
      {receivingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
}

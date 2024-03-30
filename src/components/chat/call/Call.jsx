import Ringing from "./Ringing";

export default function Call({ call, setCall, callAccepted }) {
  const { receivingCall, callEnded } = call;
  return (
    <div>
      {receivingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
}

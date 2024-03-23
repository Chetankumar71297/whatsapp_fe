import { useDispatch, useSelector } from "react-redux";
import Add from "./Add";
import { SendIcon } from "../../../../svg";
import { uploadFilesOnCloudinary } from "../../../../utils/upload";
import { useState } from "react";
import { clearFiles, sendMessage } from "../../../../features/chatSlice";
import SocketContext from "../../../../context/SocketContext";
import { ClipLoader } from "react-spinners";

function HandleAndSend({ activeIndex, setActiveIndex, message, socket }) {
  const dispatch = useDispatch();
  const { files, activeConversation } = useSelector((state) => state.chat);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    //upload files on cloudinary
    const uploaded_files = await uploadFilesOnCloudinary(files);
    //send the message
    const values = {
      token,
      message,
      convo_id: activeConversation._id,
      files: uploaded_files.length > 0 ? uploaded_files : [],
    };
    let newMsg = await dispatch(sendMessage(values));
    socket.emit("send message", newMsg.payload);
    setLoading(false);
    dispatch(clearFiles());
  };

  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      {/*empty*/}
      <span></span>
      {/*list files*/}
      <div className="flex items-center gap-x-2">
        {files.map((file, i) => (
          <div
            key={i}
            className={`w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer ${
              activeIndex === i ? "border-[3px] !border-green_1" : ""
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {file.type === "IMAGE" ? (
              <img
                src={file.fileData}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={`../../../../images/file/${file.type}.png`}
                alt=""
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
          </div>
        ))}
        {/*add another file*/}
        <Add setActiveIndex={setActiveIndex} />
      </div>
      {/*send button*/}
      <div
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={(e) => sendMessageHandler(e)}
      >
        {loading ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </div>
    </div>
  );
}

//Before useContext existed, there was an older way to read context:(SomeContext.Consumer)
//It is Legacy way
const HandleAndSendWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleAndSend {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HandleAndSendWithSocket;

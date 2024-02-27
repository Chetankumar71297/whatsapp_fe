import { useDispatch, useSelector } from "react-redux";
import { dateHandler } from "../../../utils/date";
import { openCreateConversation } from "../../../features/chatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { capitalize } from "../../../utils/string";
import SocketContext from "../../../context/SocketContext";

function Conversation({ convo, socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const { token } = user;
  const values = {
    token,
    receiver_id: getConversationId(user, convo.users),
  };
  const openConversation = async () => {
    let newConvo = await dispatch(openCreateConversation(values));
    socket.emit("join conversation", newConvo.payload._id);
  };
  return (
    <li
      onClick={() => openConversation()}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
        convo._id !== activeConversation._id ? "dark:bg-dark_bg_2" : ""
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""
      }`}
    >
      {/*container*/}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/*left*/}
        <div className="flex items-center gap-x-3">
          {/*conversation user picture*/}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={getConversationPicture(user, convo.users)}
              alt="picture"
              className="w-full h-full object-cover"
            />
          </div>
          {/*conversation name and message*/}
          <div className="w-full flex flex-col">
            {/*name*/}
            <h1 className="font-bold flex items-center gap-x-2">
              {capitalize(getConversationName(user, convo.users))}
            </h1>
            {/*message*/}
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                <p>
                  {convo.latestMessage?.message.length > 25
                    ? `${convo.latestMessage?.message.substring(0, 25)}...`
                    : convo.latestMessage?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*right*/}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage.createdAt)
              : ""}
          </span>
        </div>
      </div>
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

//Before useContext existed, there was an older way to read context:(SomeContext.Consumer)
//It is Legacy way
const ConversationWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ConversationWithSocket;

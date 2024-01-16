import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { useEffect } from "react";
import { getConversation } from "../features/chatSlice";
import { WhatsappHome } from "../components/chat";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  //get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversation(user.token));
    }
  }, [user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/*container*/}
      <div className="container h-screen flex py-[19px]">
        {/*sidebar*/}
        <Sidebar />
        {activeConversation._id ? "home" : <WhatsappHome />}
      </div>
    </div>
  );
}

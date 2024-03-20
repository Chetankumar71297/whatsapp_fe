import Header from "./Header";
import FileViewer from "./FileViewer";
import Input from "./Input";
import HandleAndSend from "./HandleAndSend";
import { useState } from "react";

export default function FilesPreview() {
  const [message, setMessage] = useState("");
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/*container*/}
      <div className="w-full flex flex-col items-center">
        {/*header*/}
        <Header />
        {/*viewing selected files*/}
        <FileViewer />
        <div className="w-full flex flex-col items-center">
          {/*message input*/}
          <Input message={message} setMessage={setMessage} />
          {/*send and manipulate files*/}
          <HandleAndSend />
        </div>
      </div>
    </div>
  );
}

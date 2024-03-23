import Header from "./Header";
import FileViewer from "./FileViewer";
import Input from "./Input";
import HandleAndSend from "./HandleAndSend";
import { useState } from "react";

export default function FilesPreview() {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/*container*/}
      <div className="w-full flex flex-col items-center">
        {/*header*/}
        <Header activeIndex={activeIndex} />
        {/*viewing selected files*/}
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center">
          {/*message input*/}
          <Input message={message} setMessage={setMessage} />
          {/*send and manipulate files*/}
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
}

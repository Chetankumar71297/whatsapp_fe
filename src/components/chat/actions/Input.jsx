import { forwardRef } from "react";

//forwardRef allows custom component to pass it's ref to it's parent component.React doesn't allow child custom component to directly pass ref to it's parent component, only built in component like input component are allowed.
const Input = forwardRef(({ message, setMessage }, ref) => {
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
        ref={ref}
      />
    </div>
  );
});

export default Input;

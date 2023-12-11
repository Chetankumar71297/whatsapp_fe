import { CallIcon } from "./svg";
function App() {
  return (
    <div className="dark">
      <h1 className="dark:bg-dark_bg_1">
        <p className="text-black dark:text-white">
          styled from variables in tailwind.config file
        </p>
      </h1>
      <h1 className="customh1">i am already styled in index.css</h1>
    </div>
  );
}

export default App;

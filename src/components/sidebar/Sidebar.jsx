import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";

export default function sidebar() {
  return (
    <div className="w-[40%] h-full select-none">
      {/*sidebar header*/}
      <SidebarHeader />
      {/*notification*/}
      <Notifications />
    </div>
  );
}

import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search } from "./search";

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="w-[40%] h-full select-none">
      {/*sidebar header*/}
      <SidebarHeader />
      {/*notification*/}
      <Notifications />
      {/*search*/}
      <Search searchLength={searchResults.length} />
    </div>
  );
}

import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-[40%] h-full select-none">
      {/*sidebar header*/}
      <SidebarHeader />
      {/*notification*/}
      <Notifications />
      {/*search*/}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          {/*search results*/}
          <SearchResults searchResults={searchResults} />
        </>
      ) : (
        <>
          {/*conversations*/}
          <Conversations />
        </>
      )}
    </div>
  );
}

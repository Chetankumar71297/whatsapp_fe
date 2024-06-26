import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

export default function Sidebar({ onlineUsers, typing, convoIdInTypingEvent }) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="flex0030 max-w-[40%] h-full select-none">
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
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          {/*conversations*/}
          <Conversations
            onlineUsers={onlineUsers}
            typing={typing}
            convoIdInTypingEvent={convoIdInTypingEvent}
          />
        </>
      )}
    </div>
  );
}

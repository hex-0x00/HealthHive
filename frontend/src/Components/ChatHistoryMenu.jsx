import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../Components";
import { ButtonComp } from "../Components";

export default function ChatHistoryMenu({
  className,
  allChats,
  newChatHandler,
  isSmallScreen = false,
  handleToggle,
}) {
  return (
    <div
      className={`flex flex-col w-full p-4 justify-center items-center ${className}`}>
      <Input
        className="rounded-full px-6"
        placeholder="Search chats..."
        size="sm"
        type="search"
      />
      <div className="w-full my-6 overflow-y-scroll md:dark:bg-[#0c2929] overflow-x-hidden flex flex-col px-3 space-y-3 justify-center items-start text-gray-950 h-auto">
        <div className="w-full">
          <ButtonComp
            onClick={newChatHandler}
            className="dark:text-gray-300 font-semibold bg-gray-200 active:scale-[99%] ease-in-out duration-100 text-medium transition-all dark:bg-[#103838] w-full h-12 dark:hover:text-white flex justify-start px-6 rounded-3xl items-center">
            New chat
          </ButtonComp>
        </div>
        <hr className="bg-gray-500 my-3" />
        {allChats &&
          allChats.map((chat) => (
            <NavLink
              to={`/chats/${chat.id}`}
              onClick={() => {
                isSmallScreen ? handleToggle() : null;
              }}
              className={({ isActive }) =>
                `font-medium text-medium ${
                  isActive
                    ? "text-gray-950 dark:text-gray-100"
                    : "text-gray-500"
                } dark:bg-[#0c2929]`
              }
              key={chat.id}>
              {chat.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
}

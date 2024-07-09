import React, { useEffect, useRef, useState } from "react";
import {
  ChatBubble,
  Input,
  SendButton,
  ChatHistoryMenu,
  ArrowDownIcon,
} from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style/ChatPage.css";
import {
  resetGlobalInput,
  addMessage,
  updateChatTitle,
} from "../store/chatSlice";
import dbService from "../appwrite/dbConfig";
import run from '../server'

function ChatPage() {
  const [chat, setChat] = useState(null);
  const [input, setInput] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isSendButtonActive, setIsSendButtonActive] = useState(true);
  const [isBotAnswering, setIsBotAnswering] = useState(false);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const rawUserData = useSelector((state) => state.auth.userData);
  const rawAllChats = useSelector((state) => state.chat.chats.documents);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isGlobalInput = useSelector((state) => state.chat.globalInput);
  const dispatch = useDispatch();
  const MsgInputRef = useRef(null);

  // ai api handling

  const newChatHandler = () => {
    const newChatId = new Date().getTime().toString();
    navigate(`/chats/${newChatId}`);
    setChat("new chat");
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      if (rawUserData) {
        setUserData(rawUserData.userData || rawUserData);
      }
      if (rawAllChats) setAllChats(rawAllChats);
    }
  }, [isUserLoggedIn, rawUserData, rawAllChats]);

  useEffect(() => {
    if (isGlobalInput) {
      setInput(isGlobalInput);
      dispatch(resetGlobalInput());
      newChatHandler();
      MsgInputRef.current?.click();
    }

    // chat access based on route location
    location.pathname == "/chats"
      ? setIsChatActive(false)
      : setIsChatActive(true);
  }, [location, isGlobalInput]);

  const chatSubmitHandler = (e, isUser, req) => {
    if (isUser) {
      msgHandler(e, isUser, req);
    } else {
      msgHandler(e, isUser);
    }
  };

  const msgHandler = async (e, isAuthor, req = "") => {
    e.preventDefault();
    if (input) {
      setIsSendButtonActive(false);
      let newChatMsg;
      if (isAuthor) {
        setIsBotAnswering(true);
        const response = await run(req);
        newChatMsg = {
          id: Date.now().toString(),
          isAuthor: true,
          text: response,
        };
      } else {
        setIsChatLoading(true);
        if (chatId && input.trim()) {
          newChatMsg = {
            id: Date.now().toString(),
            isAuthor: false,
            text: input.trim(),
          };
        }
      }
      const chatExists = allChats.some((chat) => chat.id === chatId);

      if (chatExists) {
        try {
          const rawChat = await allChats.find((chat) => chat.id === chatId);
          const parsedContent = JSON.parse(rawChat.content);
          const updatedContent = [...parsedContent, newChatMsg];

          await dbService.sendMsg(chatId, {
            content: JSON.stringify(updatedContent),
          });

          const updatedChat = {
            ...rawChat,
            content: JSON.stringify(updatedContent),
          };
          setAllChats((prevChats) =>
            prevChats.map((chat) => (chat.id === chatId ? updatedChat : chat))
          );

          dispatch(
            addMessage({ chatId, message: newChatMsg, userId: userData?.$id })
          );
        } catch (error) {
          setError("Failed to send message: ", error);
        } finally {
          setIsChatLoading(false);
          setIsBotAnswering(false);
          setIsSendButtonActive(true);
          if (!isAuthor) chatSubmitHandler(e, true, input);
          setInput("");
        }
      } else {
        try {
          const newChat = {
            id: chatId,
            title: `New Chat ${allChats.length + 1}`,
            content: JSON.stringify([newChatMsg]),
            userId: userData?.$id,
          };
          await dbService.createNewChat(newChat);

          setAllChats((prevChats) => [...prevChats, newChat]);

          dispatch(
            addMessage({ chatId, message: newChatMsg, userId: userData?.$id })
          );
          dispatch(updateChatTitle({ chatId, title: newChat.title }));
        } catch (error) {
          setError("Failed to create chat: ", error);
        } finally {
          setIsChatLoading(false);
          setIsBotAnswering(false);
          setIsSendButtonActive(true);
          if (!isAuthor) chatSubmitHandler(e, true, input);
          setInput("");
        }
      }
    }
  };

  const handleToggle = () => {
    setIsRotated(!isRotated);
  };

  useEffect(() => {
    (async () => {
      if (allChats.length > 0 && chatId) {
        try {
          setLoading(true);
          const currentChat = await allChats.find((chat) => chat.id === chatId);
          if (currentChat) {
            const rawChatContent = JSON.parse(currentChat.content);
            if (typeof rawChatContent == "string") {
              const chatContent = JSON.parse(rawChatContent);
              const chatData = { ...currentChat, content: chatContent };
              setChat(chatData);
            } else {
              const chatData = { ...currentChat, content: rawChatContent };
              setChat(chatData);
            }
          }
        } catch (error) {
          setChat([]);
          setError("Some error occurred while fetching data: ", error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [allChats, chatId]);

  return (
    <>
      {userData && isUserLoggedIn ? (
        <div className="h-[85vh] flex justify-center space-x-0 md:space-x-4 items-center w-screen">
          <div className="h-[75vh] lg:inline hidden mb-[5vh] lg:5/12 xl:w-3/12 dark:bg-[#0c2929] bg-[#f2fcfa] dark:border-[#0b2626] border-2 rounded-3xl">
            <ChatHistoryMenu
              allChats={allChats}
              newChatHandler={newChatHandler}
            />
          </div>
          <div className="lg:h-[75vh] pb-[70px] h-[85vh] mb-[5vh] lg:w-7/12 w-full dark:border-[#0b2626] dark:bg-[#0c2929] lg:bg-[#f2fcfa] relative border-0 lg:border-2 rounded-3xl">
            <div className="history-button lg:hidden flex justify-center dark:bg-[#091f1f] items-center w-full">
              <button
                className="flex z-40 space-x-3 font-semibold items-center justify-center"
                onClick={handleToggle}>
                History
                <ArrowDownIcon isRotated={isRotated} />
              </button>
            </div>
            <div
              className={`w-screen fixed z-10 overflow-hidden ease-in-out transition-all dark:bg-[#0c2929] bg-[#EBF7F7] ${
                isRotated ? "h-[85vh]" : "h-0"
              }`}>
              <ChatHistoryMenu
                allChats={allChats}
                newChatHandler={newChatHandler}
                className="z-10"
                isSmallScreen={true}
                handleToggle={handleToggle}
              />
            </div>
            <div className="main-content px-2 w-full py-0 flex justify-center items-center h-[97%] overflow-y-scroll md:h-[70vh] lg:h-[64vh]">
              {isChatActive ? (
                <div className="chat-container w-full md:h-full h-[85%] overflow-y-scroll">
                  {loading ? (
                    <div className="h-full w-full flex justify-center items-center">
                      <h1 className="text-3xl text-black dark:text-white">
                        Loading...
                      </h1>
                    </div>
                  ) : null}
                  {error ? (
                    <div className="h-full w-full flex justify-center items-center">
                      <h1 className="text-3xl text-black dark:text-white">
                        {error}
                      </h1>
                    </div>
                  ) : null}

                  {chat &&
                    chat.content &&
                    chat.content.map((individualChat) => (
                      <ChatBubble
                        key={individualChat.id}
                        className="individual-chat"
                        isChatStart={individualChat.isAuthor}>
                        {individualChat.text}
                      </ChatBubble>
                    ))}
                  {isBotAnswering && (
                    <ChatBubble isChatStart="true">
                      <div className="darkChatLoader"></div>
                    </ChatBubble>
                  )}
                  {(chat == [] &&
                    typeof chat.content == "object" &&
                    chat.content.length == 0) ||
                  chat == "new chat" ? (
                    <div className="flex justify-center items-center h-full">
                      <span className="md:text-2xl text-lg text-gray-400 cursor-pointer font-semibold">
                        No chats found, ask something
                      </span>
                    </div>
                  ) : (
                    <div className="h-2/6"></div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col space-y-4">
                  <span
                    onClick={newChatHandler}
                    className="hover:underline md:text-2xl text-lg hover:text-gray-900 dark:hover:text-gray-200 text-gray-500 dark:text-gray-400 cursor-pointer font-semibold">
                    Select a chat or create new one
                  </span>
                </div>
              )}
            </div>
            <form
              ref={MsgInputRef}
              onSubmit={(e) =>
                isSendButtonActive ? chatSubmitHandler(e, false) : null
              }
              className="flex dark:bg-[#091f1f] md:dark:bg-[#0c2929] space-x-2 md:space-x-3 absolute justify-center bottom-0 md:bottom-3 items-center w-full">
              <div className="flex justify-center items-center w-9/12 2xl:w-5/6">
                <Input
                  className="h-[50px] rounded-xl focus:border-1 pl-4 w-full"
                  placeholder={
                    chatId ? "Say something..." : "Start a new conversation..."
                  }
                  size="sm"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="search"
                  autoComplete="off"
                  disabled={isChatActive ? false : true}
                />
              </div>
              <div className="md:inline-block hidden">
                <SendButton
                  isLoading={isChatLoading}
                  isSendButtonActive={isSendButtonActive}
                />
              </div>
              <div>
                {isChatLoading ? (
                  <div
                    className={`inline-block md:hidden rounded-xl ease-in-out active:scale-[95%] transition-colors
                  px-5 py-[13px] 
                  ${
                    isSendButtonActive
                      ? "bg-[#40bb98] active:bg-[#32a685]"
                      : "bg-[#175643] text-gray-500 active:bg-[#175643]"
                  }`}>
                    <div className="circleChatLoader"></div>
                  </div>
                ) : (
                  <button
                    className="inline-block md:hidden rounded-xl ease-in-out active:scale-[95%] transition-colors
                  px-5 py-[13px] bg-[#40bb98] active:bg-[#32a685]">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="h-[85vh] flex justify-center items-center">
          <Link
            to="/account/login"
            className="hover:underline text-4xl font-semibold pb-16">
            Login to continue
          </Link>
        </div>
      )}
    </>
  );
}

export default ChatPage;

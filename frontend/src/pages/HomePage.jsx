import { useState } from "react";
import { Card, SendButton } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { setGlobalInput } from "../store/chatSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import allSuggestions from "../../public/allSuggestions";

function HomePage() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(setGlobalInput(search));
    navigate("/chats");
  };

  const suggestionHandler = (e, suggestion) => {
    e.preventDefault();
    dispatch(setGlobalInput(suggestion));
    navigate("/chats");
  };

  return (
    <div className="min-screen min-h-[85vh] flex justify-center items-center flex-col">
      <div className="md:mt-10 pt-16 sm:w-9/ md:mb-12 md:pt-14 mt-0 h-52 w-11/12 md:w-7/12 flex justify-center items-center">
        <p className="text-4xl md:text-5xl pb-10 lg:text-6xl font-semibold w-full text-center">
          AI-powered{" "}
          <span className="text-[#40bb98] inline">OutsourcingGPT</span>{" "}
          Intelligent solution for your needs
        </p>
      </div>
      <div className="w-full flex pt-11 md:pt-0 justify-center items-center">
        <p className="pt-7 pb-2 w-8/12 md:w-4/6 text-center">
          Enter your task requirements and get matched with AI-powered solutions
        </p>
      </div>
      <form
        className="flex justify-center mb-8 gap-2 w-full"
        onSubmit={(e) => searchHandler(e)}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Type here"
          className="input md:w-full w-7/12 max-w-md dark:placeholder-[#565656] bg-[#c9d3d4] outline-[#5e5d5d] border-[1.5px] border-[#5e5d5d] rounded-[14px] px-4 py-2 text-black "
        />
        <div className="md:inline-block hidden">
          <SendButton />
        </div>
        <div>
          <button
            className="inline-block md:hidden rounded-xl ease-in-out active:scale-[95%] transition-colors active:bg-[#32a685]
                   bg-[#40bb98] px-5 py-[13px]">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
      <div className="my-16 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1170px]:px-32 lg:px-16 xl:px-0 px-0 xl:grid-cols-3 gap-6 justify-items-center">
          {allSuggestions &&
            allSuggestions.map((suggestion) => (
              <div className="w-full max-w-sm" key={suggestion.title}>
                <Card
                  title={suggestion.title}
                  onClick={(e) => suggestionHandler(e, suggestion.content)}
                  content={suggestion.content}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

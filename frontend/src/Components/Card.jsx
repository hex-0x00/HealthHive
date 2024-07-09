import React from "react";
import ButtonComp from "./ButtonComp";

function Card({ title, content, ...props }) {
  return (
    <div className="bg-[#f2fcfa] dark:bg-[#0d2e2e] dark:border-[#0e3030] hover:bg-[#eefffa] hover:dark:bg-[#0f3434] hover:scale-[101%] transition-all h-80 w-full sm:w-96 rounded-3xl flex flex-col border-2">
      <div className="flex justify-center items-center flex-col p-10">
        <h1 className="w-full cursor-pointer text-start font-semibold text-2xl mb-2">{title}</h1>
        <p className="cursor-pointer text-lg">{content}</p>
      </div>
      <div className="flex justify-center items-center">
        <ButtonComp {...props} className="text-white dark:bg-white dark:text-black bg-black" size="lg">
          Chat
        </ButtonComp>
      </div>
    </div>
  );
}

export default Card;

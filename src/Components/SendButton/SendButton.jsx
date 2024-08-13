import React from "react";
import "./SendButton.css";

function SendButton({ className = "", isLoading, isSendButtonActive,...props }) {
  return (
    <button
      {...props}
      className={`sendButton h-[50px] pt-[0.7em] pr-[0.9em] pb-[0.7em] pl-[1em] ${isSendButtonActive ? "bg-[#40bb98]" : "bg-[#175643]"} ${className}`}>
      {isLoading ? (
        <div className="chatLoader"></div>
      ) : (
        <>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </div>
          </div>
          <span className="font-semibold">Send</span>
        </>
      )}
    </button>
  );
}

export default SendButton;

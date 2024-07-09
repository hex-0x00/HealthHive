import React from "react";
import heroImg from "../media/about-img.jpeg";
import { useNavigate } from "react-router-dom";


function AboutUsPage() {
  const navigate = useNavigate();
  return (
    <div className="hero flex items-center bg-transparent min-h-[85vh] justify-center">
      <div className="hero-content flex gap-10 h-full w-full md:pb-16 flex-col lg:flex-row-reverse">
        <div className="h-full w-full">
          <h3 className="text-5xl font-bold">About Our Healthcare Chatbot</h3>
          <p className="lg:py-6 pt-4 py-7">
            Welcome to our Healthcare Chatbot platform, your digital companion
            in managing and navigating healthcare needs. Our chatbot is designed
            to provide seamless assistance and personalized support for a
            variety of healthcare-related inquiries, ensuring you get the
            information and help you need efficiently and effortlessly.
          </p>
          <button
            onClick={() => navigate("/chats")}
            className="btn bg-[#3fba97] text-black hover:bg-white hover:text-[#3fba97] border-2 border-[#3fba97]">
            Get Started
          </button>
        </div>
        <img
          src={heroImg}
          className="lg:max-w-sm max-w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}

export default AboutUsPage;

import { ButtonComp, ThemeBtn } from "../Components";
import React, { useEffect, useState } from "react";
import authService from "../appwrite/authConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function ProfileIcon() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout();
    dispatch(logout());
    setUserData(null);
    navigate("/");
  };

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const rawUserData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (rawUserData) {
        if (rawUserData.userData) {
          setUserData(rawUserData.userData);
        } else {
          setUserData(rawUserData);
        }
      }
    }
  }, [isUserLoggedIn, rawUserData]);

  return (
    <div className="dropdown w-12 dropdown-end z-[55] text-white">
      <div
        tabIndex={0}
        role="button"
        className="btn px-0 flex justify-center items-center bg-transparent border-none hover:bg-transparent">
        <div className="avatar placeholder cursor-pointer ">
          <div className="bg-[#33691e] text-white w-11 rounded-full">
            <span className="text-xs">UI</span>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-[#27292b] gap-[22px] py-[16px] rounded-box z-[1] w-[16rem] p-2 shadow flex flex-col items-center">
        <p>{userData ? userData.email : ""}</p>
        <div className="avatar placeholder cursor-pointer flex-col items-center">
          <div className="bg-[#33691e] text-white w-[4.5rem] mb-2 rounded-full">
            <span className="text-[32px]">UI</span>
          </div>
          <p>{userData ? `Hi, ${userData.name}!` : "Login to continue"}</p>
        </div>
        {userData && isUserLoggedIn ? (
          <ButtonComp onClick={logoutHandler}>
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              className="NMm5M">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
            Log out
          </ButtonComp>
        ) : (
          <div className="flex justify-center items-center overflow-hidden rounded-2xl">
            <ButtonComp
              className="rounded-none"
              onClick={() => {
                navigate("/account/login");
              }}>
              Login
            </ButtonComp>
            <ButtonComp
              className="rounded-none"
              onClick={() => {
                navigate("/account/signup");
              }}>
              Signup
            </ButtonComp>
          </div>
        )}
        <div className="flex justify-center items-center p-3 rounded-3xl bg-[#323232] space-x-3">
          <label htmlFor="theme-switch" className="text-[14px]">
            Dark Theme:{" "}
          </label>
          <ThemeBtn label="theme-switch" />
        </div>
        <div className="text-[11px] flex gap-2">
          <span>Privacy Policy</span> ●<span>Terms of Service</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileIcon;

import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./Components";
import { useEffect, useState } from "react";
import authService from "./appwrite/authConfig";
import dbService from "./appwrite/dbConfig";
import { login, logout } from "./store/authSlice";
import { setChats } from "./store/chatSlice";
import { useDispatch } from "react-redux";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const loginHandler = async (userData) => {
    try {
      await dispatch(login({ userData }));
      const userId = userData.$id
      const chatsResponse = await dbService.getChats(userId);
      const chats = chatsResponse.documents || [];
      dispatch(setChats(chats));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    try {
      authService
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            loginHandler(userData);
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setError(error);
    }
  }, []);

  if (loading)
    return (
      <div className="bg-[#091f1f] min-h-[100vh] flex-col flex justify-center items-center text-white">
        <p className="text-4xl font-semibold">Loading...</p>
        {error && <p>Something went wrong: {error}</p>}
      </div>
    );

  if (!loading) {
    if (error) {
      return <h1>Some error occurred: {error}</h1>;
    } else {
      return (
        <main className="bg-[#EBF7F7] overflow-x-hidden dark:text-white dark:bg-[#091f1f] min-h-[100vh]">
          <Header />
          <Outlet />
        </main>
      );
    }
  }
}

export default App;

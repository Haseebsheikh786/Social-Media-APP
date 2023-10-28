import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Protected from "./component/Protected";
import {
  FetchLogInUserAsync,
  selectLoggedInUser,
} from "./pages/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./pages/chat/Chat";
import ChatArea from "./pages/chat/chatArea";
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";

function App() {
  const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
  };
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const [addRemFriend, setAddRemFriend] = useState();
  const addRemoveuser = async (id) => {
    const response = await axios.patch(
      `/auth/${user._id}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setAddRemFriend(response.data);
  };
  useEffect(() => {
    dispatch(FetchLogInUserAsync());
  }, [dispatch, addRemFriend]);
  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Navbar addRemoveuser={addRemoveuser} addRemFriend={addRemFriend} />
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Home
                    addRemoveuser={addRemoveuser}
                    addRemFriend={addRemFriend}
                  />
                </Protected>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/chat"
              exact
              element={
                <Protected>
                  <Chat />
                </Protected>
              }
            >
              <Route
                path="chat/:_id"
                element={
                  <Protected>
                    {" "}
                    <ChatArea />
                  </Protected>
                }
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

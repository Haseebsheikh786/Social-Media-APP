import React, { useState } from "react";
import "./chat.css";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllFriendAsync,
  selectAllFriends,
  selectLoggedInUser,
} from "../User/userSlice";
import { useEffect } from "react";
import { createChatAsync, fetchChatsAsync, selectAllChats } from "./chatSlice";
import ChatList from "./ChatList";
import { Outlet } from "react-router-dom";
import axios from "axios";
const Chat = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectLoggedInUser);
  const users = useSelector(selectAllFriends);
  const chats = useSelector(selectAllChats);
  const [createChat, setCreateChat] = useState("");

  const handleChat = async (id) => {
    const res = await axios.post("/chat", {
      firstId: id,
      secondId: userInfo._id,
    });
    setCreateChat(res.data);
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(FetchAllFriendAsync());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchChatsAsync(userInfo._id));
    }
  }, [dispatch, userInfo, createChat]);
  return (
    <>
      <div className="Chat-Container">
        <div className="Sidebar">
          <div className="sb-header">
            <div
              class="modal fade  "
              id="exampleModal2"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog bg-black">
                <div class="modal-content bg-secondary">
                  <div class="modal-header">
                    <h2 class="modal-title mx-4 fs-3" id="exampleModalLabel">
                      Friend List{" "}
                    </h2>
                    <button
                      type="button"
                      class="btn-close text-black"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    {users.map((user, index) => {
                      return (
                        <div
                          className="d-flex  py-2 conversation-List"
                          key={index}
                          data-bs-dismiss="modal"
                          onClick={() => handleChat(user._id)}
                        >
                          <div className="icon">
                            <img
                              src={`/` + user.photo}
                              alt="img"
                              class="image-icon "
                            />
                          </div>
                          <h6 className="mt-4 cursor-pointer">
                            {user.username}
                          </h6>
                        </div>
                      );
                    })}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary text-white"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="conversation-container">
            <div className="d-flex ">
              <h1 className="fs-3">Conversations</h1>
              <div data-bs-toggle="modal" data-bs-target="#exampleModal2">
                <BiUserCircle className="exit fs-3 mx-5 my-1" />
              </div>
            </div>
            {chats.map((chat, index) => {
              const receipentID = chat?.members.find(
                (id) => id !== userInfo._id
              );
              return (
                <div className="my-2" key={index}>
                  <ChatList receipentID={receipentID} chat={chat} />
                </div>
              );
            })}
            {chats.length === 0 && (
              <h5 className="my-3 text-center">
                No conversations available at the moment. Start a new one.
              </h5>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Chat;

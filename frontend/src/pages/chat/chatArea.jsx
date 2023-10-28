import React, { useEffect, useRef, useState } from "react";
import MessageSelf from "./messageSelf";
import MessageOthers from "./messageOthers";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../User/userSlice";
import { BsFillSendFill } from "react-icons/bs";

var socket;
function ChatArea() {
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_photo, chat_name] = dyParams._id.split("&");
  const user = useSelector(selectLoggedInUser);
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const [socketConnection, setsocketConnection] = useState(null);

  const sendMessage = () => {
    var data = null;

    axios
      .post("/message/", {
        text: messageContent,
        chatId: chat_id,
        senderId: user._id,
      })
      .then(({ response }) => {
        data = response;
        socket.emit("newMessage", data);
      });
    setMessageContent("");
  };

  useEffect(() => {
    socket = io("/");
    socket.emit("setup", user?._id);
    socket.on("connection", () => {
      setsocketConnection(!socketConnection);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (!allMessagesCopy || allMessagesCopy._id) {
        setAllMessages([...allMessages], newMessage);
      } else {
        setAllMessages([...allMessages], newMessage);
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/message/" + chat_id).then(({ data }) => {
      setAllMessages(data);
      socket.emit("join chat", chat_id);
    });
    setAllMessagesCopy(allMessages);
  }, [chat_id, messageContent]);

  return (
    <div className={"chatArea-container"}>
      <div className={"chatArea-header"}>
        <div className="icon">
          <img
            src={`/` + chat_photo}
            alt="img"
            class="image-icon "
          />
        </div>{" "}
        <p className={"header-text pt-2"}>{chat_name}</p>
      </div>
      <div className={"messages-container"}>
        {allMessages
          .slice(0)
          .reverse()
          .map((message, index) => {
            const sender = message.senderId;
            const self_id = user?._id;
            if (sender === self_id) {
              return <MessageSelf props={message} key={index} />;
            } else {
              return (
                <MessageOthers props={message} key={index} senderId={sender} />
              );
            }
          })}
      </div>
      <div ref={messagesEndRef} className="BOTTOM" />
      <div className={"text-input-area"}>
        <input
          autoFocus
          placeholder="Type a Message"
          className={"search-box"}
          value={messageContent}
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              sendMessage();
              setMessageContent("");
            }
          }}
        />
        <BsFillSendFill className="icon" onClick={sendMessage} />
      </div>
    </div>
  );
}

export default ChatArea;

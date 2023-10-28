import React, { useEffect, useState } from "react";
import "./chat.css";
import axios from "axios";

function MessageOthers({ props, senderId }) {
  const [user, setUser] = useState(null);
  const userToekn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const User = async () => {
      const res = await axios.get(
        `/auth/${senderId}/user`,

        {
          headers: {
            Authorization: `Bearer ${userToekn.token}`,
          },
        }
      );
      setUser(res.data);
    };
    User();
  }, [senderId]);
  return (
    <div className={"other-message-container"}>
      <div className={"conversation-container"}>
        <div className={"other-text-content"}>
          <p className={"con-Title"}>{user?.username}</p>
          <p className={"con-lastMessage"}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageOthers;

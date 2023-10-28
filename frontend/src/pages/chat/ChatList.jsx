import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
const ChatList = ({ receipentID, chat }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userToekn = JSON.parse(localStorage.getItem("user"));
  console.log(receipentID);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `/auth/${receipentID}/user`,

        {
          headers: {
            Authorization: `Bearer ${userToekn.token}`,
          },
        }
      );
      setUser(response.data);
    };
    fetchUser();
  }, [receipentID]);
  return (
    <div
      className="d-flex conversation-List"
      onClick={() => {
        navigate("chat/" + chat._id + "&" + user?.photo + "&" + user?.username);
      }}
    >
      <div className="icon">
        <img
          src={`/` + user?.photo}
          alt="img"
          class="image-icon "
        />
      </div>
      <div className="mt-2">
        <h6>{user?.username}</h6>
        <p className="friends">{user?.occupation}</p>
      </div>
    </div>
  );
};

export default ChatList;

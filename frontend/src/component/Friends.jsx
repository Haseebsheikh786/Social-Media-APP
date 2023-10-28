import React, {   } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { selectAllFriends } from "../pages/User/userSlice";
import { useSelector } from "react-redux";

const Friends = ({ photo, username, friendId, occupation, addRemoveuser }) => {
  const Friends = useSelector(selectAllFriends);

  const isFriend = Friends.find((friend) => friend._id === friendId);

  return (
    <>
      {!isFriend && (
        <div className="d-flex my-2" key={friendId}>
          <div className="icon">
            <img
              src={`/` + photo}
              alt="img"
              class="image-icon "
            />
          </div>
          <div>
            <h6>{username}</h6>
            <p className="friends">
              {occupation}
              <strong>
                <HiOutlineUserAdd
                  className="addRemoveIcon"
                  onClick={() => addRemoveuser(friendId)}
                />
              </strong>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Friends;

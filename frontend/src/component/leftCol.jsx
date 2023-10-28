import {
  FetchAllFriendAsync,
  selectAllFriends,
  selectLoggedInUser,
} from "../pages/User/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HiOutlineUserRemove } from "react-icons/hi";

const LeftCol = ({ addRemoveuser, addRemFriend }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const users = useSelector(selectAllFriends);

  useEffect(() => {
      dispatch(FetchAllFriendAsync());
  }, [dispatch, addRemFriend, user]);

  return (
    <>
      <div className="d-flex">
        <div className="icon">
          <img
            src={`/` + user?.photo}
            alt="img"
            class="image-icon "
          />
        </div>
        <div>
          <h6 className="title text-warning">{user?.username}</h6>
          <p className="friends">
            Friends
            <strong className="frineds">{user?.friends.length}</strong>
          </p>
        </div>
      </div>
      <h4 className="text-center my-3 title">Friend List</h4>
      {users &&
        users.map((user, index) => {
          return (
            <div className="d-flex my-2" key={index}>
              <div className="icon">
                <img
                  src={`/` + user.photo}
                  alt="img"
                  class="image-icon "
                />
              </div>
              <div>
                <h6>{user.username}</h6>
                <p className="friends">
                  {user.occupation}
                  <strong>
                    <HiOutlineUserRemove
                      className="addRemoveIcon"
                      onClick={() => addRemoveuser(user._id)}
                    />
                  </strong>
                </p>
              </div>
            </div>
          );
        })}{" "}
    </>
  );
};

export default LeftCol;

import React from "react";
import Friends from "./Friends";
import {
  FetchAllUsersAsync,
  selectAllUsers,
  selectLoggedInUser,
} from "../pages/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const RightCol = ({ addRemoveuser, addRemFriend }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(FetchAllUsersAsync());
  }, [dispatch, addRemFriend, user]);

  return (
    <div>
      <h5 className=" mt-3 mb-4 title">People you may know </h5>
      {users &&
        users.map((user, index) => {
          return (
            <Friends
              photo={user.photo}
              username={user.username}
              friendId={user._id}
              occupation={user.occupation}
              addRemoveuser={addRemoveuser}
            />
          );
        })}
    </div>
  );
};

export default RightCol;

import React, { useEffect, useState } from "react";
import Post from "./Post";
import AllPosts from "./AllPosts";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsAsync, selectAllPosts } from "../pages/Post/postSlice";

const MainCol = ({ addRemoveuser, addRemFriend }) => {
  const [submitPost, setsubmitPost] = useState();
  const [likePost, setLikePost] = useState();
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch, submitPost, likePost, addRemFriend]);
  return (
    <>
      <Post setsubmitPost={setsubmitPost} />
      {posts
        .slice(0)
        .reverse()
        .map(
          ({
            _id,
            userId,
            name,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
          }) => {
            return (
              <div className="mainBar" key={_id}>
                <AllPosts
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={name}
                  Description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  setLikePost={setLikePost}
                  addRemoveuser={addRemoveuser}
                />
              </div>
            );
          }
        )}{" "}
    </>
  );
};

export default MainCol;

import React, { useEffect, useState } from "react";
import {
  HiOutlineUserAdd,
  HiOutlineUserRemove,
  HiUserAdd,
} from "react-icons/hi";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BiCommentMinus } from "react-icons/bi";
import { selectAllFriends, selectLoggedInUser } from "../pages/User/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const AllPosts = ({
  postId,
  postUserId,
  name,
  Description,
  location,
  picturePath,
  userPicturePath,
  likes,
  setLikePost,
  addRemoveuser,
}) => {
  const user = useSelector(selectLoggedInUser);
  const isLiked = Boolean(likes[user?._id]);
  const likeCount = Object.keys(likes).length;
  const Friends = useSelector(selectAllFriends);

  const isFriend = Friends.find((friend) => friend._id === postUserId);

  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [Postcomment, setPostComment] = useState("");

  const handleshowComment = async () => {
    setShowComment(!showComment);
  };

  const LikePost = async (id) => {
    const response = await fetch(`/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: user._id,
      }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    setLikePost(data);
  };
  const PostComment = async () => {
    const response = await fetch(`/comment/`, {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        description: Postcomment,
        postId: postId,
      }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    setPostComment(data);
    document.getElementById("textBox").value = "";
    setPostComment("");
  };

  useEffect(() => {
    const fetchAllComments = async () => {
      const res = await axios.get(`/comment/${postId}`);
      setComments(res.data);
      console.log(res.data);
    };
    fetchAllComments();
  }, [postId, Postcomment]);
  return (
    <>
      <div className="postContainer mx-4" key={postId}>
        <div className="d-flex">
          <div className="icon">
            <img
              src={`/` + userPicturePath}
              alt="img"
              class="image-icon "
            />
          </div>
          <div className="cursor-pointer">
            <div className="friendPost mt-1">
              <h6> {name}</h6>
              {!isFriend ? (
                <HiOutlineUserAdd
                  className="addRemoveicon"
                  onClick={() => addRemoveuser(postUserId)}
                />
              ) : (
                <HiOutlineUserRemove
                  className="addRemoveicon"
                  onClick={() => addRemoveuser(postUserId)}
                />
              )}
            </div>
            <p className="location">{location}</p>
          </div>
        </div>
        <span className="m-2 ">{Description} </span>
        <img
          src={`/` + picturePath}
          alt="img"
          className="postImage"
        />
        <div className="mt-2 mx-2 d-flex">
          {!isLiked ? (
            <div>
              <AiOutlineHeart
                className="LikeComment mx-1"
                onClick={() => LikePost(postId)}
              />
              <p className="number">{likeCount}</p>
            </div>
          ) : (
            <div>
              <AiTwotoneHeart
                className="LikeComment mx-1 text-danger"
                onClick={() => LikePost(postId)}
              />
              <p className="number">{likeCount}</p>
            </div>
          )}
          <div className="mx-3">
            <BiCommentMinus
              onClick={handleshowComment}
              className="LikeComment mx-1"
            />
            <span className="number ">{comments.length}</span>
          </div>
        </div>
        {showComment && (
          <div className="">
            <ol class="list-group">
              {comments.map((e) => {
                return (
                  <li
                    class="list-group-item d-flex justify-content-between align-items-start"
                    key={e._id}
                  >
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">{e.name}</div>
                      {e.description}
                    </div>
                    <span class="badge bg-primary rounded-pill">
                      <HiUserAdd />
                    </span>
                  </li>
                );
              })}
            </ol>
            <div class="input-group input-group-lg my-2">
              <input
                autoFocus
                id="textBox"
                type="text"
                class="form-control  "
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={(e) => setPostComment(e.target.value)}
              />
              <button className="btn btn-primary mx-1" onClick={PostComment}>
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllPosts;

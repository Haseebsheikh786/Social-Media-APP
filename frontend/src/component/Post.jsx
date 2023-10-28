import axios from "axios";
import React, { useState } from "react";
import { selectLoggedInUser } from "../pages/User/userSlice";
import { useSelector } from "react-redux";

const Post = ({ setsubmitPost }) => {
  const Token = JSON.parse(localStorage.getItem("user"));
  const user = useSelector(selectLoggedInUser);
  const [pic, setPic] = useState();
  const [description, setdescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("pic", pic);
    formdata.append("description", description);
    formdata.append("userId", user._id);
    try {
      const res = await axios.post("/post", formdata, {
        headers: {
          Authorization: `Bearer ${Token.token}`,
        },
      });
      setsubmitPost(res.data);
      document.getElementById("description").value = "";
      document.getElementById("pic").value = "";
    } catch (e) {
      alert("something wrong");
      console.log(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex m-4">
          <div className="icon">
            <img
              src={`/` + user?.photo}
              alt="img"
              class="image-icon "
            />
          </div>

          <div>
            <div class="input-group mt-1 inputbox">
              <input
                type="text"
                class="form-control mb-2  "
                placeholder="What's on your mind"
                aria-label="Username"
                onChange={(e) => setdescription(e.target.value)}
                id="description"
              />
            </div>{" "}
            <div className="d-flex">
              <div class="input-group mt-1  ">
                <input
                  type="file"
                  class="form-control mb-2"
                  aria-label="Username"
                  onChange={(e) => setPic(e.target.files[0])}
                  id="pic"
                />
              </div>{" "}
              <button className="m-2 btn btn-danger " type="submit">
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Post;

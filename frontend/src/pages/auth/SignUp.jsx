import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const SignUp = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [pic, setPic] = useState();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [location, setlocation] = useState("");
  const [occupation, setoccupation] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("pic", pic);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("username", name);
    formdata.append("location", location);
    formdata.append("occupation", occupation);
    try {
      await axios.post("/auth/signup", formdata);
      navigate("/");
      alert.success("User Created");
    } catch (e) {
      alert.error(e.response.data.error);
    }
  };
  return (
    <>
      <div className="loginContainer">
        <form onSubmit={handleSubmit}>
          <h3>Create your account</h3>
          <div className="d-flex">
            <div class="input-group">
              <input
                type="text"
                class="form-control mb-3 mx-2"
                placeholder="name"
                aria-label="Username"
                id="username"
                required
                minLength={5}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="input-group ">
              <input
                type="email"
                class="form-control mb-3 mx-2"
                placeholder="email"
                aria-label="Username"
                id="email"
                required
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex">
            <div class="input-group">
              <input
                type="text"
                class="form-control my-3 mx-2"
                placeholder="location"
                aria-label="Username"
                id="location"
                required
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>
            <div class="input-group ">
              <input
                type="text"
                class="form-control my-3 mx-2"
                placeholder="occupation"
                aria-label="Username"
                id="occupation"
                required
                onChange={(e) => setoccupation(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex">
            <div class="input-group">
              <input
                type="password"
                class="form-control my-3 mx-2"
                placeholder="password"
                aria-label="Username"
                id="password"
                required
                minLength={8}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div class="input-group ">
              <input
                type="file"
                class="form-control my-3 mx-2"
                aria-label="Username"
                id="photo"
                onChange={(e) => setPic(e.target.files[0])}
                required
              />
            </div>
          </div>

          <button type="submit" className="authBtn">
            Submit
          </button>
          <p className="text-center my-2">
            Already have an account
            <NavLink
              to="/login"
              className="text-danger p-1 text-decoration-none"
            >
              LogIn
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;

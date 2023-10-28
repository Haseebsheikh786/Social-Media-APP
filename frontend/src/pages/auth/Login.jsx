import React from "react";
import "./auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { useEffect } from "react";
import { useAlert } from "react-alert";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const alert = useAlert();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, isError, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login({ user: userData, alert }));
  };

  return (
    <div className="loginContainer">
      <form onSubmit={onSubmit}>
        <h3>Login to your account</h3>
        <div class="input-group my-3">
          <input
            type="email"
            class="form-control mb-3"
            placeholder="email"
            aria-label="Username"
            onChange={onChange}
            value={email}
            id="email"
            name="email"
            required
          />
        </div>
        <div class="input-group my-3">
          <input
            type="password"
            class="form-control"
            placeholder="password"
            aria-label="Username"
            value={password}
            onChange={onChange}
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" className="authBtn">
          Submit
        </button>
        <p className="text-center my-2">
          Don't have an account
          <NavLink
            to="/signup"
            className="text-danger p-1 text-decoration-none"
          >
            SignUp
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;

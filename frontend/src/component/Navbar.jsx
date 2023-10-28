import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { BsFillChatHeartFill } from "react-icons/bs";
import { PiUserSwitchBold } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, selectUser } from "../pages/auth/authSlice";
import {
  FetchAllFriendAsync,
  selectAllFriends,
  selectLoggedInUser,
} from "../pages/User/userSlice";
import { HiOutlineUserRemove } from "react-icons/hi";

const Navbar = ({ addRemoveuser, addRemFriend }) => {
  const navigate = useNavigate();
  const User = useSelector(selectUser);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const users = useSelector(selectAllFriends);

  useEffect(() => {
    dispatch(FetchAllFriendAsync());
  }, [dispatch, addRemFriend, user]);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <NavLink className="logo" to="/" onClick={handleLinkClick}>
            Social media
          </NavLink>
        </div>

        <div className={`nav-links ${isNavOpen ? "active" : ""}`}>
          {User ? (
            <>
              <NavLink to="/chat" onClick={handleLinkClick}>
                <BsFillChatHeartFill className="chat" />
              </NavLink>
              <NavLink
                className="FriendList"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleLinkClick}
              >
                <PiUserSwitchBold className="exit chat" />
              </NavLink>

              <li class="nav-item dropdown" id="dropdown">
                <a
                  class="nav-link dropdown-toggle drop"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.username}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink
                    onClick={handleLogout}
                    to
                    class="dropdown-item"
                    id="signOut"
                  >
                    SignOut
                  </NavLink>
                </ul>
              </li>
            </>
          ) : null}
        </div>
        <div className="burger" onClick={toggleNav}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
      <div
        class="modal fade  "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog bg-black">
          <div class="modal-content bg-secondary px-4">
            <div className="d-flex mt-3">
              <div className="icon">
                <img
                  src={`/` + user?.photo}
                  alt="img"
                  class="image-icon "
                />
              </div>
              <div className="mt-2">
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
                    <div className="mt-2">
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger text-white"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

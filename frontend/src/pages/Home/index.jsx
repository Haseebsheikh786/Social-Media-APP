import React from "react";
import "./index.css";
import LeftCol from "../../component/leftCol";
import RightCol from "../../component/rightCol";
import MainCol from "../../component/mainCol";

const Home = ({ addRemoveuser, addRemFriend }) => {
  return (
    <>
      <div className="Container">
        <div id="leftCol">
          <LeftCol addRemoveuser={addRemoveuser} addRemFriend={addRemFriend} />
        </div>
        <div id="mainCol">
          <MainCol addRemoveuser={addRemoveuser} addRemFriend={addRemFriend} />
        </div>
        <div id="rightCol">
          <RightCol addRemoveuser={addRemoveuser} addRemFriend={addRemFriend} />
        </div>
      </div>
    </>
  );
};

export default Home;

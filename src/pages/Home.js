import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("ROOM ID & username is required");
      return;
    }

    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="home__page">
      <form action="" className="home__form">
        <img src="./images/logo.png" alt="logo" className="home__img" />
        <p className="main__content">Paste invitation ROOM ID</p>
        <div className="home__input">
          <div className="input-field">
            <input
              type="text"
              className="input__box"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter ROOM ID"
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="input__box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              onKeyUp={handleInputEnter}
            />
            <button className="btn joinBtn" onClick={joinRoom}>Join</button>
          </div>

          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </form>

      <footer>
        <h4>
          Build by <a href="https://github.com/sparshp">Sparsh Prajapati</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;

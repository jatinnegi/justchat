import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Forms from "../Auth/Forms";
import UserDetails from "../Auth/UserDetails";
import Contact from "../../components/Contact";
import axios from "axios";
import PropTypes from "prop-types";
import UsersList from "./UsersList";

function Sidepanel({ setChatId, setOtherParticipant, createChat }) {
  const [expand, toggleExpand] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const [usersList, toggleUsersList] = useState(false);

  const { key, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (key) fetchChats();
  }, [key]);

  useEffect(() => {
    if (!isAuthenticated) setActiveChats([]);
  }, [isAuthenticated]);

  async function fetchChats() {
    try {
      const { data } = await axios.get("http://localhost:8000/chat", {
        headers: {
          Authorization: `Token ${key}`,
        },
      });
      setActiveChats([...data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div id="sidepanel">
        <div id="profile" className={expand ? "expanded" : ""}>
          <div className="wrap">
            <div className="wrap-panel">
              <div
                className={`profile-img ${isAuthenticated ? "online" : "busy"}`}
                style={{
                  backgroundImage: `url('${
                    user
                      ? user.profile_image
                      : "http://localhost:8000/static-images/profile-photos/default-profile-image.jpg"
                  }')`,
                }}
              ></div>
              <p>{user ? user.username : "AnonymousUser"}</p>
              <i
                className="fa fa-chevron-down expand-button"
                aria-hidden="true"
                onClick={() => toggleExpand((prevState) => !prevState)}
              ></i>
            </div>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle"></span>
                  <p>Online</p>
                </li>
                <li id="status-away">
                  <span className="status-circle"></span>
                  <p>Away</p>
                </li>
                <li id="status-busy">
                  <span className="status-circle"></span>
                  <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle"></span>
                  <p>Offline</p>
                </li>
              </ul>
            </div>
            <div id="expanded">
              {isAuthenticated && user ? (
                <UserDetails user={user} />
              ) : (
                <Forms />
              )}
            </div>
          </div>
        </div>
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input type="text" placeholder="Search contacts..." />
        </div>
        <div id="contacts" className="expanded">
          <ul>
            {activeChats.length
              ? activeChats.map((chat) => {
                  return (
                    <Contact
                      key={chat.id}
                      chatId={chat.id}
                      setChatId={setChatId}
                      setOtherParticipant={setOtherParticipant}
                      participants_list={chat.participants_list}
                      status="online"
                      preview={chat.preview}
                    />
                  );
                })
              : null}
          </ul>
        </div>
        <div id="bottom-bar">
          <button
            id="addcontact"
            onClick={() => toggleUsersList((prevState) => !prevState)}
          >
            <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>
            <span>Add contact</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>
            <span>Settings</span>
          </button>
        </div>
      </div>
      {isAuthenticated && usersList ? (
        <UsersList createChat={createChat} toggleUsersList={toggleUsersList} />
      ) : null}
    </>
  );
}

Sidepanel.propTypes = {
  setChatId: PropTypes.func.isRequired,
};

export default Sidepanel;

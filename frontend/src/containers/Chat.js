import React, { useRef, useState, useEffect } from "react";
import WebSocketInstance from "../websocket";
import moment from "moment";
import { useSelector } from "react-redux";

export default function Chat({ chatId, otherParticipant }) {
  const chatMessagesEndRef = useRef(null);
  const { key, isAuthenticated, user } = useSelector((state) => state.auth);

  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState("");

  function initialiseChat(chat_id) {
    WebSocketInstance.connect(chat_id);
    waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(setMessages, setChatMessages);
      WebSocketInstance.fetchMessages();
    });
  }

  useEffect(() => {
    setChatMessages([]);
    initialiseChat(chatId);
  }, [chatId]);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function waitForSocketConnection(callback) {
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("connection is secure");
        if (callback !== null) callback();
        return;
      } else {
        console.log("waiting for connection...");
        waitForSocketConnection();
      }
    }, 100);
  }

  function setMessages(messages) {
    setChatMessages(messages.reverse());
  }

  function sendMessageHandler(e) {
    e.preventDefault();
    const messageObject = {
      from: key,
      content: newChatMessage,
    };
    WebSocketInstance.newChatMessage(messageObject);
    setNewChatMessage("");
  }

  function renderTimestamp(timestamp) {
    return moment(new Date(timestamp)).fromNow();
  }

  function renderMessages(messages) {
    const currentUser = user ? user.username : "";
    const currentProfileImage = user ? user.profile_image : "";
    const otherProfileImage = otherParticipant.profile_image;

    return messages.map((message) => (
      <li
        key={message.id}
        className={message.author === currentUser ? "sent" : "replies"}
      >
        <div
          className="d-flex"
          style={{
            float: message.author === currentUser ? "right" : "sent",
          }}
        >
          {currentUser !== message.author && (
            <div
              className="mr-1"
              style={{
                height: "35px",
                width: "35px",
                backgroundImage: `url(${otherProfileImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "50%",
              }}
            ></div>
          )}
          <p style={{ fontSize: "1.1em" }}>
            {message.content}
            <br />
            <span
              className="mt-1"
              style={{
                fontSize: "0.75em",
                color: "inherit",
                float: "right",
              }}
            >
              {renderTimestamp(message.timestamp)}
            </span>
          </p>
          {currentUser === message.author && (
            <div
              className="ml-1"
              style={{
                height: "35px",
                width: "35px",
                backgroundImage: `url(${currentProfileImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </div>
      </li>
    ));
  }

  return (
    <div className="content">
      <div className="d-flex align-items-center" style={{ height: "50px" }}>
        <div
          className="ml-1"
          style={{
            height: "40px",
            width: "40px",
            backgroundImage: `url(${otherParticipant.profile_image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: "50%",
          }}
        ></div>
        <p className="ml-2 font-weight-bold">{otherParticipant.username}</p>
      </div>
      <div className="messages">
        <ul id="chat-log">
          {chatMessages.length > 0 ? renderMessages(chatMessages) : null}
          <div ref={chatMessagesEndRef} />
        </ul>
      </div>
      <div className="message-input">
        <form onSubmit={sendMessageHandler}>
          <div className="wrap">
            <input
              id="chat-message-input"
              type="text"
              placeholder="Write your message..."
              autoComplete="off"
              disabled={!isAuthenticated}
              autoFocus
              value={newChatMessage}
              onChange={(e) => setNewChatMessage(e.target.value)}
            />
            <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
            <button
              id="chat-message-submit"
              className="submit"
              type="submit"
              disabled
              disabled={!isAuthenticated}
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

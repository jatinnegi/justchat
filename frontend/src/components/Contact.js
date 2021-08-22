import React from "react";
import { useSelector } from "react-redux";

export default function Contact({
  chatId,
  setChatId,
  setOtherParticipant,
  participants_list,
  status,
  preview,
}) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const otherParticipant =
    isAuthenticated && user
      ? getOtherParticipant()
      : "http://localhost:8000/static-images/profile-photos/default-profile-image.jpg";

  function getOtherParticipant() {
    const otherParticipant = participants_list.filter(
      (participant) => participant.username !== user.username
    )[0];

    return otherParticipant;
  }

  function getPreview(preview) {
    const preview_text =
      user.username === preview.username
        ? `You: ${preview.content}`
        : preview.content;
    return preview_text;
  }

  return (
    <li
      className="contact"
      onClick={() => {
        setOtherParticipant(getOtherParticipant());
        setChatId(chatId);
      }}
    >
      <div className="wrap d-flex justify-items-center align-items-center">
        <div className="other-participant-details">
          <span className={`contact-status ${status}`}></span>
          <div
            style={{
              display: "inline-block",
              height: "45px",
              width: "45px",
              backgroundImage: `url(${otherParticipant.profile_image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: "50%",
            }}
          ></div>
        </div>
        <div className="meta ml-2">
          <p className="name">{otherParticipant.username}</p>
          <p className="preview">{user ? getPreview(preview) : ""}</p>
        </div>
      </div>
    </li>
  );
}

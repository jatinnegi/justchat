import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import Sidepanel from "./Sidepanel/Sidepanel";
import * as api from "../api";
import "../../assets/style.css";

export default function Index() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [chatId, setChatId] = useState(null);
  const [otherParticipant, setOtherParticipant] = useState({
    username: "",
    profile_image: "",
  });

  useEffect(() => {
    setChatId(null);
  }, [isAuthenticated]);

  async function createChat(contactId) {
    try {
      const { data } = await api.createChat(contactId);
      const { id, participants_list } = data;
      const otherParticipant = participants_list.filter(
        (participant) => participant.username !== user.username
      )[0];

      setChatId(id);
      setOtherParticipant(otherParticipant);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="frame">
      <Sidepanel
        setChatId={setChatId}
        setOtherParticipant={setOtherParticipant}
        createChat={createChat}
      />
      {chatId && <Chat chatId={chatId} otherParticipant={otherParticipant} />}
    </div>
  );
}

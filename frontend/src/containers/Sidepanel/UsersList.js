import React, { useEffect, useState } from "react";
import * as api from "../../api/";

const UsersList = ({ createChat, toggleUsersList }) => {
  useEffect(() => {
    fetchContacts();
  }, []);

  const [contactList, setContactList] = useState([]);

  async function fetchContacts() {
    try {
      const { data } = await api.getContacts();
      setContactList([...data]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleModalClick(e) {
    e.stopPropagation();
    toggleUsersList(false);
  }

  return (
    <div className="users-list-popup" onClick={handleModalClick}>
      <div className="users-list">
        <h3>Create Contact</h3>
        <div className="contacts">
          {contactList.map((contact) => (
            <div
              key={contact.id}
              className="contact"
              onClick={() => {
                createChat(contact.id);
                toggleUsersList(false);
              }}
            >
              <img
                src={contact.profile_image}
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <p className="ml-2 font-weight-bold">{contact.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;

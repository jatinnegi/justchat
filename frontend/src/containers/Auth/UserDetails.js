import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";

const UserDetails = ({ user }) => {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(logout());
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input type="text" disabled value={user.username} />
      <input type="text" disabled value={user.email} />
      {fullName.trim().length > 0 && (
        <input type="text" disabled value={fullName} />
      )}
      <Link
        to="/edit"
        style={{
          color: "#fff",
          textDecoration: "none",
        }}
      >
        <button className="btn btn-primary" type="button">
          Edit
        </button>
      </Link>
      <button className="btn btn-danger" type="submit">
        Logout
      </button>
    </form>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserDetails;

import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/userDetail.css";
import { updateUser } from "../../actions/auth";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const uploadProfileImageRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
  });
  const [profile_image, setProfileImage] = useState({
    path: "",
    file: null,
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      });
      setProfileImage({ ...profile_image, path: user.profile_image });
    }
  }, [user]);

  const { email, username, first_name, last_name } = formData;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateUser(
        { ...formData, profile_image: profile_image.file },
        setSuccessMessage
      )
    );
  }

  return (
    <div className="profile">
      <div className="profile-image">
        <img
          src={profile_image.path}
          alt="profile-image"
          onClick={() => {
            if (uploadProfileImageRef.current)
              uploadProfileImageRef.current.click();
          }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={uploadProfileImageRef}
          onChange={(e) => {
            setProfileImage({
              path: URL.createObjectURL(e.target.files[0]),
              file: e.target.files[0],
            });
          }}
        />
      </div>
      <div className="profile-details">
        <h2>MY PROFILE</h2>
        <form onSubmit={handleSubmit}>
          {successMessage.length ? (
            <div className="row" style={{ maxWidth: "450px" }}>
              <div className="col sm-12">
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {successMessage}
                  <button
                    type="button"
                    className="close"
                    style={{
                      outline: "none",
                    }}
                    onClick={() => setSuccessMessage("")}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="row mb-3" style={{ maxWidth: "450px" }}>
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Email
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
          <div className="row mb-3" style={{ maxWidth: "450px" }}>
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Username
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
          <div className="row mb-3" style={{ maxWidth: "450px" }}>
            <label htmlFor="first_name" className="col-sm-3 col-form-label">
              First Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={first_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3" style={{ maxWidth: "450px" }}>
            <label htmlFor="last_name" className="col-sm-3 col-form-label">
              Last Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3" style={{ maxWidth: "450px" }}>
            <div className="col-sm-9">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  outline: "none",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

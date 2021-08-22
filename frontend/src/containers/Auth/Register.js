import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";

export default function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    username: "",
    password1: "",
    non_field_errors: "",
  });

  const { email, username, password1, password2, first_name, last_name } =
    formData;

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(formData, setFormErrors));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={formErrors.email ? "border border-danger" : ""}
            style={{ marginBottom: "0px" }}
            value={email}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="text-danger" style={{ fontSize: "0.8rem" }}>
            {formErrors.email ? formErrors.email : ""}
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className={formErrors.username ? "border border-danger" : ""}
            style={{ marginBottom: "0px" }}
            value={username}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="text-danger" style={{ fontSize: "0.8rem" }}>
            {formErrors.username ? formErrors.username : ""}
          </span>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password1"
            className={formErrors.password1 ? "border border-danger" : ""}
            style={{ marginBottom: "0px" }}
            value={password1}
            onChange={handleChange}
          />
          <span className="text-danger" style={{ fontSize: "0.8rem" }}>
            {formErrors.password1 ? formErrors.password1 : ""}
          </span>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            className={
              formErrors.non_field_errors ? "border border-danger" : ""
            }
            style={{ marginBottom: "0px" }}
            value={password2}
            onChange={handleChange}
          />
          <span className="text-danger" style={{ fontSize: "0.8rem" }}>
            {formErrors.non_field_errors ? formErrors.non_field_errors : ""}
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name (Optional)"
            name="first_name"
            style={{ marginBottom: "0px" }}
            value={first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name (Optional)"
            name="last_name"
            style={{ marginBottom: "0px" }}
            value={last_name}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

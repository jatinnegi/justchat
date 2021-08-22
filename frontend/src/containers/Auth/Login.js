import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const { username, password } = formData;

  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData, setFormError));
  }

  return (
    <div className="form-container">
      <div className="text-danger mb-3">{formError}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          autoComplete="off"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

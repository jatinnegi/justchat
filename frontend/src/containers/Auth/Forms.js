import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Forms() {
  const [form, toggleForm] = useState(true);

  function handleToggleForm(e) {
    toggleForm((prevState) => !prevState);
    document.getElementById("expanded").scrollTo(0, 0);
  }

  return (
    <>
      {form ? <Login /> : <Register />}
      <button className="btn btn-warning" onClick={handleToggleForm}>
        Switch
      </button>
    </>
  );
}

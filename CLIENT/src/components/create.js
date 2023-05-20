import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    Song: "",
    Artist: "",
    Video URL: "",
    Genre:"",
  });

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5001/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ Song: "", Artist: "", Video URL: "", Genre:"" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Song">Song</label>
          <input
            type="text"
            className="form-control"
            id="Song"
            value={form.name}
            onChange={(e) => updateForm({ Song: e.target.value })}

           />
        </div>
        <div className="form-group">
          <label htmlFor="Artist">Artist</label>
          <input
            type="text"
            className="form-control"
            id="Artist"
            value={form.Artist}
            onChange={(e) => updateForm({ Artist: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Video URL">Video URL</label>
          <input
            type="text"
            className="form-control"
            id="Video URL"
            value={form.Video URL}
            onChange={(e) => updateForm({ Video URL: e.target.value })}
         
          />
        </div>
        <div className="form-group">
          <label htmlFor="Genre">Genre</label>
          <input
            type="text"
            className="form-control"
            id="Genre"
            value={form.Genre}
            onChange={(e) => updateForm({ Genre: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
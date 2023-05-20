import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    Song: "",
    Artist: "",
    Video URL: "",
    Genre:"",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5001/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedUser = {
      Song: form.Song,
      Artist: form.Artist,
      Video URL: form.Video URL,
      Genre: form.Genre,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5001/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Song">Song: </label>
          <input
            type="text"
            className="form-control"
            id="Song"
            value={form.Song}
            onChange={(e) => updateForm({ Song: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Artist">Artist: </label>
          <input
            type="text"
            className="form-control"
            id="Artist"
            value={form.Artist}
            onChange={(e) => updateForm({ Artist: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Video URL">Video URL: </label>
          <input
            type="text"
            className="form-control"
            id="Video URL"
            value={form.Video URL}
            onChange={(e) => updateForm({ Video URL: e.target.value })}
          />
        </div>        
        <div className="form-group">
          <label htmlFor="Genre">Genre: </label>
          <input
            type="text"
            className="form-control"
            id="Genre"
            value={form.Genre}
            onChange={(e) => updateForm({ Genre: e.target.value })}
          />
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
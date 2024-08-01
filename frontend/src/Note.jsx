import { useState, useEffect } from "react";
import axios from "axios";
import "./colors.css";

function Note() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/api/notes")
      .then((response) => setNotes(response.data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  const addNote = async () => {
    axios
      .post("http://localhost/api/notes", { title, content })
      .then((response) => {
        setNotes([...notes, response.data]);
        setTitle("");
        setContent("");
      })
      .catch((err) => console.error("Error adding the note:", err));
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1
        style={{
          backgroundColor: "var(--header-bg)",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        Notes
      </h1>
      <div
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={{
              backgroundColor: "var(--input-bg)",
              border: `1px solid var(--input-border)`,
              color: "var(--text-color)",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "10px",
              width: "50%",
              height: "10px",
            }}
          />
        </div>
        <div>
          <textarea
            style={{
              width: "100%",
              height: "100px",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          ></textarea>
        </div>

        <div>
          <button
            style={{
              padding: "10px",
              marginTop: "10px",
            }}
            onClick={addNote}
          >
            Add Note
          </button>
        </div>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Note;

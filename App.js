import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

const DiaryHome = ({ entries, setEntries }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const addEntry = () => {
    if (title && content && date) {
      const newEntry = {
        id: Date.now().toString(),
        title,
        content,
        date,
        image: "",
      };
      setEntries([newEntry, ...entries]);
      setTitle("");
      setContent("");
      setDate("");
    }
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px", minWidth:"100vh",backgroundPosition:"20px", background: "linear-gradient(to right, #dabbe0, #bed1e3)", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginTop:"-10px", marginBottom: "40px", color: "#333" }}>📔 My Personal Diary</h1>

      <input
        placeholder="🔍 Search diary titles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "200px", marginBottom: "10px", marginRight:"50px", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" }}
      />

      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px",marginLeft:"100px", marginRight:"100px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "30px" }}>
        <input
          placeholder="📝 Diary Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "71.5rem", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "71.5rem", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <textarea
          placeholder="Write your diary content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "71.5rem", padding: "10px", height: "100px", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }}
        ></textarea>
        <button
          onClick={addEntry}
          style={{ marginTop: "10px", padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          ➕ Add Entry
        </button>
      </div>

      {filteredEntries.map((entry) => (
        <div key={entry.id} style={{ background: "#fefefe", borderRadius: "10px", marginLeft:"100px", marginRight:"100px", padding: "15px", marginBottom: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h3 style={{ margin: 0, fontSize: "1.3rem" }}>{entry.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "#888" }}>📅 {entry.date}</p>
          <p style={{ color: "#666", marginTop: "10px" }}>{entry.content.slice(0, 120)}...</p>
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => navigate(`/entry/${entry.id}`)} style={{ padding: "8px 12px", background: "#007BFF", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>View / Edit</button>
            <button onClick={() => deleteEntry(entry.id)} style={{ padding: "8px 12px", background: "#DC3545", color: "white", border: "none", borderRadius: "6px", marginLeft: "10px", cursor: "pointer" }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const EntryPage = ({ entries, setEntries }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const entry = entries.find((e) => e.id === id);
  const [title, setTitle] = useState(entry?.title || "");
  const [content, setContent] = useState(entry?.content || "");
  const [image, setImage] = useState(entry?.image || "");

  const updateEntry = () => {
    const updatedEntries = entries.map((e) =>
      e.id === id ? { ...e, title, content, image } : e
    );
    setEntries(updatedEntries);
    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "30px", background: "linear-gradient(to right, #dabbe0, #bed1e3)", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "20px" }}>✏️ Edit Diary Entry</h2>
      <div style={{ background: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", maxWidth: "700px", margin: "0 auto" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "42.5rem", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={{ width: "42.5rem", padding: "10px", height: "150px", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: "10px" }} />
        {image && <img src={image} alt="preview" style={{ maxWidth: "100%", marginTop: "15px", borderRadius: "8px" }} />}
        <button
          onClick={updateEntry}
          style={{ marginTop: "20px", padding: "10px 20px", background: "#28A745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          💾 Save Entry
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [entries, setEntries] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiaryHome entries={entries} setEntries={setEntries} />} />
        <Route path="/entry/:id" element={<EntryPage entries={entries} setEntries={setEntries} />} />
      </Routes>
    </Router>
  );
};

export default App;

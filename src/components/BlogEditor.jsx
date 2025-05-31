import React, { useState, useEffect, useRef } from "react";
import "./BlogEditor.css";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { saveDraft, publishBlog } from "../api/blogApi";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishedBlog, setPublishedBlog] = useState(null); // For download

  const autoSaveTimer = useRef(null);

  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem("blogDraft"));
    if (savedDraft) {
      setTitle(savedDraft.title || "");
      setContent(savedDraft.content || "");
      setTags(savedDraft.tags || "");
    }
  }, []);

  const handleSaveDraft = async () => {
    setSaving(true);
    setMessage("");
    try {
      const draft = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: "draft",
      };
      await saveDraft(draft); // Make sure your backend saves this
      localStorage.removeItem("blogDraft");
      setMessage("✅ Draft saved to database!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error saving draft to database.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    setMessage("");
    try {
      const blog = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: "published",
      };
      await publishBlog(blog);
      localStorage.removeItem("blogDraft");
      setPublishedBlog(blog); // Save for download
      setMessage("✅ Blog published successfully!");
      setTitle("");
      setContent("");
      setTags("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error publishing blog.");
    } finally {
      setPublishing(false);
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }
    autoSaveTimer.current = setTimeout(() => {
      const draft = {
        title,
        content,
        tags,
        [e.target.name]: e.target.value,
      };
      localStorage.setItem("blogDraft", JSON.stringify(draft));
    }, 5000);
  };

  const handleDownload = () => {
    const blogData =
      publishedBlog ||
      JSON.parse(localStorage.getItem("blogDraft")) || {
        title,
        content,
        tags,
      };
    const blob = new Blob(
      [
        `Title: ${blogData.title}\n\nTags: ${blogData.tags}\n\nContent:\n${blogData.content}`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${blogData.title || "blog"}.txt`;
    link.click();
  };

  return (
    <>
      <header className="blog-header">
        <div className="logo">📝 Blog Editor</div>
        <nav className="nav-menu">
          <Link to="/product">Product</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/enterprise">Enterprise</Link>
        </nav>
        <div className="avatar">
            <button className="download-btn" onClick={handleDownload}>
                ⬇️ Download
            </button>
            <img src={avatar} alt="Avatar" />
        </div>
      </header>

      <div className="editor-container">
        <h1 className="editor-heading">Create a New Blog Post</h1>
        {message && <p className="message">{message}</p>}

        <input
          type="text"
          name="title"
          className="editor-title"
          placeholder="Enter blog title..."
          value={title}
          onChange={handleChange(setTitle)}
        />

        <textarea
          name="content"
          className="editor-content"
          placeholder="Start writing your blog content..."
          value={content}
          onChange={handleChange(setContent)}
          rows={10}
        />

        <input
          type="text"
          name="tags"
          className="editor-tags"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={handleChange(setTags)}
        />

        <button className="editor-submit" onClick={handleSaveDraft} disabled={saving}>
          {saving ? "Saving..." : "Save Draft"}
        </button>

        <button
          className="editor-publish"
          onClick={handlePublish}
          disabled={publishing}
          style={{ marginLeft: "10px" }}
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </>
  );
}







/*
import React, { useState, useEffect, useRef } from "react";
import "./BlogEditor.css";
import avatar from "../assets/avatar.png"; // Make sure avatar image is in /src/assets
import { Link } from "react-router-dom";
import { saveDraft, publishBlog } from "../api/blogApi"; // Adjust path as necessary

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Use ref to hold the timer ID for debounce
  const autoSaveTimer = useRef(null);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem("blogDraft"));
    if (savedDraft) {
      setTitle(savedDraft.title || "");
      setContent(savedDraft.content || "");
      setTags(savedDraft.tags || "");
    }
  }, []);

  // Manual save draft - now calls backend API
  const handleSaveDraft = async () => {
    setSaving(true);
    setMessage("");
    try {
      const draft = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: "draft",
      };
      await saveDraft(draft);
      setMessage("Draft saved to server!");
      localStorage.removeItem("blogDraft"); // Clear local draft on successful save
    } catch (error) {
      setMessage("Error saving draft to server.");
    } finally {
      setSaving(false);
    }
  };

  // Publish blog - calls backend API
  const handlePublish = async () => {
    setPublishing(true);
    setMessage("");
    try {
      const blog = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
      };
      await publishBlog(blog);
      setMessage("Blog published successfully!");
      localStorage.removeItem("blogDraft"); // Clear local draft on publish
      // Reset fields
      setTitle("");
      setContent("");
      setTags("");
    } catch (error) {
      setMessage("Error publishing blog.");
    } finally {
      setPublishing(false);
    }
  };

  // Auto-save draft with debounce (5 seconds after last change)
  const handleChange = (setter) => (e) => {
    setter(e.target.value);

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }
    autoSaveTimer.current = setTimeout(() => {
      const draft = {
        title,
        content,
        tags,
        [e.target.name]: e.target.value,
      };
      localStorage.setItem("blogDraft", JSON.stringify(draft));
      // console.log("Auto-saved draft locally");
    }, 5000);
  };

  return (
    <>
      <header className="blog-header">
        <div className="logo">📝 Blog Editor</div>
        <nav className="nav-menu">
          <Link to="/product">Product</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/enterprise">Enterprise</Link>
        </nav>
        <div className="avatar">
          <img src={avatar} alt="Avatar" />
        </div>
      </header>

      <div className="editor-container">
        <h1 className="editor-heading">Create a New Blog Post</h1>

        {message && <p className="message">{message}</p>}

        <input
          type="text"
          name="title"
          className="editor-title"
          placeholder="Enter blog title..."
          value={title}
          onChange={handleChange(setTitle)}
        />

        <textarea
          name="content"
          className="editor-content"
          placeholder="Start writing your blog content..."
          value={content}
          onChange={handleChange(setContent)}
          rows={10}
        />

        <input
          type="text"
          name="tags"
          className="editor-tags"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={handleChange(setTags)}
        />

        <button
          className="editor-submit"
          onClick={handleSaveDraft}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>

        <button
          className="editor-publish"
          onClick={handlePublish}
          disabled={publishing}
          style={{ marginLeft: "10px" }}
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </>
  );
}


*/
import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/blogs",
  timeout: 5000,
});

// Save blog as draft
export const saveDraft = async (blog) => {
  const res = await fetch("/api/blogs/save-draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  if (!res.ok) throw new Error("Failed to save draft");
  return await res.json();
};

// Publish a blog
export const publishBlog = async (blog) => {
  try {
    const res = await API.post("/publish", blog);
    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// Get blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// Error handler
const errorHandler = (error) => {
  return error.response?.data || { message: error.message || "Unknown Error" };
};

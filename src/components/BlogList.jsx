import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../api/blogApi';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllBlogs();
      setBlogs(res.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Published Blogs</h2>
      {blogs.filter(b => b.status === 'published').map(blog => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}

      <h2>Drafts</h2>
      {blogs.filter(b => b.status === 'draft').map(blog => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
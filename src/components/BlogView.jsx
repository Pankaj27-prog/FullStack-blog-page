// client/src/components/BlogView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../api/blogApi';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogById(id).then(res => setBlog(res.data));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <small>Tags: {blog.tags}</small>
    </div>
  );
};

export default BlogView;

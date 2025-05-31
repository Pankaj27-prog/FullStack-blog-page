const Blog = require('../models/Blog');

// Save or update a blog as draft
exports.saveDraft = async (req, res) => {
  try {
    console.log("📥 Request body:", req.body);

    const { _id, ...blogData } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      _id,
      { ...blogData, status: 'draft', updated_at: new Date() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log("✅ Draft saved:", blog);
    res.json({ message: 'Draft saved.', blog });

  } catch (err) {
    console.error("❌ Error saving draft to database:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Save or update a blog as published
exports.publishBlog = async (req, res) => {
  try {
    const { _id, ...blogData } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      {
        ...blogData,
        status: 'published',
        updated_at: new Date(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: 'Blog published.', blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish blog', error: err.message });
  }
};

// Get all blogs, most recently updated first
exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updated_at: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: err.message });
  }
};

// Get blog by ID
exports.getById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blog', error: err.message });
  }
};

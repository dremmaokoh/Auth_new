import { Post } from '../models/post.model.js';

//create a post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;
    //basic validation
    if (!name || !description || !age) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    //save post to DB
    const post = await Post.create({
      name,
      description,
      age,
    });
    res.status(201).json({
      message: 'Post created successfully',
      post: {
        id: post._id,
        name: post.name,
        description: post.description,
        age: post.age,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server error', error: error.message });
  }
};

//Read all posts
const getAllPosts = async (req, res) => {
  try {
    const getAllPosts = await Post.find();
    res.status(200).json({
      message: 'Posts retrieved successfully',
      posts: getAllPosts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server error', error: error.message });
  }
};

//Update Post
const updatePost = async (req, res) => {
  try {
    // basic validation and update logic here
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }
      const post = await Post.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      message: 'Post updated successfully', post
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server error', error });
  }
};

// Delete Post
const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Post not found', error: error.message });
        }
        return res.status(200).json({ message: 'Post deleted successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error });
    }
    
}
export { createPost, getAllPosts, updatePost, deletePost };

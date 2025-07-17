const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const author = req.user.userId;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = new Post({ author, content, image: image || '' });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get feed', error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to like post', error: error.message });
  }
};

module.exports = { createPost, getFeed, likePost };

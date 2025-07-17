import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  IconButton, 
  TextField, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { likePost, addComment } from '../services/postService';

function PostItem({ post, onPostUpdate }) {
  const [liked, setLiked] = useState(post.likedByUser || false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(post._id);
      setLiked(updatedPost.likedByUser);
      setLikesCount(updatedPost.likes);
      onPostUpdate((prevPosts) => 
        prevPosts.map((p) => (p._id === post._id ? updatedPost : p))
      );
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const updatedPost = await addComment(post._id, commentText);
      setComments(updatedPost.comments);
      setCommentText('');
      onPostUpdate((prevPosts) => 
        prevPosts.map((p) => (p._id === post._id ? updatedPost : p))
      );
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Card 
      sx={{ 
        backgroundColor: '#fff', 
        border: '1px solid #e1e8ed', 
        borderRadius: 2, 
        boxShadow: 'none', 
        marginBottom: 2 
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Box sx={{ marginRight: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#45668e' }}>
              {post.author || 'Unknown User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ marginBottom: 2, color: '#000' }}>
          {post.text}
        </Typography>

        {post.image && (
          <CardMedia
            component="img"
            height="auto"
            image={post.image}
            alt="Post Image"
            sx={{ borderRadius: 1, maxHeight: 400, objectFit: 'contain', marginBottom: 2 }}
          />
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <IconButton 
            onClick={handleLike} 
            color={liked ? 'primary' : 'default'} 
            sx={{ marginRight: 1 }}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2" sx={{ marginRight: 2 }}>
            {likesCount}
          </Typography>

          <IconButton onClick={toggleComments} sx={{ marginRight: 1 }}>
            <CommentIcon />
          </IconButton>
          <Typography variant="body2">
            {comments.length}
          </Typography>
        </Box>
      </CardContent>

      {showComments && (
        <Box sx={{ padding: 2, backgroundColor: '#f5f7fa', borderTop: '1px solid #e1e8ed' }}>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              size="small"
              sx={{ marginBottom: 1, backgroundColor: '#fff' }}
            />
            <Button type="submit" variant="contained" size="small" sx={{ backgroundColor: '#45668e' }}>
              Send
            </Button>
          </form>

          <Divider sx={{ marginY: 1 }} />

          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListItem key={index} disablePadding sx={{ paddingY: 1 }}>
                  <ListItemText 
                    primary={<Typography sx={{ fontWeight: 'bold', color: '#45668e' }}>{comment.author}</Typography>} 
                    secondary={comment.text} 
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ padding: 1, textAlign: 'center' }}>
                No comments yet.
              </Typography>
            )}
          </List>
        </Box>
      )}
    </Card>
  );
}

export default PostItem;

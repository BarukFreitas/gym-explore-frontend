import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { PostResponse } from '@/app/types/post';

interface PostCardProps {
  post: PostResponse;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: '8px' }}>
      <Typography variant="subtitle2" color="text.secondary">
        @{post.username} - {new Date(post.timestamp).toLocaleString('pt-BR')} 
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}> 
        {post.content}
      </Typography>
      {post.imageUrl && ( 
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}> 
          <img
            src={post.imageUrl}
            alt={`Imagem da postagem de ${post.username}`} 
            style={{
              maxWidth: '100%',   
              maxHeight: '400px',   
              objectFit: 'contain', 
              borderRadius: '8px',  
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default PostCard;

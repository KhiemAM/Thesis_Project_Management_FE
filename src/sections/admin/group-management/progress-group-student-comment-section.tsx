import React, { useState } from 'react'

import {
  Box,
  Paper,
  Button,
  Avatar,
  TextField,
  Typography,
  IconButton
} from '@mui/material'

import { Iconify } from 'src/components/iconify'

import { useTodo } from './todo-context'

import type { Comment } from './types'

interface CommentSectionProps {
  todoId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ todoId, comments }) => {
  const { addComment, deleteComment } = useTodo()
  const [commentText, setCommentText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      addComment(todoId, commentText)
      setCommentText('')
    }
  }

  const handleDelete = (commentId: string) => {
    deleteComment(todoId, commentId)
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Generate a color based on a string (for comment avatars)
  const stringToColor = (string: string) => {
    let hash = 0
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + (hash * Math.pow(2, 5) - hash)
    }
    let color = '#'
    for (let i = 0; i < 3; i++) {
      const value = Math.floor(hash / Math.pow(256, i)) % 256
      color += ('00' + value.toString(16)).slice(-2)
    }
    return color
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Comments ({comments.length})
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex' }}>
        <TextField
          variant="outlined"
          placeholder="Add a comment..."
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          size="small"
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!commentText.trim()}
          endIcon={<Iconify icon='mingcute:add-line' />}
        >
          Add
        </Button>
      </Box>

      {comments.length > 0 ? (
        <Box sx={{ maxHeight: '300px', overflow: 'auto', pr: 1 }}>
          {comments.map((comment) => (
            <Paper
              key={comment.id}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: '#f9fafb',
                borderRadius: 2,
                position: 'relative'
              }}
            >
              <Box sx={{ display: 'flex', mb: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1.5,
                    bgcolor: stringToColor(comment.id),
                    fontSize: '0.875rem'
                  }}
                >
                  {comment.id.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      User
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(comment.createdAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 0.5 }} whiteSpace="pre-wrap">
                    {comment.content}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(comment.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  opacity: 0.6,
                  '&:hover': { opacity: 1 }
                }}
              >
                <Iconify icon='solar:trash-bin-trash-bold' />
              </IconButton>
            </Paper>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No comments yet. Be the first to add one!
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default CommentSection
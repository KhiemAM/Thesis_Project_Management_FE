import { useDropzone } from 'react-dropzone'
import React, { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTheme, InputAdornment } from '@mui/material'

import { _myAccount } from 'src/_mock'

import { Iconify } from 'src/components/iconify'

import { useTodo } from './todo-context'

import type { Result, Comment } from './types'

interface ResultSectionProps {
  todoId: string;
  results: Result[];
  comments: Comment[];
}

const MessageSection: React.FC<ResultSectionProps> = ({ todoId, results, comments }) => {
  const theme = useTheme()
  const { addResult, deleteResult, addComment, deleteComment } = useTodo()
  const [input, setInput] = useState('')
  const [isImageMode, setIsImageMode] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const objectUrls = acceptedFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls((prev) => [...prev, ...objectUrls])
    setIsImageMode(true)
  }, [])

  const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    noClick: true,
    noKeyboard: true
  })

  const handleSubmitResultMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      if (isImageMode) {
        addResult(todoId, 'image', input)
      } else {
        addComment(todoId, input)
      }
      setInput('')
      setIsImageMode(false)
      setPreviewUrls([])
    }
  }

  const handleDelete = (item: Result | Comment) => {
    if ('type' in item) {
      deleteResult(todoId, item.id)
    } else {
      deleteComment(todoId, item.id)
    }
  }

  const formatDate = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getInitials = (id: string) => id.slice(0, 2).toUpperCase()

  const stringToColor = (string: string) => {
    let hash = 0
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash * 32) - hash)
    }
    let color = '#'
    for (let i = 0; i < 3; i++) {
      const value = Math.floor(hash / Math.pow(256, i)) % 256
      color += ('00' + value.toString(16)).substr(-2)
    }
    return color
  }

  const allItems = [...results, ...comments].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <Box sx={{ mt: 3 }}>
      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmitResultMessage}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 3
        }}
      >
        <Tooltip title={_myAccount.displayName} arrow placement="right">
          <Avatar src={_myAccount.photoURL} alt={_myAccount.displayName} sx={{ width: 40, height: 40 }}>
            {_myAccount.displayName.charAt(0).toUpperCase()}
          </Avatar>
        </Tooltip>

        <Box sx={{ flex: 1 }}>
          <Box
            {...getRootProps()}
            sx={{
              position: 'relative'
            }}
          >
            <TextField
              multiline
              placeholder='Thêm nhận xét...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: theme.vars.palette.background.neutral
                }
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color='primary'
                        onClick={open}
                      >
                        <input {...getInputProps()} />
                        <Iconify icon='solar:gallery-add-bold'/>
                      </IconButton>
                      <IconButton
                        type='submit'
                        color='primary'
                        disabled={!input.trim()}
                      >
                        <Iconify icon='solar:plain-bold'/>
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />

            {(isDragActive) && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: theme.vars.palette.success.main,
                  opacity: 0.7,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" color="common.white">
                  Thả ảnh vào đây
                </Typography>
              </Box>
            )}
          </Box>

          {isImageMode && previewUrls.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {previewUrls.map((url, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    style={{
                      width: 165,
                      height: 165,
                      objectFit: 'cover',
                      borderRadius: 8
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      setPreviewUrls(previewUrls.filter((_, i) => i !== index))
                    }}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      '&:hover': {
                        backgroundColor: theme.vars.palette.error.main,
                        color: 'white'
                      }
                    }}
                  >
                    <Iconify icon='solar:trash-bin-trash-bold' />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

        </Box>
      </Box>

      {/* Result message  */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {allItems.map((item) => {
          const isComment = !('type' in item)
          const avatarColor = stringToColor(item.id)

          return (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                display: 'flex',
                gap: 1.5,
                p: 2,
                backgroundColor: '#f8fafc',
                position: 'relative'
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: avatarColor,
                  fontSize: '0.875rem'
                }}
              >
                {getInitials(item.id)}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: 1.5,
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{ fontWeight: 600, mr: 1 }}
                  >
                    {isComment ? 'User' : 'Result'}
                  </Typography>

                  {isComment ? (
                    <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                      {item.content}
                    </Typography>
                  ) : (
                    item.type === 'image' ? (
                      <CardMedia
                        component="img"
                        image={item.content}
                        alt="Result image"
                        sx={{
                          mt: 1,
                          borderRadius: 1,
                          maxHeight: 300,
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                        {item.content}
                      </Typography>
                    )
                  )}
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    mt: 0.5,
                    ml: 0.5
                  }}
                >
                  {formatDate(item.createdAt)}
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={() => handleDelete(item)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  opacity: 0.6,
                  '&:hover': { opacity: 1 }
                }}
              >
                <Iconify icon='solar:pen-bold' />
              </IconButton>
            </Paper>
          )
        })}

        {allItems.length === 0 && (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              borderRadius: 2
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No comments yet. Be the first to comment!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MessageSection
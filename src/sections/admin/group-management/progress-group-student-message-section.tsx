import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useRef, useState, useEffect, useCallback } from 'react'

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

import type { Message } from './types'

interface ResultSectionProps {
  todoId: string;
  messages: Message[];
}

const MessageSection: React.FC<ResultSectionProps> = ({ todoId, messages }) => {
  const theme = useTheme()
  const { addComment, deleteComment } = useTodo()
  const [input, setInput] = useState('')
  const [isImageMode, setIsImageMode] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  console.log('🚀 ~ previewUrls:', previewUrls)
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const textFieldRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          const file = item.getAsFile()
          if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrls((prev) => [...prev, url])
            setIsImageMode(true)
          }
        }
      }
    }
    const inputImg = textFieldRef.current
    if (inputImg) {
      inputImg.addEventListener('paste', handlePaste)
    }
    return () => {
      if (inputImg) {
        inputImg.removeEventListener('paste', handlePaste)
      }
    }
  }, [])

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
      if (isImageMode && previewUrls.length > 0) {
      // Gửi kết quả dạng ảnh kèm mô tả (dạng mảng: [text, ...images])
        addComment(todoId, [input, ...previewUrls], 'image')
      } else {
      // Gửi kết quả dạng chỉ văn bản
        addComment(todoId, [input], 'text')
      }

      // Reset trạng thái
      setInput('')
      setIsImageMode(false)
      setPreviewUrls([])
    }
  }

  const handleDelete = (item: Message) => {
    if ('type' in item) {
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

  const allItems = [...messages].sort((a, b) =>
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
              inputRef={textFieldRef}
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {allItems.map((item) => {
          const isComment = item.type === 'text'

          return (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                display: 'flex',
                gap: 1.5,
                p: 2,
                position: 'relative'
              }}
            >
              <Avatar src={_myAccount.photoURL} alt={_myAccount.displayName} sx={{ width: 40, height: 40 }}>
                {_myAccount.displayName.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    borderRadius: 2,
                    p: 1.5,
                    backgroundColor: theme.vars.palette.background.neutral,
                    border: `1px solid ${theme.vars.palette.divider}`
                  }}
                >
                  <Typography variant="subtitle2" >
                    {_myAccount.displayName}
                  </Typography>

                  {/* Nếu là comment hoặc kiểu text thì hiển thị bình thường */}
                  {isComment ? (
                    <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                      {Array.isArray(item.content) ? item.content[0] : item.content}
                    </Typography>
                  ) : (
                    <>
                      {/* Tách phần mô tả và ảnh */}
                      {Array.isArray(item.content) && (
                        <>
                          <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                            {item.content[0]}
                          </Typography>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                            {item.content.slice(1).map((url: string, idx: number) => (
                              <CardMedia
                                key={idx}
                                component="img"
                                image={url}
                                alt={`Result image ${idx + 1}`}
                                onClick={() => setEnlargedImage(url)}
                                sx={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: 1,
                                  objectFit: 'cover',
                                  cursor: 'pointer',
                                  transition: 'transform 0.3s',
                                  '&:hover': { transform: 'scale(1.02)' }
                                }}
                              />
                            ))}
                          </Box>
                        </>
                      )}
                    </>
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
                <Iconify icon='solar:trash-bin-trash-bold' />
              </IconButton>
            </Paper>
          )
        })}

        <AnimatePresence>
          {enlargedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEnlargedImage(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1300,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'zoom-out'
              }}
            >
              <motion.img
                src={enlargedImage}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  borderRadius: '8px',
                  boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}
                onClick={(e) => e.stopPropagation()} // tránh đóng khi click vào ảnh
              />
            </motion.div>
          )}
        </AnimatePresence>

        {allItems.length === 0 && (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 2
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Chưa có nhận xét nào
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MessageSection
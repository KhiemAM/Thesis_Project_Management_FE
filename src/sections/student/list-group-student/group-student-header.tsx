import React, { useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Iconify } from 'src/components/iconify'

interface GroupStudentHeaderProps {
  name: string;
  description?: string;
  memberCount: number;
  maxMembers: number;
  coverImage?: string;
  onImageUpload: (file: File) => void;
}

const GroupStudentHeader: React.FC<GroupStudentHeaderProps> = ({
  name,
  description,
  memberCount,
  maxMembers,
  coverImage,
  onImageUpload
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaultImage = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEil2iKPxVTadEINxydRzP0j_X8O1EGI6HVfgXNdrel-uhuBoqzx5F6Qvn7PFKHgi7G5TzUdx6wYhgUKSjes6BmK8ZVYpHbXJgE-2hYW8bWkrMEm-9N1yqL84V7A5J-TcAfJxB3rLWeSz7XN/s2000/215795661_2999503290285160_5412146965312912818_n.jpg'
  const imageUrl = coverImage || defaultImage

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)

      // Simulate upload delay
      setTimeout(() => {
        onImageUpload(file)
        setIsUploading(false)
      }, 1500)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          height: { xs: '120px', sm: '180px', md: '220px' },
          borderRadius: '8px 8px 0 0',
          overflow: 'hidden',
          mb: 0
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          component="img"
          src={imageUrl}
          alt="Cover photo"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'filter 0.3s ease',
            filter: isHovered ? 'brightness(0.8)' : 'brightness(1)'
          }}
        />

        <Box
          component="label"
          htmlFor="cover-image-upload"
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          <input
            accept="image/*"
            id="cover-image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<Iconify icon='solar:camera-add-bold' />}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)'
              }
            }}
          >
          Đổi ảnh bìa
          </Button>
        </Box>
      </Paper>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4">
          {name}
        </Typography>

        {description && (
          <Typography variant="body1">
            {description}
          </Typography>
        )}

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
          <Iconify icon='solar:users-group-rounded-bold' />
          <Typography variant="body2" color="text.secondary">
            {memberCount} / {maxMembers} thành viên
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default GroupStudentHeader
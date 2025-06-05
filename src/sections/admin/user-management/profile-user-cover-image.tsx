import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { Iconify } from 'src/components/iconify'

interface ProfileUserCoverImageProps {
  coverImage?: string;
  onCoverChange?: (file: File) => void;
}

const ProfileUserCoverImage = ({
  coverImage = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEil2iKPxVTadEINxydRzP0j_X8O1EGI6HVfgXNdrel-uhuBoqzx5F6Qvn7PFKHgi7G5TzUdx6wYhgUKSjes6BmK8ZVYpHbXJgE-2hYW8bWkrMEm-9N1yqL84V7A5J-TcAfJxB3rLWeSz7XN/s2000/215795661_2999503290285160_5412146965312912818_n.jpg',
  onCoverChange
} : ProfileUserCoverImageProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0 && onCoverChange) {
      onCoverChange(files[0])
    }
  }

  return (
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
        src={coverImage}
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
  )
}

export default ProfileUserCoverImage
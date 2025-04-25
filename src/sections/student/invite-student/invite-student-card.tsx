import React, { useState } from 'react'

import {
  Box,
  Button,
  Avatar,
  useTheme,
  Typography
} from '@mui/material'

import type { UserData } from './data'

interface UserProfileCardProps {
  user: UserData;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isAccepted, setIsAccepted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()

  const handleAccept = () => {
    setIsAccepted(true)
  }

  const handleReject = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
        borderRadius: '16px',
        mb: 3
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        src={user.profileImage}
        alt={user.displayName}
        sx={{
          width: 48,
          height: 48,
          marginRight: 2,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 0.5
        }}>
          <Typography
            variant="h5"
            sx={{
              '&:hover': {
                color: theme.vars.palette.primary.main
              }
            }}
          >
            {user.username}
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
        >
          {user.displayName}
        </Typography>
      </Box>
      <Box sx={{ ml: 2, display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        {user.type === 'inviter' ? (
          <><Button
            variant={isAccepted ? 'outlined' : 'contained'}
            onClick={handleAccept}
            disabled={isAccepted}
            sx={{
              minWidth: '100px',
              fontWeight: 700,
              backgroundColor: isAccepted ? 'transparent' : undefined,
              color: isAccepted ? theme.palette.text.primary : undefined,
              borderColor: isAccepted ? theme.palette.text.primary : undefined,
              '&:hover': {
                backgroundColor: isAccepted
                  ? theme.palette.action.hover
                  : theme.palette.primary.dark
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {isAccepted ? 'Đã xác nhận' : 'Xác nhận'}
          </Button><Button
            variant="outlined"
            onClick={handleReject}
            sx={{
              minWidth: '100px',
              fontWeight: 700,
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.main + '15',
                borderColor: theme.palette.error.main
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
              Từ chối
          </Button></>
        ) : (
          <Button
            variant="outlined"
            onClick={handleReject}
            sx={{
              minWidth: '100px',
              fontWeight: 700,
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.main + '15',
                borderColor: theme.palette.error.main
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            Hủy
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default UserProfileCard
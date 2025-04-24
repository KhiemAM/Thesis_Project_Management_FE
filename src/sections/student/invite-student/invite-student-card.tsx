// import { Check } from 'lucide-react'
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
  const [isFollowing, setIsFollowing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '16px',
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        }
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
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
          >
            {user.username}
            {user.isVerified && (
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ml: 0.5,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {/* <Check size={12} color="white" /> */}
              </Box>
            )}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mb: 0.5,
            color: theme.palette.text.secondary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {user.displayName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4
          }}
        >
          {user.bio}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.secondary,
            fontWeight: 500
          }}
        >
          {user.followers} followers
        </Typography>
      </Box>
      <Box sx={{ ml: 2, display: 'flex', alignItems: 'flex-start' }}>
        <Button
          variant={isFollowing ? 'outlined' : 'contained'}
          onClick={handleFollow}
          sx={{
            minWidth: '100px',
            fontWeight: 700,
            backgroundColor: isFollowing ? 'transparent' : undefined,
            color: isFollowing ? theme.palette.text.primary : undefined,
            borderColor: isFollowing ? theme.palette.text.primary : undefined,
            '&:hover': {
              backgroundColor: isFollowing
                ? theme.palette.error.main + '15'
                : theme.palette.primary.dark,
              borderColor: isFollowing ? theme.palette.error.main : undefined,
              color: isFollowing ? theme.palette.error.main : undefined
            },
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {isFollowing ? (isHovered ? 'Unfollow' : 'Following') : 'Follow'}
        </Button>
      </Box>
    </Box>
  )
}

export default UserProfileCard
import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { blue, green } from '@mui/material/colors'

import { Iconify } from 'src/components/iconify'

interface StatisticProps {
  label: string;
  value: number;
  color?: string;
}

const Statistic: React.FC<StatisticProps> = ({ label, value, color = 'text.primary' }) => (
  <Box sx={{ py: 1.5 }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h6" color={color} fontWeight={500}>
      {value}
    </Typography>
  </Box>
)

interface ProfileStudentSidebarInfoProps {
  name?: string;
  company?: string;
  profileImage?: string;
  stats?: {
    applied: number;
    won: number;
    current: number;
  };
}

const ProfileStudentSidebarInfo: React.FC<ProfileStudentSidebarInfoProps> = ({
  name = 'Huỳnh Quang Khiêm',
  company = '2001210783',
  profileImage = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  stats = { applied: 32, won: 26, current: 6 }
}) => {
  const theme = useTheme()

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      // In a real app, here we would upload the image to a server
      console.log('Image selected:', files[0])
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        borderRadius: 0
      }}
    >
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Avatar
          src={profileImage}
          alt={name}
          sx={{
            width: 96,
            height: 96,
            border: '3px solid white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginTop: -8
          }}
        />
        <Box
          component="label"
          htmlFor="profile-image-upload"
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            backgroundColor: `${theme.vars.palette.primary.main}`,
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              // backgroundColor: 'primary.dark'
            }
          }}
        >
          <input
            accept="image/*"
            id="profile-image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
          <Iconify icon='solar:camera-add-bold' sx={{ color: `${theme.vars.palette.primary.contrastText}` }}/>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {company}
      </Typography>

      <Divider sx={{ width: '100%', my: 2 }} />

      <Box sx={{ width: '100%' }}>
        <Statistic label="Opportunities applied" value={stats.applied} color={blue[700]} />
        <Statistic label="Opportunities won" value={stats.won} color={green[700]} />
        <Statistic label="Current opportunities" value={stats.current} />
      </Box>
    </Paper>
  )
}

export default ProfileStudentSidebarInfo
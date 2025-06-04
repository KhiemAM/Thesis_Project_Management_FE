import type { IconifyName } from 'src/components/iconify'

import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { fDate } from 'src/utils/format-time'

import { Iconify } from 'src/components/iconify'

import type { StudentProfileProps } from './profile-student-information'

interface LabelInfoProps {
  label: string;
  value: string;
  icon: IconifyName;
}

const LabelInfo = ({ label, value, icon }: LabelInfoProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
    <Iconify icon={icon} />
    <Tooltip title={label} placement="right">
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    </Tooltip>
  </Box>
)

interface ProfileStudentSidebarInfoProps {
  initialValues: StudentProfileProps | null;
  profileImage?: string;
  isDrawer?: boolean;
}

const ProfileStudentSidebarInfo: React.FC<ProfileStudentSidebarInfoProps> = ({
  initialValues,
  profileImage = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  isDrawer = false
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
          alt='Profile Image'
          sx={{
            width: 96,
            height: 96,
            border: '3px solid white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginTop: isDrawer ? 0 : -8
          }}
        />
        {!isDrawer && (
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
                backgroundColor: `${theme.vars.palette.primary.dark}`
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
            <Iconify
              icon="solar:camera-add-bold"
              sx={{ color: `${theme.vars.palette.primary.contrastText}` }}
            />
          </Box>
        )}
      </Box>

      <Tooltip title="Họ tên" placement="left">
        <Typography variant="h6" gutterBottom>
          {`${initialValues?.information.last_name} ${initialValues?.information.first_name}`}
        </Typography>
      </Tooltip>
      <Tooltip title="Mã số sinh viên" placement="left">
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {initialValues?.student_info.student_code}
        </Typography>
      </Tooltip>

      <Divider sx={{ width: '100%', my: 2 }} />

      <Box sx={{ width: '100%' }}>
        <LabelInfo label="Giới tính" value={initialValues?.information.gender === '1' ? 'Nam' : 'Nữ'} icon="tabler:gender-male" />
        <LabelInfo label="Ngày sinh" value={fDate(initialValues?.information.date_of_birth)} icon="solar:calendar-bold" />
        <LabelInfo label="Lớp học" value={initialValues?.student_info.class_name || ''} icon="solar:book-2-bold" />
        <LabelInfo label="Chuyên ngành" value={initialValues?.student_info.major_name || ''} icon="solar:book-bookmark-bold" />
      </Box>
    </Paper>
  )
}

export default ProfileStudentSidebarInfo

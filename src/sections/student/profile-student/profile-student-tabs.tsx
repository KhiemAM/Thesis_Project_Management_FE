import type { SyntheticEvent } from 'react'

import React from 'react'

import {
  Box,
  useTheme,
  Tab as MuiTab,
  useMediaQuery,
  Tabs as MuiTabs
} from '@mui/material'

import { Iconify } from 'src/components/iconify'

export type ProfileStudentTabValue = 'information' | 'account';

interface ProfileStudentTabsProps {
  value: ProfileStudentTabValue;
  onChange: (event: SyntheticEvent, newValue: ProfileStudentTabValue) => void;
}

const ProfileStudentTabs: React.FC<ProfileStudentTabsProps> = ({ value, onChange }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderBottom: 1, borderColor: 'divider' }}>
      <MuiTabs
        value={value}
        onChange={onChange}
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons={isMobile ? 'auto' : undefined}
        allowScrollButtonsMobile
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main'
          }
        }}
      >
        <MuiTab
          label="Thông tin chung"
          value="information"
          icon={<Iconify icon='solar:card-2-bold' />}
          iconPosition='start'
          sx={{
            py: 2,
            minWidth: isMobile ? 'auto' : 120,
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
            }
          }}
        />
        <MuiTab
          label="Tài khoản"
          value="account"
          icon={<Iconify icon='solar:folder-security-bold' />}
          iconPosition='start'
          sx={{
            py: 2,
            minWidth: isMobile ? 'auto' : 120,
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
            }
          }}
        />
      </MuiTabs>
    </Box>
  )
}

export default ProfileStudentTabs
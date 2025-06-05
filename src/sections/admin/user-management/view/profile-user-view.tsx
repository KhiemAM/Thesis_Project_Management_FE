import type { SyntheticEvent } from 'react'

import React, { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useLoading } from 'src/context'
import profileApi from 'src/axios/profile'
import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import ProfileUserTabs from '../profile-user-tabs'
import ProfileUserAccount from '../profile-user-account'
import ProfileUserCoverImage from '../profile-user-cover-image'
import ProfileUserSidebarInfo from '../profile-user-sidebar-info'
import ProfileStudentInformation from '../profile-user-information'

import type { ProfileStudentTabValue } from '../profile-user-tabs'
import type { StudentProfileProps } from '../profile-user-information'
// ----------------------------------------------------------------------

const ContentWrapper = styled(Paper)(({ theme }) => ({
  padding: 0,
  borderRadius: 0,
  height: '100%',
  boxShadow: 'none',
  borderLeft: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderLeft: 'none',
    borderTop: `1px solid ${theme.palette.divider}`
  }
}))

export function ProfileUserView() {
  const { setIsLoading } = useLoading()
  const [activeTab, setActiveTab] = useState<ProfileStudentTabValue>('information')
  const [studentInfo, setStudentInfo] = useState<StudentProfileProps | null>(null)

  const fetchStudentInfo = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await profileApi.getLecturerProfile()
      setStudentInfo(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  useEffect(() => {
    fetchStudentInfo()
  }, [fetchStudentInfo])

  const handleTabChange = (event: SyntheticEvent, newValue: ProfileStudentTabValue) => {
    setActiveTab(newValue)
  }

  const renderTabContent = () => {
    switch (activeTab) {
    case 'information':
      return <ProfileStudentInformation initialValues={studentInfo} onRefresh={fetchStudentInfo}/>
    case 'account':
      return <ProfileUserAccount />
    default:
      return <ProfileStudentInformation initialValues={studentInfo} onRefresh={fetchStudentInfo}/>
    }
  }

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Thông tin cá nhân
        </Typography>
        <IconButton
          // color={openSetting ? 'primary' : 'default'}
          // onClick={onOpenSetting}
          // sx={sx}
          // {...other}
        >
          <Iconify width={24} icon="solar:menu-dots-circle-bold" />
        </IconButton>

      </Box>

      <Card>
        <Scrollbar>
          <Box>
            <ProfileUserCoverImage />
            <Grid container sx={{ bgcolor: 'background.paper' }}>
              <Grid size={{ xs: 12, md: 3, lg: 3 }}>
                <ProfileUserSidebarInfo initialValues={studentInfo}/>
              </Grid>
              <Grid size={{ xs: 12, md: 9, lg: 9 }}>
                <ContentWrapper>
                  <ProfileUserTabs value={activeTab} onChange={handleTabChange} />
                  <Box sx={{ px: { xs: 2, sm: 3 } }}>
                    {renderTabContent()}
                  </Box>
                </ContentWrapper>
              </Grid>
            </Grid>
          </Box>
        </Scrollbar>
      </Card>
    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

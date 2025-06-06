import type { SyntheticEvent } from 'react'

import { jwtDecode } from 'jwt-decode'
import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { RouterLink } from 'src/routes/components'

import userApi from 'src/axios/user'
import { useLoading } from 'src/context'
import { useAppSelector } from 'src/redux/hook'
import { DashboardContent } from 'src/layouts/student'
import { selectCurrentUser } from 'src/redux/user/user-slice'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import ProfileUserTabs from '../profile-user-tabs'
import ProfileUserCoverImage from '../profile-user-cover-image'
import DetailProfileUserRole from '../detail-profile-user-role'
import DetailProfileUserAccount from '../detail-profile-user-account'
import DetailProfileStudentInformation from '../detail-profile-student-information'
import DetailProfileStudentSidebarInfo from '../detail-profile-student-sidebar-info'
import DetailProfileLecturerInformation from '../detail-profile-lecturer-information'
import DetailProfileLecturerSidebarInfo from '../detail-profile-lecturer-sidebar-info'

import type { ProfileStudentTabValue } from '../profile-user-tabs'
// ----------------------------------------------------------------------

export interface DetailProfileUserProps {
  user_id: string;
  user_name: string;
  user_type: number;
  user_type_name: string;
  information: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string; // hoặc Date nếu bạn parse ra
    gender: number; // 0: Nữ, 1: Nam
    address: string;
    tel_phone: string;
  };
  student_info: {
    student_code: string;
    class_name: string;
    major_id: string;
    id: string;
    user_id: string;
    create_datetime: string; // hoặc Date
    update_datetime: string; // hoặc Date
    major_name: string;
  };
  lecturer_info: {
    lecturer_code: string;
    department: number;
    title: string;
    email: string;
    id: string;
    user_id: string;
    department_name: string;
    create_datetime: string; // hoặc Date
    update_datetime: string; // hoặc Date
  };
}


interface MyJwtPayload {
  uuid: string;
  // Thêm các trường khác nếu cần
}

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

export function DetailProfileUserView() {
  const { setIsLoading } = useLoading()
  const { id } = useParams()
  const currentUser = useAppSelector(selectCurrentUser)
  const userInfo = currentUser?.access_token ? jwtDecode<MyJwtPayload>(currentUser.access_token) : null
  const [activeTab, setActiveTab] = useState<ProfileStudentTabValue>('information')
  const [studentInfo, setStudentInfo] = useState<DetailProfileUserProps | null>(null)

  const fetchStudentInfo = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await userApi.getUserFullProfile(id as string)
      setStudentInfo(res.data)
    } catch {
      setStudentInfo(null)
    } finally {
      setIsLoading(false)
    }
  }, [id, setIsLoading])

  useEffect(() => {
    fetchStudentInfo()
  }, [fetchStudentInfo])

  const handleTabChange = (event: SyntheticEvent, newValue: ProfileStudentTabValue) => {
    setActiveTab(newValue)
  }

  const renderTabContent = () => {
    switch (activeTab) {
    case 'information':
      return studentInfo?.lecturer_info ? <DetailProfileLecturerInformation initialValues={studentInfo} /> : <DetailProfileStudentInformation initialValues={studentInfo}/>
    case 'account':
      return <DetailProfileUserAccount userId={id || null}/>
    case 'role':
      return <DetailProfileUserRole userId={id || null}/>
    default:
      return studentInfo?.lecturer_info ? <DetailProfileLecturerInformation initialValues={studentInfo} /> : <DetailProfileStudentInformation initialValues={studentInfo}/>
    }
  }

  if (id === userInfo?.uuid) {
    return <Navigate to="/user/profile" replace />
  }

  return (
    <DashboardContent>
      <Box
        component={RouterLink}
        href='/user/list'
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary',
          textDecoration: 'none'
        }}
        gap={1}
      >
        <Iconify icon='solar:alt-arrow-left-line-duotone'/>
        <Typography variant="h4" sx={{ flexGrow: 1 }} >
          Thông tin tài khoản
        </Typography>
      </Box>

      <Card>
        <Scrollbar>
          <Box>
            <ProfileUserCoverImage />
            <Grid container sx={{ bgcolor: 'background.paper' }}>
              <Grid size={{ xs: 12, md: 3, lg: 3 }}>
                {studentInfo?.lecturer_info ? (
                  <DetailProfileLecturerSidebarInfo initialValues={studentInfo} />
                ) : (
                  <DetailProfileStudentSidebarInfo initialValues={studentInfo} />
                )}
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

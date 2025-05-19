import type { RouteObject } from 'react-router'

import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { varAlpha } from 'minimal-shared/utils'

import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

import { AuthLayout } from 'src/layouts/auth'
import { StudentLayout } from 'src/layouts/student'
import { DashboardLayout } from 'src/layouts/dashboard'


// -----------------------Admin-----------------------------------------------
export const DashboardPage = lazy(() => import('src/pages/dashboard'))
export const BlogPage = lazy(() => import('src/pages/blog'))
export const UserPage = lazy(() => import('src/pages/user'))
export const SignInPage = lazy(() => import('src/pages/sign-in'))
export const RegisterPage = lazy(() => import('src/pages/register'))
export const ProductsPage = lazy(() => import('src/pages/products'))
export const ProgressPage = lazy(() => import('src/pages/progress'))
export const Page404 = lazy(() => import('src/pages/page-not-found'))

// -----------------------Admin Management--------------------------------------
export const ListFunctionPage = lazy(() => import('src/pages/admin/functionManagement/list-function'))
export const CreateFunctionPage = lazy(() => import('src/pages/admin/functionManagement/create-function'))
export const UpdateFunctionPage = lazy(() => import('src/pages/admin/functionManagement/update-function'))
export const ListRolePage = lazy(() => import('src/pages/admin/roleManagement/list-role'))
export const CreateRolePage = lazy(() => import('src/pages/admin/roleManagement/create-role'))
export const UpdateRolePage = lazy(() => import('src/pages/admin/roleManagement/update-role'))
export const ListTopicProposalPage = lazy(() => import('src/pages/admin/topicProposalManagement/list-topic-proposal'))
export const CreateTopicProposalPage = lazy(() => import('src/pages/admin/topicProposalManagement/create-topic-proposal'))
export const ApproveTopicProposalPage = lazy(() => import('src/pages/admin/topicProposalManagement/approve-topic-proposal'))

// ----------------------Student------------------------------------------------
export const DashboardStudentPage = lazy(() => import('src/pages/student/dashboard-student'))
export const SearchStudentPage = lazy(() => import('src/pages/student/search-student'))
export const InviteStudentPage = lazy(() => import('src/pages/student/invite-student'))
export const ProfileStudentPage = lazy(() => import('src/pages/student/profile-student'))
export const GroupStudentPage = lazy(() => import('src/pages/student/group-student'))
export const TopicStudentPage = lazy(() => import('src/pages/student/topic-student'))

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'primary.main' }
      }}
    />
  </Box>
)

const MainRoutes = () => [
  {
    path: '/student',
    element: (
      // <ProtectedRoute>
      <StudentLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </StudentLayout>
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardStudentPage /> },
      { path: 'search', element: <SearchStudentPage /> },
      { path: 'invite', element: <InviteStudentPage /> },
      { path: 'profile', element: <ProfileStudentPage /> },
      { path: 'group', element: <GroupStudentPage /> },
      { path: 'topic', element: <TopicStudentPage /> }
    ]
  },
  {
    path: '/',
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: 'user',
        element: <Outlet />,
        children: [
          { path: 'list', element: <UserPage /> },
          { path: 'create', element: <UserPage /> }
        ]
      },
      {
        path: 'function',
        element: <Outlet />,
        children: [
          { path: 'list', element: <ListFunctionPage /> },
          { path: 'create', element: <CreateFunctionPage /> },
          { path: 'update', element: <UpdateFunctionPage /> }
        ]
      },
      {
        path: 'role',
        element: <Outlet />,
        children: [
          { path: 'list', element: <ListRolePage /> },
          { path: 'create', element: <CreateRolePage /> },
          { path: 'update', element: <UpdateRolePage /> }
        ]
      },
      {
        path: 'topic-proposal',
        element: <Outlet />,
        children: [
          { path: 'list', element: <ListTopicProposalPage /> },
          { path: 'create', element: <CreateTopicProposalPage /> },
          { path: 'approve', element: <ApproveTopicProposalPage /> }
        ]
      }
      // { path: 'products', element: <ProductsPage /> },
      // { path: 'blog', element: <BlogPage /> },
      // { path: 'progress', element: <ProgressPage /> }
    ]
  }
]

const AuthRoutes = () => [
  {
    path: 'login',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    )
  },
  {
    path: 'register',
    element: (
      <AuthLayout>
        <RegisterPage />
      </AuthLayout>
    )
  }
]

export const routesSection: RouteObject[] = [
  ...MainRoutes(),
  ...AuthRoutes(),
  {
    path: '404',
    element: <Page404 />
  },
  { path: '*', element: <Page404 /> }
]
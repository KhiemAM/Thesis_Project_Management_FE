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

// ----------------------Student------------------------------------------------
export const DashboardStudentPage = lazy(() => import('src/pages/student/dashboard-student'))
export const SearchStudentPage = lazy(() => import('src/pages/student/search-student'))
export const InviteStudentPage = lazy(() => import('src/pages/student/invite-student'))
export const ProfileStudentPage = lazy(() => import('src/pages/student/profile-student'))

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
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' }
      }}
    />
  </Box>
)

export const routesSection: RouteObject[] = [
  {
    path: '/student',
    element: (
      <StudentLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </StudentLayout>
    ),
    children: [
      { index: true, element: <DashboardStudentPage /> },
      { path: 'search', element: <SearchStudentPage /> },
      { path: 'invite', element: <InviteStudentPage /> },
      { path: 'profile', element: <ProfileStudentPage /> }
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
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'progress', element: <ProgressPage /> }
    ]
  },
  {
    path: 'sign-in',
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
  },
  {
    path: '404',
    element: <Page404 />
  },
  { path: '*', element: <Page404 /> }
]

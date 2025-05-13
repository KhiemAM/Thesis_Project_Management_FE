import type { ReactNode } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'src/redux/hook'
import { selectCurrentUser } from 'src/redux/user/user-slice'

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
  const userInfo = useAppSelector(selectCurrentUser)

  if (!userInfo) {
    // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

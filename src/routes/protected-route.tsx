import type { ReactNode } from 'react'

import { jwtDecode } from 'jwt-decode'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from 'src/redux/hook'
import { selectCurrentUser } from 'src/redux/user/user-slice'

interface DecodedToken {
  uuid: string;
  name: string;
  type: number; // 2 = student, 3 = admin (tuỳ theo hệ thống của bạn)
  functions: string[]; // danh sách đường dẫn chức năng được phép truy cập
  exp: number; // thời gian hết hạn token (UNIX timestamp)
}

interface ProtectedRouteProps {
  children: ReactNode;
}

function isAuthorized(path: string, allowedPaths: string[]): boolean {
  const basePath = path.split('?')[0]

  // ✅ Nếu path là "/" (dashboard mặc định), và user có ít nhất 1 quyền, cho phép vào
  if (basePath === '/' && allowedPaths.length > 0) {
    return true
  }

  // ✅ Kiểm tra từng quyền
  for (const allowed of allowedPaths) {
    // Chuyển route động kiểu /user/information/:id thành regex
    const regexPattern = '^' + allowed.replace(/:[^/]+/g, '[^/]+') + '$'
    const regex = new RegExp(regexPattern)

    if (regex.test(basePath)) {
      return true
    }
  }

  // ❌ Không khớp quyền nào
  return false
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const currentUser = useAppSelector(selectCurrentUser)
  const userInfo = currentUser ? jwtDecode<DecodedToken>(currentUser.access_token) : null
  console.log('🚀 ~ ProtectedRoute ~ userInfo:', userInfo)

  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // ✅ Điều hướng dựa vào user_type
  if (userInfo.type === 2 && !location.pathname.startsWith('/student')) {
    return <Navigate to="/student" replace />
  }

  if ((userInfo.type === 3 || userInfo.type === 1) && location.pathname.startsWith('/student')) {
    return <Navigate to="/" replace />
  }

  // const hasAccess = isAuthorized(location.pathname, userInfo.functions)

  // if (!hasAccess && userInfo.type !== 2) {
  //   return <Navigate to="/404" replace />
  // }

  return children
}

export default ProtectedRoute

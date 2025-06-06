import 'dayjs/locale/vi'

import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import rolesApi from 'src/axios/roles'
import { useLoading } from 'src/context'
import userRolesApi from 'src/axios/user-roles'

import { UniversalCheckboxTree } from 'src/components/list'


//-------------------------------------------------------------------------
interface DetailProfileUserRoleProps {
  userId: string | null
}

interface RolesOfUser {
  id: string
  role_id: string
  user_id: string
  create_datetime: string
  created_by: string
}

const DetailProfileUserRole = ({ userId }: DetailProfileUserRoleProps) => {
  const { setIsLoading } = useLoading()
  const [loadingButton, setLoadingButton] = useState(false)
  const [_role, setRole] = useState([])
  const [rolesOfUser, setRolesOfUser] = useState<RolesOfUser[]>([])
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  const fetchRoles = useCallback(async () => {
    try {
      setIsLoading(true)
      const resRoles = await rolesApi.getAllRoles()
      const resRolesOfUser = await userRolesApi.getAllRolesOfUser(userId)
      setRole(resRoles.data)
      setRolesOfUser(resRolesOfUser.data)
    } finally {
      setIsLoading(false)
    }
  }, [userId, setIsLoading])

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  useEffect(() => {
    if (rolesOfUser.length > 0) {
      const ids = rolesOfUser.map((item: { role_id: string }) => String(item.role_id))
      setCheckedIds(ids)
    }
  }, [rolesOfUser])

  const handleChangeChecked = (ids: string[]) => {
    setCheckedIds(ids)
  }

  const handleUserRoles = async() => {
    try {
      setLoadingButton(true)
      if (checkedIds.length === 1) {
        const data = {
          user_id: userId,
          role_id: checkedIds[0]
        }
        if (rolesOfUser.length > 0) {
          await userRolesApi.updateUserRole(rolesOfUser[0].id, data)
          toast.success('Cập nhật vai trò thành công!')
        } else {
          await userRolesApi.createUserRole(data)
          toast.success('Thêm vai trò thành công!')
        }
      } else {
        toast.error('Vui lòng chỉ chọn một vai trò!')
      }
    } finally {
      setLoadingButton(false)
    }
  }

  return (
    <Grid container spacing={3} sx={{ py: 3 }}>
      <Grid size={{ xs: 12, md: 12 }}>
        <UniversalCheckboxTree
          items={_role}
          label="roleName"
          valueKey="id"
          checkedIds={checkedIds}
          onChange={handleChangeChecked}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            loading={loadingButton}
            loadingPosition='start'
            onClick={handleUserRoles}
            size='large'
            variant="contained"
            color="primary"
            sx={{
              minWidth: 120,
              transition: 'all 0.2s ease'
            }}
          >
              Cập nhật vai trò
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default DetailProfileUserRole
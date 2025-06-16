import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { DashboardContent } from 'src/layouts/dashboard'

import { Scrollbar } from 'src/components/scrollbar'

// ----------------------------------------------------------------------
const _department = [
  {
    value: 'KTPM',
    label: 'Kỹ thuật phần mềm'
  },
  {
    value: 'HTTT',
    label: 'Hệ thống thông tin'
  },
  {
    value: 'KHDL&TTNT',
    label: 'Khoa học dữ liệu và trí tuệ nhân tạo'
  },
  {
    value: 'MMT-ATTT',
    label: 'Mạng máy tính và an toàn thông tin'
  },
]

interface IFormInputCreateFunction {
  name: string;
  content: string;
  instructor: string;
  topic: string;
  department: string;
  note: string;
}

export function CreateCommitteeView() {
  const theme = useTheme()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputCreateFunction>()

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log(data)
    })}>
      <DashboardContent>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Lập đề xuất đề tài
          </Typography>
        </Box>

        <Card sx={{ width: { sm: '100%', md: '60%' }, mx: { sm: 'none', md: 'auto' } }}>
          <Scrollbar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <TextField
                fullWidth
                label="Tên đề tài *"
                error={!!errors['name']}
                sx={{ mb: 3 }}
                {...register('name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['name'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['name']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Nội dung yêu cầu *"
                error={!!errors['content']}
                multiline
                sx={{ mb: 3 }}
                {...register('content', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['content'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['content']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Giáo viên hướng dẫn *"
                error={!!errors['instructor']}
                sx={{ mb: 3 }}
                {...register('instructor', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['instructor'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['instructor']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Danh sách đề tài *"
                error={!!errors['topic']}
                sx={{ mb: 3 }}
                {...register('topic', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['topic'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['topic']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                select
                label="Bộ môn *"
                error={!!errors['department']}
                sx={{ mb: 3 }}
                {...register('department', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              >
                <ListSubheader sx={{ bgcolor: theme.vars.palette.primary.main, borderStartStartRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
                    <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                      Giá trị
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                      Nhãn
                    </Typography>
                  </Box>
                </ListSubheader>
                {_department.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.value}</Typography>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
              {errors['department'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['department']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Ghi chú"
                multiline
                sx={{ mb: 3 }}
                {...register('note')}
              />

              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                sx={{
                  width: { sm: '100%', md: '30%' },
                  ml: { sm: 'none', md: 'auto' }
                }}
              >
                Lập đề xuất
              </Button>
            </Box>
          </Scrollbar>
        </Card>
      </DashboardContent>
    </form>
  )
}

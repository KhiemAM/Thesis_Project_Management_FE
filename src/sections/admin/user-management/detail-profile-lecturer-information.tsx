import 'dayjs/locale/vi'

import dayjs from 'dayjs'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import type { DetailProfileUserProps } from './view'


dayjs.locale('vi')
//-------------------------------------------------------------------------

interface DetailProfileLecturerInformationProps {
  initialValues: DetailProfileUserProps | null;
}

const DetailProfileLecturerInformation = ({
  initialValues = null
} : DetailProfileLecturerInformationProps) => (
  <Grid container spacing={3} sx={{ py: 3 }}>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Mã số giáo viên"
        variant="standard"
        value={initialValues?.lecturer_info.lecturer_code || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Bộ môn"
        variant="standard"
        value={initialValues?.lecturer_info.department_name || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Học hàm. Học vị"
        variant="standard"
        value={initialValues?.lecturer_info.title || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>


    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Tên giảng viên"
        variant="standard"
        value={initialValues?.information.first_name || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Họ giảng viên"
        variant="standard"
        value={initialValues?.information.last_name || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Ngày sinh"
        variant="standard"
        value={dayjs(initialValues?.information.date_of_birth).format('DD/MM/YYYY') || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Giới tính"
        variant="standard"
        value={String(initialValues?.information?.gender) === '1'
          ? 'Nam'
          : String(initialValues?.information?.gender) === '2'
            ? 'Nữ'
            : 'Không xác định'}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Email"
        variant="standard"
        value={initialValues?.lecturer_info.email || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Địa chỉ"
        variant="standard"
        value={initialValues?.information.address || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Số điện thoại"
        variant="standard"
        value={initialValues?.information.tel_phone || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
  </Grid>
)

export default DetailProfileLecturerInformation
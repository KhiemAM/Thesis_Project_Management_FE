import 'dayjs/locale/vi'

import dayjs from 'dayjs'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import type { DetailProfileUserProps } from './view'

dayjs.locale('vi')
//-------------------------------------------------------------------------

export type StudentProfileProps = {
  user_id: string;
  information: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    address: string;
    tel_phone: string;
  };
  student_info: {
    student_code: string;
    class_name: string;
    major_id: string;
    major_name: string;
    id: string;
    user_id: string;
    create_datetime: string;
    update_datetime: string;
  };
};

interface DetailProfileStudentInformationProps {
  initialValues: DetailProfileUserProps | null;
}

const DetailProfileStudentInformation = ({
  initialValues = null
} : DetailProfileStudentInformationProps) => (
  <Grid container spacing={3} sx={{ py: 3 }}>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Mã số sinh viên"
        variant="standard"
        value={initialValues?.student_info.student_code || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Lớp học"
        variant="standard"
        value={initialValues?.student_info.class_name || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Chuyên ngành"
        variant="standard"
        value={initialValues?.student_info.major_name || ''}
        slotProps={{
          input: { readOnly: true },
          inputLabel: { shrink: true }
        }}
      />
    </Grid>


    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        label="Tên sinh viên"
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
        label="Họ sinh viên"
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

export default DetailProfileStudentInformation
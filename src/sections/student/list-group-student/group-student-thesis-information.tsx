import React from 'react'

import {
  Box,
  Card,
  Chip,
  Paper,
  Stack,
  Avatar,
  Divider,
  Typography,
  CardContent
} from '@mui/material'

export type ApproveTopicProps = {
  id: string
  thesis_type: number
  name_thesis_type: string
  status: string
  name: string
  description: string
  start_date: string
  end_date: string
  major: string
  reason?: string
  notes?: string
  instructors: {
    name: string
    email: string
    lecturer_code: string
    department: number
    department_name: string
  }[]
  reviewers: {
    name: string
    email: string
    lecturer_code: string
    department: number
    department_name: string
  }[]
  department: {
    id: string
    name: string
  }
  batch: {
    id: string
    name: string
    start_date: string
    end_date: string
    semester: {
      id: string
      name: string
      start_date: string
      end_date: string
      academy_year: {
        id: string
        name: string
        start_date: string
        end_date: string
      }
    }
  }
}

interface ThesisInformationProps {
  data: ApproveTopicProps | null
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
  case 'approved':
  case 'đã duyệt':
    return 'success'
  case 'pending':
  case 'chờ duyệt':
    return 'warning'
  case 'rejected':
  case 'từ chối':
    return 'error'
  default:
    return 'default'
  }
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 4,
      background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
      border: '1px solid #cbd5e1',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      }
    }}
  >
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" fontWeight="700" color="#0f172a">
        {title}
      </Typography>
    </Box>
    {children}
  </Paper>
)

const PersonCard = ({ person, role }: { person: any; role: string }) => (
  <Card
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 4,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: 'white',
      transition: 'all 0.3s ease',
      border: '1px solid #374151',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)'
      }
    }}
  >
    <Stack direction="row" spacing={3} alignItems="center">
      <Avatar
        sx={{
          bgcolor: 'rgba(255,255,255,0.15)',
          color: 'white',
          width: 56,
          height: 56,
          fontSize: '1.6rem',
          border: '2px solid rgba(255,255,255,0.2)'
        }}
      >
        {person.name.charAt(0).toUpperCase()}
      </Avatar>
      <Box flex={1}>
        <Typography variant="h6" fontWeight="700" sx={{ mb: 0.5 }}>
          {person.name}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1.5, fontWeight: 500 }}>
          {role} • {person.lecturer_code}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 500 }}>Email:</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>{person.email}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 500 }}>Bộ môn:</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>{person.department_name}</Typography>
        </Stack>
      </Box>
    </Stack>
  </Card>
)

export default function GroupStudentThesisInformation({ data }: ThesisInformationProps) {
  if (!data) {
    return (
      <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Không có dữ liệu đề tài để hiển thị
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '100vh' }}>
      {/* Header Section */}
      <Card
        elevation={4}
        sx={{
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
          color: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" fontWeight="700" gutterBottom sx={{ mb: 3 }}>
                {data.name}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
                <Chip
                  label={data.name_thesis_type}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                    height: 36,
                    px: 3,
                    fontWeight: 600,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,1)',
                      bgcolor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                />
                <Chip
                  label={data.major}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                    height: 36,
                    px: 3,
                    fontWeight: 600,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,1)',
                      bgcolor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        {/* Thông tin cơ bản */}
        <Box sx={{ flex: 2 }}>
          <InfoSection title="Thông tin cơ bản">
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom sx={{ mb: 2 }}>
                  Mô tả đề tài
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    bgcolor: '#f8fafc',
                    borderRadius: 3,
                    border: '2px solid #e2e8f0',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      whiteSpace: 'pre-line',
                      color: '#1e293b',
                      fontSize: '1.1rem',
                      fontWeight: 400
                    }}
                  >
                    {data.description}
                  </Typography>
                </Paper>
              </Box>              <Box sx={{ display: 'flex', gap: 3 }}>
                <Paper
                  elevation={3}
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 4,
                    bgcolor: '#ecfdf5',
                    border: '2px solid #a7f3d0',
                    background: 'linear-gradient(145deg, #ecfdf5 0%, #d1fae5 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Typography variant="caption" color="#059669" fontWeight="700" sx={{ letterSpacing: '0.5px' }}>
                      NGÀY BẮT ĐẦU
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight="700" color="#047857">
                    {formatDate(data.start_date)}
                  </Typography>                </Paper>
                <Paper
                  elevation={3}
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 4,
                    bgcolor: '#fef2f2',
                    border: '2px solid #fca5a5',
                    background: 'linear-gradient(145deg, #fef2f2 0%, #fee2e2 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Typography variant="caption" color="#dc2626" fontWeight="700" sx={{ letterSpacing: '0.5px' }}>
                      NGÀY KẾT THÚC
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight="700" color="#b91c1c">
                    {formatDate(data.end_date)}
                  </Typography>
                </Paper>              </Box>

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: '#eff6ff',
                  border: '2px solid #93c5fd',
                  background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: '#2563eb',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="h6" fontWeight="700">
                      KB
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="#2563eb" fontWeight="700" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Khoa/Bộ môn
                    </Typography>
                    <Typography variant="h6" fontWeight="700" color="#1d4ed8">
                      {data.department.name}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </InfoSection>
        </Box>

        {/* Thông tin đợt/kỳ học */}
        <Box sx={{ flex: 1 }}>
          <InfoSection title="Thông tin đợt và kỳ học">
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="600">
                  Đợt thực hiện
                </Typography>
                <Typography variant="h6" fontWeight="700" color="#0f172a">
                  {data.batch.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(data.batch.start_date)} - {formatDate(data.batch.end_date)}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: '#cbd5e1' }} />

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="600">
                  Học kỳ
                </Typography>
                <Typography variant="h6" fontWeight="700" color="#0f172a">
                  {data.batch.semester.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(data.batch.semester.start_date)} - {formatDate(data.batch.semester.end_date)}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: '#cbd5e1' }} />

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="600">
                  Năm học
                </Typography>
                <Typography variant="h6" fontWeight="700" color="#0f172a">
                  {data.batch.semester.academy_year.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(data.batch.semester.academy_year.start_date)} - {formatDate(data.batch.semester.academy_year.end_date)}
                </Typography>
              </Box>
            </Stack>
          </InfoSection>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3, mt: 3 }}>
        {/* Giảng viên hướng dẫn */}
        <Box sx={{ flex: 1 }}>
          <InfoSection title="Giảng viên hướng dẫn">
            <Stack spacing={2}>
              {data.instructors.map((instructor, index) => (
                <PersonCard
                  key={index}
                  person={instructor}
                  role="Giảng viên hướng dẫn"
                />
              ))}
            </Stack>
          </InfoSection>
        </Box>

        {/* Giảng viên phản biện */}
        <Box sx={{ flex: 1 }}>
          <InfoSection title="Giảng viên phản biện">
            <Stack spacing={2}>
              {data.reviewers.map((reviewer, index) => (
                <PersonCard
                  key={index}
                  person={reviewer}
                  role="Giảng viên phản biện"
                />
              ))}
            </Stack>
          </InfoSection>
        </Box>
      </Box>

      {/* Ghi chú và lý do */}
      {(data.reason || data.notes) && (
        <Box sx={{ mt: 3 }}>
          <InfoSection title="Ghi chú và lý do">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {data.reason && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="600">
                    Lý do
                  </Typography>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      bgcolor: '#fef3c7',
                      border: '2px solid #f59e0b',
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #fef3c7 0%, #fde68a 100%)'
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#92400e', fontWeight: 500 }}>
                      {data.reason}
                    </Typography>
                  </Paper>
                </Box>
              )}
              {data.notes && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="600">
                    Ghi chú
                  </Typography>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      bgcolor: '#dbeafe',
                      border: '2px solid #3b82f6',
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #dbeafe 0%, #bfdbfe 100%)'
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#1e40af', fontWeight: 500 }}>
                      {data.notes}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </Box>
          </InfoSection>
        </Box>
      )}
    </Box>
  )
}
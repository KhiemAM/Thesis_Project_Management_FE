import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { _posts } from 'src/_mock'
import { DashboardContent } from 'src/layouts/student'

import { AnalyticsNews } from '../analytics-news'
import { AnalyticsTasks } from '../analytics-tasks'
import { AnalyticsThesisStatus } from '../analytics-thesis-status'
import { AnalyticsCurrentVisits } from '../analytics-current-visits'
import { AnalyticsOrderTimeline } from '../analytics-order-timeline'
import { AnalyticsWebsiteVisits } from '../analytics-website-visits'
import { AnalyticsWidgetSummary } from '../analytics-widget-summary'
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site'
import { AnalyticsCurrentSubject } from '../analytics-current-subject'

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Chào mừng sinh viên trở lại! 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Lời mời đã gửi"
            percent={25.0}
            total={8}
            icon={<img alt="Sent invitations" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
              series: [1, 2, 3, 4, 5, 6, 7, 8]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Lời mời nhận được"
            percent={50.0}
            total={5}
            color="secondary"
            icon={<img alt="Received invitations" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
              series: [0, 1, 1, 2, 3, 4, 4, 5]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Thông báo"
            percent={-15.2}
            total={7}
            color="warning"
            icon={<img alt="Unread notifications" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
              series: [15, 12, 10, 8, 9, 6, 8, 7]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Trạng thái nhóm"
            percent={100.0}
            total={1}
            color="success"
            icon={<img alt="Group status" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
              series: [0, 0, 0, 0, 0, 0, 1, 1]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Thời gian thực hiện"
            chart={{
              series: [
                { label: 'Đã hoàn thành', value: 60 },
                { label: 'Đang thực hiện', value: 30 },
                { label: 'Chưa bắt đầu', value: 10 }
              ]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Tiến độ theo tuần"
            subheader="Cập nhật hàng tuần"
            chart={{
              categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'],
              series: [
                { name: 'Kế hoạch', data: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
                { name: 'Thực tế', data: [8, 18, 25, 35, 45, 55, 62, 75, 82] }
              ]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsThesisStatus
            title="Trạng thái nhiệm vụ"
            subheader="Thống kê cá nhân"
            data={[
              { label: 'Hoàn thành', value: 12, total: 15, color: 'success' },
              { label: 'Đang làm', value: 2, total: 15, color: 'warning' },
              { label: 'Quá hạn', value: 1, total: 15, color: 'error' }
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsCurrentSubject
            title="Đánh giá năng lực cá nhân"
            chart={{
              categories: ['Lập trình', 'Phân tích', 'Thiết kế', 'Giao tiếp', 'Quản lý thời gian', 'Tư duy logic'],
              series: [
                { name: 'Tự đánh giá', data: [80, 75, 70, 65, 85, 90] },
                { name: 'Đánh giá GVHD', data: [85, 80, 75, 70, 80, 85] }
              ]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews title="Thông báo từ giảng viên" list={_posts.slice(0, 5)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Lịch trình cá nhân" list={[
            {
              id: '1',
              title: 'Nộp báo cáo tuần: 25/06/2025',
              type: 'report',
              time: '2025-06-25'
            },
            {
              id: '2',
              title: 'Gặp GVHD: 28/06/2025',
              type: 'meeting',
              time: '2025-06-28'
            },
            {
              id: '3',
              title: 'Demo sản phẩm: 05/07/2025',
              type: 'demo',
              time: '2025-07-05'
            },
            {
              id: '4',
              title: 'Nộp báo cáo cuối: 15/07/2025',
              type: 'final',
              time: '2025-07-15'
            }
          ]} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks
            title="Nhiệm vụ tuần này"
            list={[
              { id: '1', name: 'Hoàn thành module đăng nhập' },
              { id: '2', name: 'Viết unit test cho API' },
              { id: '3', name: 'Cập nhật tài liệu thiết kế' },
              { id: '4', name: 'Chuẩn bị slide báo cáo tuần' },
              { id: '5', name: 'Review code với team' }
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite
            title="Công cụ sử dụng"
            list={[
              { value: 'vscode', label: 'VS Code', total: 85 },
              { value: 'github', label: 'GitHub', total: 92 },
              { value: 'notion', label: 'Notion', total: 78 },
              { value: 'figma', label: 'Figma', total: 65 }
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  )
}

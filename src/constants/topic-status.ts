// Định nghĩa mã số trạng thái dạng enum
export enum TopicStatusCode {
  REJECTED = 0,
  PENDING_APPROVAL = 1,
  APPROVED_BY_DEPARTMENT = 2,
  APPROVED_BY_FACULTY = 3,
  NOT_REGISTERED = 4,
  REGISTERED = 5
}

// Định nghĩa tên trạng thái tương ứng theo mã
export const TopicStatusText: Record<TopicStatusCode, string> = {
  [TopicStatusCode.REJECTED]: 'Từ chối',
  [TopicStatusCode.PENDING_APPROVAL]: 'Chờ duyệt',
  [TopicStatusCode.APPROVED_BY_DEPARTMENT]: 'Đã duyệt cấp bộ môn',
  [TopicStatusCode.APPROVED_BY_FACULTY]: 'Đã duyệt cấp khoa',
  [TopicStatusCode.NOT_REGISTERED]: 'Chưa được đăng ký',
  [TopicStatusCode.REGISTERED]: 'Đã được đăng ký'
}

// Hàm tiện ích lấy tên trạng thái
export function getTopicStatusText(statusCode: number): string {
  return TopicStatusText[statusCode as TopicStatusCode] || 'Không xác định'
}

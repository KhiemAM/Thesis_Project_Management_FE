// Định nghĩa mã số trạng thái dạng enum
export enum TopicStatusCode {
  REJECTED = 0,
  NOT_REGISTERED = 1,
  REGISTERED = 2,
  PENDING_APPROVAL = 3,
  COMPLETED = 4,
  CANCELLED = 5
}

// Định nghĩa tên trạng thái tương ứng theo mã
export const TopicStatusText: Record<TopicStatusCode, string> = {
  [TopicStatusCode.REJECTED]: 'Từ chối',
  [TopicStatusCode.NOT_REGISTERED]: 'Chưa được đăng ký',
  [TopicStatusCode.REGISTERED]: 'Đã đăng ký',
  [TopicStatusCode.PENDING_APPROVAL]: 'Chờ duyệt',
  [TopicStatusCode.COMPLETED]: 'Đã hoàn thành',
  [TopicStatusCode.CANCELLED]: 'Huỷ đăng ký'
}

// Hàm tiện ích (nếu cần dùng)
export function getTopicStatusText(statusCode: number): string {
  return TopicStatusText[statusCode as TopicStatusCode] || 'Không xác định'
}

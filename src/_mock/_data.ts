import {
  _id,
  _path,
  _MSSV,
  _price,
  _times,
  _email,
  _roleId,
  _company,
  _boolean,
  _content,
  _fullName,
  _roleName,
  _taskNames,
  _postTitles,
  _instructor,
  _description,
  _studentName,
  _groupTitles,
  _productNames,
  _functionName,
  _studentClass,
  _fullNameTopic,
  _studentGender,
  _nameCommittee,
  _majorCommittee,
  _roleDescription,
  _studentBirthday,
  _groupDescription,
  _userNameAdmin,
  _userTypeAdmin
} from './_mock'

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatar/avatar-25.webp'
}

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  company: _company(index),
  isVerified: _boolean(index),
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: index % 4 ? 'active' : 'banned',
  role:
    [
      '12DHTH03',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer'
    ][index] || 'UI Designer'
}))

export const _searchStudent = [...Array(9)].map((_, index) => ({
  id: _id(index),
  mssv: _MSSV(index),
  name: _studentName(index),
  class: _studentClass(index),
  gender: _studentGender(index),
  birthday: _studentBirthday(index)
}))

export const _topic = [...Array(24)].map((_, index) => ({
  id: _id(index),
  topicNumber: index + 1,
  status: index % 2 ? 'Chờ duyệt' : index % 3 ? 'Đã duyệt' : 'Từ chối',
  name: _fullNameTopic(index),
  content: _content(index),
  instructor: _instructor(index),
  email: _email(index),
  department:
    [
      'KTPM',
      'HTTT',
      'KHDL&TTNT',
      'HTTT',
      'MMT-ATTT',
      'MMT-ATTT',
      'KTPM',
      'HTTT',
      'KHDL&TTNT',
      'HTTT',
      'MMT-ATTT',
      'MMT-ATTT'
    ][index] || 'KTPM'
}))

export const _function = [...Array(7)].map((_, index) => ({
  id: _id(index),
  function: _functionName(index),
  path: _path(index),
  parentFunction: '',
  type: 'GROUP',
  status: index % 2 ? 'Hoạt động' : 'Ngừng hoạt động',
  children:
    [...Array(3)].map((__, childIndex) => (
      {
        id: _id(childIndex),
        function: _functionName(childIndex),
        path: _path(childIndex),
        parentFunction: '',
        type: 'API',
        status: childIndex % 2 ? 'Hoạt động' : 'Ngừng hoạt động'
      }
    ))
}))

export const _role = [...Array(7)].map((_, index) => ({
  id: _id(index),
  roleId: _roleId(index),
  roleName: _roleName(index),
  description: _roleDescription(index),
  status: index % 2 ? 'Hoạt động' : 'Ngừng hoạt động',
  function: _function[index].function
}))

export const _groupStudent = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _groupTitles(index),
  description: _groupDescription(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`
  }
}))

function getRandomTopics(topics: any[], count: number) {
  const shuffled = [...topics].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const _committee = [...Array(7)].map((_, index) => {
  const quantityTopic = Math.floor(Math.random() * 3) + 3 // ngẫu nhiên từ 3 đến 5
  const selectedTopics = getRandomTopics(_topic, quantityTopic)

  return {
    id: _id(index),
    name: _nameCommittee(index),
    major: _majorCommittee(index),
    quantityTopic: selectedTopics,
    quantityTeacher: 3,
    status: index % 2 ? 'Hoạt động' : 'Ngừng hoạt động'
  }
})

export const _usersAdmin = [...Array(24)].map((_, index) => ({
  id: _id(index),
  user_name: _userNameAdmin(index),
  is_active: _boolean(index),
  user_type: _userTypeAdmin(index),
  create_datetime: '2023-10-01T12:00:00Z',
  update_datetime: index % 4 ? '2023-10-02T12:00:00Z' : '2023-10-03T12:00:00Z'
}))

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`
  }
}))

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
]

export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    priceSale: setIndex % 3 ? null : _price(index),
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5].includes(setIndex) && 'sale') || ([4, 8, 12].includes(setIndex) && 'new') || ''
  }
})

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg'
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg'
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg'
  }
]

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346'
  ][index],
  type: `order${index + 1}`,
  time: _times(index)
}))

export const _traffic = [
  {
    value: 'facebook',
    label: 'Facebook',
    total: 19500
  },
  {
    value: 'google',
    label: 'Google',
    total: 91200
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    total: 69800
  },
  {
    value: 'twitter',
    label: 'Twitter',
    total: 84900
  }
]

export const _tasks = Array.from({ length: 5 }, (_, index) => ({
  id: _id(index),
  name: _taskNames(index)
}))

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: 'answered to your comment on the Minimal',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true
  },
  {
    id: _id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false
  },
  {
    id: _id(4),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false
  },
  {
    id: _id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false
  }
]

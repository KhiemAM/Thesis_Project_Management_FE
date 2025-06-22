import type { CardProps } from '@mui/material/Card'
import type { IconifyName } from 'src/components/iconify'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Tooltip, IconButton } from '@mui/material'

import { RouterLink } from 'src/routes/components'

import { Iconify } from 'src/components/iconify'
import { SvgColor } from 'src/components/svg-color'

import type { Group } from './types'

// ----------------------------------------------------------------------
export function PostItem({
  sx,
  post,
  ...other
}: CardProps & {
  post: Group;
}) {
  const leader = post.members.find((member) => member.is_leader === true)

  const renderAvatar = (
    <Avatar
      alt={leader?.full_name}
      src={leader?.avatarUrl}
      sx={{
        left: 24,
        zIndex: 9,
        bottom: -24,
        position: 'absolute'
      }}
    />
  )

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle1"
      underline="hover"
      component={RouterLink}
      href={`/group/information/${post.id}`}
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 1,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        cursor: 'pointer'
      }}
    >
      {post.name}
    </Link>
  )

  const renderDescription = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        color: 'text.disabled',
        overflow: 'hidden',
        WebkitLineClamp: 1,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical'
      }}
    >
      {post.members.length} thành viên
    </Typography>
  )

  const renderInfo = (
    <Box
      sx={{
        mt: 3,
        gap: 1.5,
        display: 'flex',
        flexWrap: 'wrap',
        color: 'text.disabled',
        justifyContent: 'flex-end'
      }}
    >
      {[
        { title: 'Xem thông tin nhóm', icon: 'solar:eye-bold', href: `/group/information/${post.id}` },
        { title: 'Xem tiến độ nhóm', icon: 'solar:checklist-minimalistic-bold-duotone', href: `/group/progress/${post.id}` }
      ].map((info, _index) => (
        <Box
          key={_index}
          sx={{
            display: 'flex'
          }}
        >
          <Tooltip title={info.title} arrow>
            <IconButton
              component={RouterLink}
              href={info.href}
              color='primary'
              sx={{ p: 0 }}
            >
              <Iconify icon={info.icon as IconifyName} />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
    </Box>
  )

  const renderCover = (
    <Box
      component="img"
      alt={post.name}
      src={post.coverImage}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute'
      }}
    />
  )

  const renderShape = (
    <SvgColor
      src="/assets/icons/shape-avatar.svg"
      sx={{
        left: 0,
        width: 88,
        zIndex: 9,
        height: 36,
        bottom: -16,
        position: 'absolute',
        color: 'background.paper'
      }}
    />
  )

  return (
    <Card sx={sx} {...other}>
      <Box
        sx={(theme) => ({
          position: 'relative',
          pt: 'calc(100% * 3 / 6)'
        })}
      >
        {renderShape}
        {renderAvatar}
        {renderCover}
      </Box>

      <Box
        sx={(theme) => ({
          p: theme.spacing(6, 3, 3, 3)
        })}
      >
        {renderTitle}
        {renderDescription}
        {renderInfo}
      </Box>
    </Card>
  )
}

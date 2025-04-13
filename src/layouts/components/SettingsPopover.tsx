import type { IconButtonProps } from '@mui/material/IconButton'

import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'

import { fToNow } from 'src/utils/format-time'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

// ----------------------------------------------------------------------

type SettingItemProps = {
  id: string;
  type: string;
  title: string;
  isUnRead: boolean;
  description: string;
  avatarUrl: string | null;
  postedAt: string | number | null;
};

export type SettingsPopoverProps = IconButtonProps & {
  data?: SettingItemProps[];
};

export function SettingsPopover({ data = [], sx, ...other }: SettingsPopoverProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  return (
    <IconButton
      // color={openPopover ? 'primary' : 'default'}
      // onClick={handleOpenPopover}
      sx={sx}
      {...other}
    >
      <Iconify width={24} icon="line-md:cog-filled-loop" />
    </IconButton>
  )
}

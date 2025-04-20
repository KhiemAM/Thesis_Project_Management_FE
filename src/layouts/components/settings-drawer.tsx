
import type { IconButtonProps } from '@mui/material/IconButton'

import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled, ButtonBase } from '@mui/material'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'


// ----------------------------------------------------------------------
const SwitchButton = styled(ButtonBase)(({ theme }) => ({

}))

export type SettingsDrawerProps = IconButtonProps
export function SettingsDrawer({ sx, ...other } : SettingsDrawerProps) {
  const [openSetting, setOpenSetting] = useState(false)

  const canReset = ''

  const onOpenSetting = useCallback(() => {
    setOpenSetting(true)
  }, [])

  const onCloseSetting = useCallback(() => {
    setOpenSetting(false)
  }, [])


  return (
    <>
      <IconButton
        color={openSetting ? 'primary' : 'default'}
        onClick={onOpenSetting}
        sx={sx}
        {...other}
      >
        <Iconify width={24} icon="line-md:cog-filled-loop" />
      </IconButton>

      <Drawer
        anchor="right"
        open={openSetting}
        onClose={onCloseSetting}
        slotProps={{
          paper: {
            sx: { width: 380, overflow: 'hidden' }
          }
        }}
      >
        <Box
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1.5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Setting
          </Typography>

          <IconButton onClick={() => {}}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>

          <IconButton onClick={onCloseSetting}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <SwitchButton >
              <Box>
                <Iconify icon="solar:cloudy-moon-bold" width={24} sx={{ mr: 1 }} />
                <Switch size="small" />
              </Box>
            </SwitchButton>
            <SwitchButton >
              Dark Mode
            </SwitchButton>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  )
}

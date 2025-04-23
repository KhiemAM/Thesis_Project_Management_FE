
import type { IconButtonProps } from '@mui/material/IconButton'

import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled, ButtonBase } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'


// ----------------------------------------------------------------------
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 22,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 4,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#177ddc'
        })
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 14,
    height: 14,
    borderRadius: 7,
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)'
    })
  }
}))

const SwitchButton = styled(ButtonBase)(({ theme }) => ({
  width: 148,
  padding: 'calc(2 * var(--spacing)) calc(2.5 * var(--spacing))',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderRadius: 16,
  border: 'solid 1px rgba(var(--palette-grey-500Channel) / 0.6)'
}))
// ----------------------------------------------------------------------

export type SettingsDrawerProps = IconButtonProps
export function SettingsDrawer({ sx, ...other } : SettingsDrawerProps) {
  const [openSetting, setOpenSetting] = useState(false)

  const [toggle, setToggle] = useState(false)

  const { mode, setMode } = useColorScheme()

  if (toggle) {
    setMode('dark')
  }

  if (!toggle) {
    setMode('light')
  }

  const handleToggleDarkMode = useCallback(() => {
    setToggle((prev) => !prev)
  }, [])

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
            sx: { width: 360, overflow: 'hidden' }
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
          <Stack spacing={2}
            direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap', p: 3 }}>
            <SwitchButton onClick={handleToggleDarkMode}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 'calc(3 * var(--spacing))' }}>
                <Iconify icon="solar:cloudy-moon-bold" width={24} />
                <AntSwitch checked={toggle}/>
              </Box>
              <Typography variant="button" >
                Dark Mode
              </Typography>
            </SwitchButton>

            <SwitchButton >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 'calc(3 * var(--spacing))' }}>
                <Iconify icon="solar:cloudy-moon-bold" width={24} />
                <AntSwitch />
              </Box>
              <Typography variant="button" >
                Dark Mode
              </Typography>
            </SwitchButton>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  )
}

import type { DrawerProps } from '@mui/material/Drawer'

import { styled } from '@mui/material/styles'
import Drawer, { drawerClasses } from '@mui/material/Drawer'

export const CustomDrawerStyled = styled(Drawer)<DrawerProps>(({ theme }) => ({
  [`& .${drawerClasses.paper}`]: {
    background: `linear-gradient(225deg, ${theme.palette.primary.main} -10%, ${theme.vars.palette.background.paper} 10%)`
  }
}))
import type { DrawerProps } from '@mui/material/Drawer'

import { mergeClasses } from 'minimal-shared/utils'

import { drawerClasses } from './classes'
import { CustomDrawerStyled } from './styles'


// ----------------------------------------------------------------------

export function Drawer({ children, ...other } : DrawerProps) {
  return (
    <CustomDrawerStyled
      className={mergeClasses([drawerClasses.root])}
      {...other}
    >
      {children}
    </CustomDrawerStyled>
  )
}
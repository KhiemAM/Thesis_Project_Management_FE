import type { DrawerProps } from '@mui/material/Drawer'

import { mergeClasses } from 'minimal-shared/utils'

import { styled } from '@mui/material/styles'

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

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  drawerWidth: number;
}>(({ theme, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: drawerWidth
      }
    }
  ]
}))
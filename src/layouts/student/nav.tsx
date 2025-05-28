import type { Theme, SxProps, Breakpoint } from '@mui/material/styles'

import { useEffect } from 'react'
import { varAlpha } from 'minimal-shared/utils'

import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import { useTheme } from '@mui/material/styles'
import { drawerClasses } from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'

import { RouterLink } from 'src/routes/components'
import { useRouter, usePathname } from 'src/routes/hooks'

import { useAppDispatch } from 'src/redux/hook'
import { logoutUserAPI } from 'src/redux/user/user-slice'

import { Logo } from 'src/components/logo'
import { Drawer } from 'src/components/drawer'
import { Scrollbar } from 'src/components/scrollbar'
import { AlertConfirmCallAPI } from 'src/components/sweetalert2'

import type { NavItem } from '../nav-config-student'

// ----------------------------------------------------------------------

export type NavContentProps = {
  navData: NavItem[];
  navBottomData: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  navData,
  navBottomData,
  slots,
  layoutQuery
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex'
        },
        ...sx
      }}
    >
      <NavContent navData={navData} navBottomData={navBottomData} slots={slots} />
    </Box>
  )
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  navData,
  navBottomData,
  open,
  slots,
  onClose
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  useEffect(() => {
    if (open) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx
        }
      }}
    >
      <NavContent navData={navData} navBottomData={navBottomData} slots={slots} />
    </Drawer>
  )
}

// ----------------------------------------------------------------------

export function NavContent({ navData, navBottomData, slots, sx }: NavContentProps) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    AlertConfirmCallAPI({
      title: 'Bạn có chắc chắn',
      text: 'Bạn có muốn đăng xuất không?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Oke, đăng xuất',
      cancelButtonText:'Không',
      api: () => {
        dispatch(logoutUserAPI())
        router.push('/login')
      }
    })
  }

  return (
    <>
      <Logo />

      {slots?.topArea}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              justifyContent: 'space-between',
              py: 3
            },
            ...(Array.isArray(sx) ? sx : [sx])
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {navData.map((item) => {
              const isActived = item.path === pathname

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  <ListItemButton
                    disableGutters
                    component={RouterLink}
                    href={item.path}
                    sx={[
                      (theme) => ({
                        pl: 2,
                        py: 1,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightMedium',
                        color: theme.vars.palette.text.secondary,
                        minHeight: 44,
                        ...(isActived && {
                          fontWeight: 'fontWeightSemiBold',
                          color: theme.vars.palette.primary.main,
                          bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                          '&:hover': {
                            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16)
                          }
                        })
                      })
                    ]}
                  >
                    <Box component="span" sx={{ width: 24, height: 24 }}>
                      {item.icon}
                    </Box>

                    <Box component="span" sx={{ flexGrow: 1 }}>
                      {item.title}
                    </Box>

                    {item.info && item.info}
                  </ListItemButton>
                </ListItem>
              )
            })}
          </Box>

          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {navBottomData.map((item) => {
              const isActived = item.path === pathname

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  {item.isConfirmDialog ? (
                    <ListItemButton
                      disableGutters
                      onClick={handleLogout}
                      sx={[
                        (theme) => ({
                          pl: 2,
                          py: 1,
                          gap: 2,
                          pr: 1.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          fontWeight: 'fontWeightMedium',
                          color: theme.vars.palette.text.secondary,
                          minHeight: 44,
                          ...(isActived && {
                            fontWeight: 'fontWeightSemiBold',
                            color: theme.vars.palette.primary.main,
                            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                            '&:hover': {
                              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16)
                            }
                          })
                        })
                      ]}
                    >
                      <Box component="span" sx={{ width: 24, height: 24 }}>
                        {item.icon}
                      </Box>

                      <Box component="span" sx={{ flexGrow: 1 }}>
                        {item.title}
                      </Box>

                      {item.info && item.info}
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={item.path}
                      sx={[
                        (theme) => ({
                          pl: 2,
                          py: 1,
                          gap: 2,
                          pr: 1.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          fontWeight: 'fontWeightMedium',
                          color: theme.vars.palette.text.secondary,
                          minHeight: 44,
                          ...(isActived && {
                            fontWeight: 'fontWeightSemiBold',
                            color: theme.vars.palette.primary.main,
                            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                            '&:hover': {
                              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16)
                            }
                          })
                        })
                      ]}
                    >
                      <Box component="span" sx={{ width: 24, height: 24 }}>
                        {item.icon}
                      </Box>

                      <Box component="span" sx={{ flexGrow: 1 }}>
                        {item.title}
                      </Box>

                      {item.info && item.info}
                    </ListItemButton>
                  )}
                </ListItem>
              )
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  )
}

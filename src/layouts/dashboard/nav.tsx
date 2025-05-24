import type { Theme, SxProps, Breakpoint } from '@mui/material/styles'

import { useState, useEffect } from 'react'
import { matchPath } from 'react-router-dom'
import { varAlpha } from 'minimal-shared/utils'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import { useTheme } from '@mui/material/styles'
import { drawerClasses } from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'

import { usePathname } from 'src/routes/hooks'
import { RouterLink } from 'src/routes/components'

import { Logo } from 'src/components/logo'
import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

// import { NavUpgrade } from '../components/nav-upgrade';
import { WorkspacesPopover } from '../components/workspaces-popover'

import type { NavItem } from '../nav-config-dashboard'
import type { WorkspacesPopoverProps } from '../components/workspaces-popover'


// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
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
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  )
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces
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
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  )
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const handleClick = (key: string, hasChildren: boolean, event: React.MouseEvent) => {
    if (hasChildren) {
      event.preventDefault()
      setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
    }
  }

  return (
    <>
      <Logo />

      {slots?.topArea}

      <WorkspacesPopover data={workspaces} sx={{ my: 2 }} />

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column'
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
            {data.map((item) => {
              const match = (path: string) =>
                !!matchPath({ path, end: path === '/' }, pathname)
              const isAnyChildActive = item.children?.some((child) => match(child.path))
              const isActived = match(item.path) || isAnyChildActive
              const isOpen = openItems[item.title] || false
              return (
                <ListItem disableGutters disablePadding key={item.title} sx={{ display: 'block' }}>
                  <ListItemButton
                    disableGutters
                    component={RouterLink}
                    href={item.path}
                    onClick={(event) => handleClick(item.title, !!item.children, event)}
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
                    {item.children && (isOpen ? (<Iconify icon='solar:alt-arrow-down-line-duotone'/>) : (<Iconify icon='solar:alt-arrow-right-line-duotone'/>))}
                  </ListItemButton>
                  {item.children && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx={{ pl: 5 }}>
                        {item.children.map((child) => {
                          const isChildActived = match(child.path)
                          return (
                            <Box key={child.title} sx={{ my: 1 }}>
                              <ListItemButton
                                component={RouterLink}
                                href={child.path}
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
                                    ...(isChildActived && {
                                      fontWeight: 'fontWeightSemiBold',
                                      color: theme.vars.palette.primary.main,
                                      bgcolor: theme.vars.palette.action.hover
                                    })
                                  })
                                ]}
                              >
                                <Box component="span" sx={{ flexGrow: 1 }}>
                                  {child.title}
                                </Box>
                              </ListItemButton>
                            </Box>
                          )
                        })}
                      </List>
                    </Collapse>
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

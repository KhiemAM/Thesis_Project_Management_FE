import type { Breakpoint } from '@mui/material/styles'

import { merge } from 'es-toolkit'
import { useBoolean } from 'minimal-shared/hooks'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material/styles'

import { NavMobile, NavDesktop } from './nav'
import { layoutClasses } from '../core/classes'
import { dashboardLayoutVars } from './css-vars'
import { MainSection } from '../core/main-section'
import { MenuButton } from '../components/menu-button'
import { HeaderSection } from '../core/header-section'
import { LayoutSection } from '../core/layout-section'
import { navData, navBottomData } from '../nav-config-student'
import { SettingsDrawer } from '../components/settings-drawer'
import { AccountPopover } from '../components/account-popover'
import { _accountStudent } from '../nav-config-account-student'

import type { MainSectionProps } from '../core/main-section'
import type { HeaderSectionProps } from '../core/header-section'
import type { LayoutSectionProps } from '../core/layout-section'

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function StudentLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg'
}: DashboardLayoutProps) {
  const theme = useTheme()

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean()

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false
      }
    }

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          />
          <NavMobile navData={navData} navBottomData={navBottomData} open={open} onClose={onClose} />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/** @slot Settings popover */}
          <SettingsDrawer />

          {/** @slot Account drawer */}
          <AccountPopover data={_accountStudent} />
        </Box>
      )
    }

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    )
  }

  const renderFooter = () => null

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop navData={navData} navBottomData={navBottomData} layoutQuery={layoutQuery} />
      }
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)'
              })
            }
          }
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {renderMain()}
    </LayoutSection>
  )
}

import type { Theme } from '@mui/material/styles'

import { createTheme as createMuiTheme } from '@mui/material/styles'

import { shadows } from './core/shadows'
import { palette } from './core/palette'
import { themeConfig } from './theme-config'
import { components } from './core/components'
import { typography } from './core/typography'
import { customShadows } from './core/custom-shadows'

import type { ThemeOptions } from './types'

// ----------------------------------------------------------------------

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

export const baseTheme: ThemeOptions = {
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  defaultColorScheme: 'dark',
  colorSchemes: {
    light: {
      palette: palette.light,
      shadows: shadows.light,
      customShadows: customShadows.light
    }
  },
  components,
  typography,
  shape: { borderRadius: 8 },
  cssVariables: themeConfig.cssVariables
}

// ----------------------------------------------------------------------

type CreateThemeProps = {
  themeOverrides?: ThemeOptions;
};

export function createTheme({ themeOverrides = {} }: CreateThemeProps = {}): Theme {
  const theme = createMuiTheme(baseTheme, themeOverrides)

  return theme
}

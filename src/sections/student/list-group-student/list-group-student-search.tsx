import type { Theme, SxProps } from '@mui/material/styles'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'

import { Iconify } from 'src/components/iconify'

import type { Group } from './types'

// ----------------------------------------------------------------------

type PostSearchProps = {
  posts: Group[];
  sx?: SxProps<Theme>;
};

export function PostSearch({ posts, sx }: PostSearchProps) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2'
            },
            ...sx
          }
        }
      }}
      options={posts}
      getOptionLabel={(post) => post.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Tìm kiếm tên nhóm..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                  />
                </InputAdornment>
              )
            }
          }}
        />
      )}
    />
  )
}

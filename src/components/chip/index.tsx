import React from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Iconify } from '../iconify'

import type { ChipData, ChipsFilter, ChipsArrayFilterProps } from './types'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}))

export default function ChipsArrayFilter({ chipData, handleDeleteChipData, handleClearFilter } : ChipsArrayFilterProps) {

  const handleDelete = (chipToDelete: ChipData) => () => {
    // Tìm loại chip nào chứa dữ liệu cần xóa
    const newChipsFilter = { ...chipData }

    // Duyệt qua tất cả các loại chip
    Object.keys(newChipsFilter).forEach((key) => {
      const section = newChipsFilter[key as keyof ChipsFilter]

      // Lọc ra những chip không bị xóa
      section.data = section.data.filter((chip) => chip.key !== chipToDelete.key)
    })

    // Cập nhật lại state bằng hàm handleChipData
    handleDeleteChipData(newChipsFilter)
  }

  if (chipData.filterSearch.data.length === 0 &&
      (chipData.filterTab.data.length === 0 || chipData.filterTab.data[0].label === 'Tất cả') &&
      chipData.filterSelect.data.length === 0
  ) return null

  return (
    <>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          mx: 3,
          mb: 3,
          p: 0.5,
          border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
          borderRadius: 1
        }}
        component="ul"
      >
        {Object.keys(chipData).map((key) => {
          const section = chipData[key as keyof ChipsFilter]
          return (
            <React.Fragment key={key}>
              {section.data.length > 0 && <Typography variant='subtitle2' sx={{ px: 1 }}>{section.display}:</Typography>}
              {section.data.map((data) => (
                <ListItem key={data.key}>
                  <Chip
                    size="small"
                    label={data.label}
                    onDelete={handleDelete(data)}
                  />
                </ListItem>
              ))}
            </React.Fragment>
          )
        })}
      </Box>
      <Button
        color="error"
        startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        onClick={handleClearFilter}
      >
        Hủy bỏ
      </Button>
    </>
  )
}

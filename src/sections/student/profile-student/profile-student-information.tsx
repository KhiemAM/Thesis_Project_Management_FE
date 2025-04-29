import type {
  SelectChangeEvent
} from '@mui/material'

import React, { useState } from 'react'

import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl
} from '@mui/material'

interface ProfileStudentInformationProps {
  initialValues?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  onSave?: (values: any) => void;
}

const ProfileStudentInformation: React.FC<ProfileStudentInformationProps> = ({
  initialValues = {
    firstName: 'Nathaniel',
    lastName: 'Poole',
    email: 'nathaniel.poole@microsoft.com',
    phone: '+1800-000-0000',
    city: 'Bridgeport',
    state: 'NA',
    postcode: '31005',
    country: 'United States'
  },
  onSave
}) => {
  const [values, setValues] = useState(initialValues)
  const [isEditing, setIsEditing] = useState(false)
  console.log('🚀 ~ isEditing:', isEditing)

  // Hàm xử lý sự kiện thay đổi cho TextField
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  // Hàm xử lý sự kiện thay đổi cho Select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(values)
    }
    // setIsEditing(false)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ py: 3 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleTextFieldChange}
            fullWidth
            variant="outlined"
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleTextFieldChange}
            fullWidth
            variant="outlined"
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Phone Number"
            name="phone"
            value={values.phone}
            onChange={handleTextFieldChange}
            fullWidth
            variant="outlined"
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Email address"
            name="email"
            value={values.email}
            onChange={handleTextFieldChange}
            fullWidth
            variant="outlined"
            disabled={!isEditing}
            type="email"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="City"
            name="city"
            value={values.city}
            onChange={handleTextFieldChange}
            fullWidth
            variant="outlined"
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="State/County"
            name="state"
            value={values.state}
            onChange={handleTextFieldChange}
            fullWidth
            variant="outlined"
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Postcode"
            name="postcode"
            value={values.postcode}
            onChange={handleTextFieldChange}
            fullWidth
            variant="outlined"
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              name="country"
              value={values.country}
              onChange={handleSelectChange}
              label="Country"
              disabled={!isEditing}
            >
              <MenuItem value="United States">United States</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
            {isEditing ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  minWidth: 120,
                  transition: 'all 0.2s ease'
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{
                  minWidth: 120,
                  transition: 'all 0.2s ease'
                }}
              >
                Edit
              </Button>
            )}
            {isEditing && (
              <Button
                variant="outlined"
                onClick={() => {
                  setValues(initialValues)
                  setIsEditing(false)
                }}
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileStudentInformation
import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import { Iconify } from 'src/components/iconify'

import { useTodo } from './todo-context'

import type { Result } from './types'

interface ResultSectionProps {
  todoId: string;
  results: Result[];
}

const ResultSection: React.FC<ResultSectionProps> = ({ todoId, results }) => {
  const { addResult, deleteResult } = useTodo()
  const [resultType, setResultType] = useState<'text' | 'image'>('text')
  const [resultContent, setResultContent] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (resultContent.trim()) {
      addResult(todoId, resultType, resultContent)
      setResultContent('')
      setShowForm(false)
    }
  }

  const handleDelete = (resultId: string) => {
    deleteResult(todoId, resultId)
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const textResults = results.filter(result => result.type === 'text')
  const imageResults = results.filter(result => result.type === 'image')

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Results ({results.length})
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Iconify icon='solar:check-circle-bold' />}
          onClick={() => setShowForm(!showForm)}
        >
          Add Result
        </Button>
      </Box>

      <Fade in={showForm}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mb: 3,
            p: 2,
            border: '1px solid #e5e7eb',
            borderRadius: 2,
            display: showForm ? 'block' : 'none'
          }}
        >
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="result-type-label">Result Type</InputLabel>
            <Select
              labelId="result-type-label"
              id="result-type"
              value={resultType}
              label="Result Type"
              onChange={(e) => setResultType(e.target.value as 'text' | 'image')}
              size="small"
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="image">Image URL</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            placeholder={resultType === 'text' ? 'Enter text result...' : 'Enter image URL...'}
            fullWidth
            multiline={resultType === 'text'}
            rows={resultType === 'text' ? 3 : 1}
            value={resultContent}
            onChange={(e) => setResultContent(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="text"
              color="inherit"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!resultContent.trim()}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Fade>

      {results.length > 0 ? (
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              aria-label="result tabs"
            >
              <Tab
                icon={<Iconify icon='solar:check-circle-bold' />}
                label={`Text (${textResults.length})`}
                id="tab-0"
                aria-controls="tabpanel-0"
                sx={{ textTransform: 'none' }}
              />
              <Tab
                icon={<Iconify icon='solar:check-circle-bold' />}
                label={`Images (${imageResults.length})`}
                id="tab-1"
                aria-controls="tabpanel-1"
                sx={{ textTransform: 'none' }}
              />
            </Tabs>
          </Box>

          <Box
            role="tabpanel"
            hidden={tabValue !== 0}
            id="tabpanel-0"
            aria-labelledby="tab-0"
          >
            {tabValue === 0 && (
              <Box>
                {textResults.length > 0 ? (
                  textResults.map((result) => (
                    <Card
                      key={result.id}
                      sx={{
                        mb: 2,
                        position: 'relative',
                        border: '1px solid #e5e7eb',
                        boxShadow: 'none'
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="body2" whiteSpace="pre-wrap">
                          {result.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Added on {formatDate(result.createdAt)}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(result.id)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            opacity: 0.6,
                            '&:hover': { opacity: 1 }
                          }}
                        >
                          <Iconify icon='solar:check-circle-bold' />
                        </IconButton>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      backgroundColor: '#f9fafb',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No text results added yet.
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box
            role="tabpanel"
            hidden={tabValue !== 1}
            id="tabpanel-1"
            aria-labelledby="tab-1"
          >
            {tabValue === 1 && (
              <Box>
                {imageResults.length > 0 ? (
                  <Grid container spacing={2}>
                    {imageResults.map((result) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={result.id}>
                        <Card
                          sx={{
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: 'none',
                            border: '1px solid #e5e7eb'
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={result.content}
                            alt="Task result"
                            sx={{
                              height: 140,
                              objectFit: 'cover'
                            }}
                          />
                          <CardContent sx={{ p: 1.5, pt: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Added on {formatDate(result.createdAt)}
                            </Typography>
                          </CardContent>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(result.id)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              opacity: 0.8,
                              '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                            }}
                          >
                            <Iconify icon='solar:check-circle-bold' />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      backgroundColor: '#f9fafb',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No image results added yet.
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No results added yet. Add some to track your progress!
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default ResultSection
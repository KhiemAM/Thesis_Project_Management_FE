import { toast } from 'react-toastify'
import { useState, useCallback } from 'react'

import {
  Box,
  Button,
  Avatar,
  useTheme,
  Typography
} from '@mui/material'

import inviteApi from 'src/axios/invite'

import type { Invite } from './types'

interface InviteCardProps {
  invite: Invite;
  onOpenInformation: () => void;
  typeInvite: 'received_invites' | 'sent_invites';
}

const InviteCard = ({ invite, onOpenInformation, typeInvite } : InviteCardProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAccepted, setIsAccepted] = useState(invite.status === 2)
  const [isRejected, setIsRejected] = useState(invite.status === 3)
  const [isHovered, setIsHovered] = useState(false)
  const theme = useTheme()
  const [loadingButton, setLoadingButton] = useState(false)

  const handleRevokeInvite = useCallback(async() => {
    try {
      setLoadingButton(true)
      await inviteApi.revokeInvite(invite.id)
      toast.success('Hủy lời mời thành công')
      setIsVisible(true)
    } finally {
      setLoadingButton(false)
    }
  }, [invite.id])

  const handleRejectInvite = useCallback(async() => {
    try {
      setLoadingButton(true)
      await inviteApi.rejectInvite(invite.id)
      toast.success('Từ chối lời mời thành công')
      setIsRejected(true)
    } finally {
      setLoadingButton(false)
    }
  }, [invite.id])

  const handleAcceptInvite = useCallback(async() => {
    try {
      setLoadingButton(true)
      await inviteApi.acceptInvite(invite.id)
      toast.success('Xác nhận lời mời thành công')
      setIsAccepted(true)
    } finally {
      setLoadingButton(false)
    }
  }, [invite.id])

  if (isVisible) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
        borderRadius: '16px',
        mb: 3,
        '&:hover': {
          backgroundColor: theme.vars.palette.action.hover,
          borderColor: theme.vars.palette.primary.main,
          cursor: 'pointer'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        src="/assets/images/avatar/avatar-1.webp"
        alt={invite.receiver.full_name}
        sx={{
          width: 48,
          height: 48,
          marginRight: 2,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={onOpenInformation}
      />
      { typeInvite === 'received_invites' ? (
        <Box sx={{ flex: 1, minWidth: 0 }} onClick={onOpenInformation}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 0.5
          }}>
            <Typography
              variant="h5"
              sx={{
                '&:hover': {
                  color: theme.vars.palette.primary.main
                }
              }}
            >
              {invite.sender.student_code}
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
          >
            {invite.sender.full_name}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1, minWidth: 0 }} onClick={onOpenInformation}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 0.5
          }}>
            <Typography
              variant="h5"
              sx={{
                '&:hover': {
                  color: theme.vars.palette.primary.main
                }
              }}
            >
              {invite.receiver.student_code}
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
          >
            {invite.receiver.full_name}
          </Typography>
        </Box>
      )}

      <Box sx={{ ml: 2, display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        {typeInvite === 'received_invites' ? (
          <>
            <Button
              variant={isAccepted ? 'outlined' : 'contained'}
              loading={loadingButton}
              loadingPosition="start"
              onClick={handleAcceptInvite}
              disabled={isAccepted}
              sx={{
                display: isRejected ? 'none' : 'inline-flex',
                minWidth: '100px',
                fontWeight: 700,
                backgroundColor: isAccepted ? 'transparent' : undefined,
                color: isAccepted ? theme.palette.text.primary : undefined,
                borderColor: isAccepted ? theme.palette.text.primary : undefined,
                '&:hover': {
                  backgroundColor: isAccepted
                    ? theme.palette.action.hover
                    : theme.palette.primary.dark
                },
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {isAccepted ? 'Đã xác nhận' : 'Xác nhận'}
            </Button>
            <Button
              variant="outlined"
              loading={loadingButton}
              loadingPosition="start"
              onClick={handleRejectInvite}
              disabled={isRejected}
              sx={{
                display: isAccepted ? 'none' : 'inline-flex',
                minWidth: '100px',
                fontWeight: 700,
                borderColor: theme.palette.error.main,
                color: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: theme.palette.error.main + '15',
                  borderColor: theme.palette.error.main
                },
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {isRejected ? 'Đã từ chối' : 'Từ chối'}
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            loading={loadingButton}
            loadingPosition="start"
            onClick={handleRevokeInvite}
            disabled={isAccepted || isRejected}
            sx={{
              minWidth: '100px',
              fontWeight: 700,
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.main + '15',
                borderColor: theme.palette.error.main
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            { isAccepted ? 'Đã xác nhận' : isRejected ? 'Đã từ chối' : 'Hủy lời mời' }
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default InviteCard
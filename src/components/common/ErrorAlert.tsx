'use client'
import React, { useEffect } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { useErrorStore } from '@/store/errorStore'

function Alert() {
  const useError = useErrorStore((state) => state)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (useError.error.message) {
      enqueueSnackbar(useError.error.message, { variant: useError.error.type })
      useError.setAlert({ message: '' })
    }
  }, [useError.error.message])

  return null
}

const ErrorAlert = () => {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} preventDuplicate autoHideDuration={3000}>
      <Alert />
    </SnackbarProvider>
  )
}

export default ErrorAlert

import type { ReactNode } from 'react'

import { useState, useContext, createContext } from 'react'

import Loading from './loading'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const value: LoadingContextType = {
    isLoading,
    setIsLoading
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Loading loading={isLoading} />
    </LoadingContext.Provider>
  )
}

export default LoadingProvider

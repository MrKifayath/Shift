'use client'

import { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Simple theme provider implementation
  // In a real app, you'd use next-themes or implement proper theme switching
  return <>{children}</>
}
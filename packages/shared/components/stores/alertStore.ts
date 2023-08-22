import create from 'zustand'
import { ReactNode } from 'react'
import { Nullable } from '@/types/common'

export type AlertButton = {
  text: string,
  color?: string,
  onClick: () => void,
  version?: string
  isDisabled?: boolean
}

type AlertState = {
  copy: string
  children: Nullable<ReactNode>
  buttons: AlertButton[]
  isOpen: boolean
  onClose: () => void
  isIntegrationError: boolean
  setCopy: (copy: string) => void
  setChildren: (children: ReactNode) => void
  setButtons: (buttons: AlertButton[]) => void
  setOnClose: (onClose: () => void) => void
  setIsIntegrationError: (isIntegrationError: boolean) => void
  open: () => void
  close: (shouldCallOnClose: boolean) => void
}

const useAlertStore = create<AlertState>((set) => ({
  copy: '',
  children: null,
  buttons: [],
  isOpen: false,
  isIntegrationError: false,
  onClose: () => {},
  setCopy: (copy) => set({ copy }),
  setChildren: (children) => set({ children }),
  setButtons: (buttons) => set({ buttons }),
  setOnClose: (onClose) => set({ onClose }),
  setIsIntegrationError: (isIntegrationError) => set({ isIntegrationError }),
  open: () => set({ isOpen: true }),
  close: (shouldCallOnClose = true) => {
    set((state) => {
      const { onClose = () => {} } = state
      if (shouldCallOnClose) {
        onClose()
      }
      return { isOpen: false }
    })
  },
}))

export default useAlertStore

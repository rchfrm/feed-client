import create from 'zustand'

/*
  @param {string} copy (the text that appears above the warning)
  @param {node} children (the elements that appear in the alert)
  @param {array<object>} buttons (array of button configs)
  @param {boolean} isOpen
*/

/*
* EXAMPLE BUTTONS
buttons: [
  {
    text: 'Ok',
    onClick: 'dismiss',
    color: 'black',
  }
  {
    text: 'Ok',
    onClick: () => { console.log('how are you?') },
    color: 'black',
  }
]
*/

const defaultState = {
  copy: '',
  children: null,
  buttons: [],
  isOpen: false,
}

const [alertStore] = create(set => ({
  copy: defaultState.copy,
  children: defaultState.children,
  buttons: defaultState.buttons,
  isOpen: defaultState.isOpen,
  setCopy: (copy) => set({ copy }),
  setChildren: (children) => set({ children }),
  setButtons: (buttons) => set({ buttons }),
  open: () => set({ isOpen: true }),
  close: () => set(defaultState),
}))

export default alertStore

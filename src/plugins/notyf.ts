// Create an instance of Notyf
import { Notyf } from 'notyf'

export const notify: Notyf = new Notyf({
  dismissible: true,
  position: {
    x: 'right',
    y: 'top'
  },
  types: [
    {
      type: 'info',
      background: 'blue',
      icon: false
    }
  ]
})

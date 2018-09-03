import * as Visibility from 'visibilityjs'

const isSupported = document.hidden !== undefined
const ids = []
let timerState = 'visible'

export const VisibilityStop = Visibility.stop
export function VisibilityClear () {
  ids.forEach(id => {
    Visibility.stop(id)
  })
}
export function VisibilityChange (callback) {
  if (isSupported) {
    Visibility.change((e, state) => {
      callback(state)
    })
    return false
  }
  const id = Visibility.every(1000, 1000, () => {
    let state = Visibility.hidden() ? 'hidden' : 'visible'
    if (state === 'hidden' && timerState === 'visible') {
      callback('hidden')
      timerState = 'hidden'
    } else if (state === 'visible' && timerState === 'hidden') {
      callback('visible')
      timerState = 'visible'
    }
  })
  ids.push(id)
  return id
}

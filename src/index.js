import * as Visibility from 'visibilityjs'

const isSupported = document.hidden !== undefined
let ids = []
let timerState = 'visible'

export function VisibilityStop (id) {
  let index = ids.findIndex(v => v === id)
  if (index !== -1) {
    ids.splice(index, 1) // 删除 id
  }
  if (isSupported) {
    return Visibility.unbind(id)
  }
  return Visibility.stop(id)
}
export function VisibilityClear () {
  ids.forEach(id => {
    VisibilityStop(id)
  })
}
export function VisibilityChange (callback) {
  if (isSupported) {
    const id = Visibility.change((e, state) => {
      callback(state)
    })
    ids.push(id)
    return id
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

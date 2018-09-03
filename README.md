# visibility-wrapper
A wrapper use for visilibity-js

## Usage
```js
import { VisibilityChange, VisibilityStop } from 'visibility-wrapper'

VisibilityChange((state) => {
  console.log(state)
})

// if browser do not support Visibility API, it will use Visibility.every from visivility-js, and return its timer id, don't forget to clear it when your page is destroyed

const id = VisibilityChange((state) => {
  console.log(state)
})

// when page is destroyed
VisibilityStop(id)
```

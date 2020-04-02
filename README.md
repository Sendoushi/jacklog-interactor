# JackLog.io library interactor

## Getting Started

1. Install the project (using `npm`): 
```
npm install --save jacklog-interactor
```

2. Require the file on your project (using a bundler like `webpack`):
```js
const jacklog = require('jacklog-interactor');
```

3. Send an action:
```js
const action = {
  name: 'super-awesome-action-event',
  // properties is not required but when in, it needs to be an object
  properties: {
    // you can send here whatever you want...
    userId: 'zed'
  }
};

// since the system debounces, send action promise resolve
// will return all the actions that went through
const sentActions = await jacklog.sendAction(
  action.name,
  action.properties
);
```

## Development

### Prerequisites

- [node.js](https://nodejs.org/en/)

### Install dependencies

```
npm install
```

### Test

```
npm test
```

### Build (dev mode)

```
npm run build
```

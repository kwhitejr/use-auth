# UseAuth Hook
[Source code](./src/use-auth.js) and [test](./__tests__/use-auth.test.jsx) for a React useAuth hook implemented with [AWS Amplify Auth](https://www.npmjs.com/package/@aws-amplify/auth).

## Usage

```javascript
// AppRoot.jsx
import React from 'react';

import App from './app'; // uses <MyComponent />
import { ProvideAuth } from './use-auth';

return (
  <ProvideAuth>
    <App />
  </ProvideAuth>
);

// MyComponent.jsx
import React from 'react';

import { useAuth } from './use-auth';

function MyComponent() {
  const { isSignedIn, user, signIn, signOut } = useAuth();

  return (
    <div>
      <div>{`IsSignedIn: ${isSignedIn}`}</div>
      <div>{`Username: ${user?.username}`}</div>
      {isSignedIn ? (
        <button onClick={signOut} type="button">Sign Out</button>
      ) : (
        <button onClick={signIn} type="button">Sign In</button>
      )}
    </div>
  )
};
```

## Run Tests
```javascript
npm install && npm run test
```

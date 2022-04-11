# use-auth
Source code and test for a React useAuth hook implemented with AWS Cognito.

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

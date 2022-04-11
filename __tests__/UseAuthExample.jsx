import React from 'react';
import { ProvideAuth, useAuth } from '../src/use-auth';

function TestComponent() {
  const {
    user,
    isSignedIn,
    signIn,
    signOut,
  } = useAuth();

  const handleSignIn = () => {
    const mockCreds = {
      email: 'user@email.com',
      password: 'pw',
    }

    signIn(mockCreds);
  }

  const handleSignOut = () => signOut()

  return (
    <div>
      <div>{`IsSignedIn: ${isSignedIn}`}</div>
      <div>{`Username: ${user?.username}`}</div>
      <div>{`AccessToken: ${user?.accessToken}`}</div>
      <button onClick={handleSignIn} type="button">SignInButton</button>
      <button onClick={handleSignOut} type="button">SignOutButton</button>
    </div>
  );
}

function UseAuthExample() {
  return (
    <ProvideAuth>
      <TestComponent />
    </ProvideAuth>
  );
}

export { UseAuthExample }; // eslint-disable-line

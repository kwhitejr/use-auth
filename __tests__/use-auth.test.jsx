import React from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import { Auth } from '@aws-amplify/auth';

import { UseAuthExample } from './UseAuthExample';

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide default values on load when user is not authenticated', () => {
    const currentSessionMock = jest.fn().mockRejectedValue('No user found.');
    Auth.currentSession = currentSessionMock;

    render(<UseAuthExample />);

    const isSignedIn = screen.getByText(/issignedin/i);
    const username = screen.getByText(/username/i);
    const accessToken = screen.getByText(/accesstoken/i);

    expect(isSignedIn).toHaveTextContent('IsSignedIn: false');
    expect(username).toHaveTextContent('Username:');
    expect(accessToken).toHaveTextContent('AccessToken:');
  });

  it('should provide current user on load when current session is found', async () => {
    const currentSessionMock = jest.fn().mockResolvedValue({
      idToken: {
        payload: {
          email: 'user@email.com',
          preferred_username: 'myuser',
          sub: '1234-abcd',
        },
      },
      accessToken: {
        jwtToken: 'fake-token',
      },
    });
    Auth.currentSession = currentSessionMock;

    await act(async () => {
      render(<UseAuthExample />);
    });

    const isSignedIn = screen.getByText(/issignedin/i);
    const username = screen.getByText(/username/i);
    const accessToken = screen.getByText(/accesstoken/i);

    expect(isSignedIn).toHaveTextContent('IsSignedIn: true');
    expect(username).toHaveTextContent('Username: myuser');
    expect(accessToken).toHaveTextContent('AccessToken: fake-token');
  });

  it('should login the user and update ui', async () => {
    const currentSessionMock = jest.fn().mockRejectedValue('No user found.');
    const signInMock = jest.fn().mockResolvedValue({
      attributes: {
        email: 'user@email.com',
        preferred_username: 'myuser',
        sub: '1234-abcd',
      },
      signInUserSession: {
        accessToken: {
          jwtToken: 'fake-token',
        },
      },
    });
    Auth.currentSession = currentSessionMock;
    Auth.signIn = signInMock;

    render(<UseAuthExample />);

    const isSignedIn = screen.getByText(/issignedin/i);
    const username = screen.getByText(/username/i);
    const accessToken = screen.getByText(/accesstoken/i);

    expect(isSignedIn).toHaveTextContent('IsSignedIn: false');
    expect(username).toHaveTextContent('Username:');
    expect(accessToken).toHaveTextContent('AccessToken:');

    const signInButton = screen.getByText(/signinbutton/i);

    await act(async () => {
      fireEvent.click(signInButton);
    });

    expect(isSignedIn).toHaveTextContent('IsSignedIn: true');
    expect(username).toHaveTextContent('Username: myuser');
    expect(accessToken).toHaveTextContent('AccessToken: fake-token');
  });
});

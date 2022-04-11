import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import { Auth } from '@aws-amplify/auth';

// Implement your particular AWS Amplify configuration
const amplifyConfigurationOptions = {
  userPoolRegion: "REGION",
  userPoolId: "POOL_ID",
  userPoolWebClientId: "CLIENT_ID",
};

Auth.configure(amplifyConfigurationOptions);

const AuthContext = createContext();

// Wrap your app with <ProvideAuth />
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Access auth values and functions with custom useAuth hook
export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // NOTE: check for user or risk an infinite loop
    if (!user) {
      // On component mount
      // If a session cookie exists
      // Then use it to reset auth state
      Auth.currentSession()
        .then((session) => {
          const {
            idToken,
            accessToken,
          } = session;

          // Define your user schema per your needs
          const user = {
            email: idToken.payload.email,
            username: idToken.payload.preferred_username,
            userId: idToken.payload.sub,
            accessToken: accessToken.jwtToken,
          };

          setIsSignedIn(true);
          setUser(user);
        })
        .catch((err) => {
          // handle it
        });
    }
  }, [user]);

  const signIn = ({ email, password }) => Auth.signIn(email, password)
    .then((cognitoUser) => {
      // Set user data and access token to memory
      const {
        attributes,
        signInUserSession: {
          accessToken,
        },
      } = cognitoUser;

      const user = {
        email: attributes.email,
        username: attributes.preferred_username,
        userId: attributes.sub,
        accessToken: accessToken.jwtToken,
      };

      setIsSignedIn(true);
      setUser(user);

      return user;
    });

  const signOut = () => Auth.signOut()
    .then(() => {
      setIsSignedIn(false);
      setUser(null);
    });

  return {
    user,
    isSignedIn,
    signIn,
    signOut,
  };
}

import React, { useState, useEffect, useContext, createContext } from "react";
import { app, auth } from "@/lib/firebase";
import { signOut, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { createUser } from "@/lib/db";
import cookie from "js-cookie";
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      // db doesn't store token, only user info
      createUser(user.uid, userWithoutToken);

      setLoading(false);

      // app state and server stores token as well
      setUser(user);

      // set cookie
      cookie.set("remarkradar-auth", true, { sameSite: "Strict", expires: 1 });
      return user;
    } else {
      setLoading(false);
      setUser(false);
      cookie.remove("remarkradar-auth");
      return false;
    }
  };

  const signinWithGithub = async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      return handleUser(response.user);
    } catch (err) {
      console.log("Popup closed by user");
      return false;
    }
  };

  const signout = async () => {
    await signOut(auth);
    return handleUser(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGithub,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.accessToken,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
  };
};

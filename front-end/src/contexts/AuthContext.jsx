import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { getUseData } from '../service/cartservice';

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const loggedInRes = await axios.get('http://localhost:5000/api/auth/loggedIn ', {
      withCredentials: true,
    });
    setLoggedIn(loggedInRes.data);
  }
  useEffect(() => {
    getLoggedIn();
  }, []);

  const [user, setUser] = useState({});

  useEffect(() => {
    getUseData((data) => {
      console.log(data);
      setUser(data);
    });
  }, []);

  return <AuthContext.Provider value={{ user, loggedIn, getLoggedIn }}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
export { AuthContextProvider };

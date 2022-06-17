import { useState, useEffect } from 'react';
import './App.scss';
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

function App() {
  var poolData = {
    UserPoolId: 'us-east-1_8INQuHliS',
    ClientId: '3pe96do77c3ct68s4e1clqusjc',
  };
  var userPool = new CognitoUserPool(poolData);

  function loadUser() {
    try {
      userPool.getCurrentUser().getSession(function (err, session) {
        if (err) {
          console.log(err);
        } else {
          setUser(session.idToken.payload);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  function logOut(){
    userPool.getCurrentUser().signOut();
    setUser(null);
  }

  const [user, setUser] = useState(null);
  useEffect(() => {
    loadUser();
  }, []);
  return user ? <Welcome user={user} logOut={logOut} /> : <Login loginUser={loadUser} />;
}

export default App;

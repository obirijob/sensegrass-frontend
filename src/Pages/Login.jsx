import React, { useState } from 'react';
import LoginInput from '../Components/LoginInput';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

function Login({loginUser}) {
  var poolData = {
    UserPoolId: 'us-east-1_8INQuHliS',
    ClientId: '3pe96do77c3ct68s4e1clqusjc',
  };
  var userPool = new CognitoUserPool(poolData);

  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const [signed, setSigned] = useState(false);

  function login() {
    var authenticationData = {
      Username: emails,
      Password: passwords,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var userData = {
      Username: emails,
      Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();
        localStorage.setItem('access-token', accessToken);
        loginUser()
      },
      onFailure: function (err) {
        if (err.code === 'UserNotConfirmedException') {
          alert(
            'Your email is not confirmed. Please login to your email and verify your code below.'
          );
          cognitoUser.resendConfirmationCode((err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log('sent');
            }
          });
          setSigned(true);
          setEmail(emails);
        } else {
          setSigned(false);
          alert(err.message || JSON.stringify(err));
        }
      },
    });
  }

  function signUp() {
    const phoneAtt = new CognitoUserAttribute({
      Name: 'phone_number',
      Value: phone,
    });
    const nameAtt = new CognitoUserAttribute({
      Name: 'given_name',
      Value: name,
    });
    userPool.signUp(
      email,
      password,
      [phoneAtt, nameAtt],
      null,
      function (err, result) {
        if (err) {
          alert(err.message);
        } else {
          setSigned(true);
        }
      }
    );
  }

  function verifyCode() {
    var userData = {
      Username: email,
      Pool: userPool,
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, false, function (err, result) {
      if (err) {
        alert('Invalid Code Entered');
      } else {
        alert('Account Verified');
      }
    });
  }

  return (
    <div className="login">
      <div className="login-frm">
        <div className="header">
          <img
            style={{ width: 50, height: 50, marginRight: 20 }}
            alt="ourlogo"
            src={require('../Assets/logo.png')}
          />
          <span>SENSEGRASS</span>
        </div>
        <div className="log">
          <form
            onSubmit={e => {
              e.preventDefault();
              login();
            }}
          >
            <div className="description">LOGIN TO SG ACCOUNT</div>
            <LoginInput
              onInput={e => setEmails(e.target.value)}
              placeholder="Email"
              required={true}
            />
            <LoginInput
              onInput={e => setPasswords(e.target.value)}
              placeholder="Password"
              password={true}
              required={true}
            />
            <div className="options">
              <span>Forgot Password?</span>
              <button>LOGIN</button>
            </div>
          </form>
        </div>
        <div className="log">
          {signed ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                verifyCode();
              }}
            >
              <div className="description">LETS VERIFY YOUR EMAIL</div>
              <LoginInput
                placeholder={'Verify Code Sent to your Email'}
                required={true}
                onInput={e => setCode(e.target.value)}
              />
              <div className="options">
                <span>Resend Code?</span>
                <button>Verify Code</button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                signUp();
              }}
            >
              <div className="description">LETS GET STARTED</div>
              <LoginInput
                placeholder={'Enter your Email ID'}
                required={true}
                onInput={e => setEmail(e.target.value)}
              />
              <LoginInput
                placeholder={'Enter your Name'}
                required={true}
                onInput={e => setName(e.target.value)}
              />
              <LoginInput
                placeholder={'Enter your Phone Number'}
                required={true}
                onInput={e => setPhone(e.target.value)}
              />
              <LoginInput
                placeholder={'Enter your Password'}
                required={true}
                onInput={e => setPassword(e.target.value)}
                password={true}
              />
              <div className="options">
                <input
                  style={{ flex: 1, margin: 10 }}
                  id="agIn"
                  type="checkbox"
                  required
                />
                <label style={{ fontSize: 12, marginLeft: 10 }} for="agIn">
                  I agree in processing my personal data in conformity with the
                  privacy policy. When clicking "Get Started" you also agree
                  with the End User License Agreement
                </label>
              </div>
              <div className="options">
                <button>SIGN UP</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

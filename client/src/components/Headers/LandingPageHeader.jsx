/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';

// reactstrap components
import { Button, Container } from 'reactstrap';

// core components

const LandingPageHeader = ({
  handleSignin,
  handleSignup,
  handleLogout,
  isLoggedin,
  username,
}) => {
  const [stateIsLoggedIn, setStateIsLoggedIn] = React.useState(false);
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
      };
    }
  });

  React.useEffect(() => {
    setStateIsLoggedIn(isLoggedin);
  }, [isLoggedin]);

  return (
    <>
      <div
        style={{
          zIndex:111,
          backgroundImage:
            'url(' + require('../../assets/img/boardgames.jpg') + ')',
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>
              GGchat
              <sup
                style={{
                  color: 'darkturquoise',
                  verticalAlign: 'top',
                  fontSize: '17px',
                  top: '0.1em',
                }}
              >
                ALPHA
              </sup>
            </h1>
            <h3>
              Play games, socialize and connect with other Zoom University
              students.
            </h3>
            <h4
              style={{
                marginTop: '4px',
                marginBottom: '50px',
                fontStyle: 'italic',
              }}
            >
              Thanks for testing our platform!
            </h4>
            <br />
            {username ? (
              <>
                <h4 style={{ display: 'inline', marginRight: '10px' }}>
                  Welcome <span style={{ color: '#6bd098' }}>{username}!</span>
                </h4>
                <Button
                  className="btn-round"
                  color="neutral"
                  type="button"
                  outline
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="btn-round"
                  color="neutral"
                  type="button"
                  outline
                  onClick={handleSignup}
                >
                  <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                  Sign Up
                </Button>
                <Button
                  className="btn-round"
                  color="neutral"
                  type="button"
                  outline
                  onClick={handleSignin}
                >
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                  Sign In
                </Button>
              </>
            )}
            <h5 style={{ marginTop: '60px' }}>
              Checkout the games <a href="#games">below</a>
            </h5>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LandingPageHeader;

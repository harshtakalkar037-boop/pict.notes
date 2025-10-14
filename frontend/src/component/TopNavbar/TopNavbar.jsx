import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  OpenLinksButton,
  NavbarLinkExtended,
  LogoContainer,
  MainLogo,
  Subtitle,
  LogoText
} from "./Navbar.style";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TopNavbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const { currentUser: user } = useSelector((state) => state.user);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <LogoContainer>
            <Subtitle>Pune Institute of Technology</Subtitle>
            <MainLogo>StudySphere</MainLogo>
          </LogoContainer>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <NavbarLink>Home</NavbarLink>
            </Link>
            {user && (
              <>
                <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none' }}>
                  <NavbarLink>Profile</NavbarLink>
                </Link>
                <Link to="/messenger" style={{ textDecoration: 'none' }}>
                  <NavbarLink>Chat</NavbarLink>
                </Link>
                <Link to="/searchuser" style={{ textDecoration: 'none' }}>
                  <NavbarLink>Search</NavbarLink>
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <NavbarLink>Register</NavbarLink>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <NavbarLink>Login</NavbarLink>
                </Link>
              </>
            )}
          </NavbarLinkContainer>
          <OpenLinksButton
            onClick={() => {
              setExtendNavbar((curr) => !curr);
            }}
          >
            {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
          </OpenLinksButton>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <NavbarLinkExtended>Home</NavbarLinkExtended>
          </Link>
          {user && (
            <>
              <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none' }}>
                <NavbarLinkExtended>Profile</NavbarLinkExtended>
              </Link>
              <Link to="/messenger" style={{ textDecoration: 'none' }}>
                <NavbarLinkExtended>Chat</NavbarLinkExtended>
              </Link>
              <Link to="/searchuser" style={{ textDecoration: 'none' }}>
                <NavbarLinkExtended>Search</NavbarLinkExtended>
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <NavbarLinkExtended>Register</NavbarLinkExtended>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <NavbarLinkExtended>Login</NavbarLinkExtended>
              </Link>
            </>
          )}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default TopNavbar;

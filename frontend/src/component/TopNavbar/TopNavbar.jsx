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
  LogoText
} from "./Navbar.style";
import { useSelector } from "react-redux";

function TopNavbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const { currentUser: user } = useSelector((state) => state.user);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <LogoText>StudySphere</LogoText>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Home</NavbarLink>
            {user && (
              <>
                <NavbarLink to={`/profile/${user._id}`}> Profile</NavbarLink>
                <NavbarLink to="/messenger"> Chat</NavbarLink>
                <NavbarLink to="/searchuser"> Search</NavbarLink>
              </>
            )}
            {!user && (
              <>
                <NavbarLink to="/register"> Register</NavbarLink>
                <NavbarLink to="/login"> Login</NavbarLink>
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
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          {user && (
            <>
              <NavbarLinkExtended to={`/profile/${user._id}`}> Profile</NavbarLinkExtended>
              <NavbarLinkExtended to="/messenger"> Chat</NavbarLinkExtended>
              <NavbarLinkExtended to="/searchuser"> Search</NavbarLinkExtended>
            </>
          )}
          {!user && (
            <>
              <NavbarLinkExtended to="/register"> Register</NavbarLinkExtended>
              <NavbarLinkExtended to="/login"> Login</NavbarLinkExtended>
            </>
          )}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default TopNavbar;

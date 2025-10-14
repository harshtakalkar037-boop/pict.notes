import { Badge } from "@material-ui/core";
import { Search, Chat, Menu, AccountCircle, ExitToApp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, search } from "../redux/userRedux";
import { useRef } from "react";

const Container = styled.div`
  height: 80px; /* Increased height */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  ${mobile({ height: "70px" })}
`;

const Wrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 15px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: 4 })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: white;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.form`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  ${mobile({ marginLeft: "10px", padding: "6px 12px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 14px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  ${mobile({ width: "120px", fontSize: "12px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstitutionName = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 2px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.h1`
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
  ${mobile({ fontSize: "20px", display: "none" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 6, justifyContent: "space-around" })}
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  ${mobile({ marginLeft: "10px", marginRight: "5px", flexDirection: "column", padding: "6px 8px" })}
`;

const Item = styled.p`
  font-size: 16px;
  margin-left: 8px;
  color: white;
  font-weight: 600;
  ${mobile({ fontSize: "11px", marginLeft: "0", marginTop: "2px" })}
`;

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  font-size: 16px;
  color: white;
  font-weight: 600;
  ${mobile({ fontSize: "11px", marginLeft: "0" })}
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  color: white;
`;

const Navbar = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [searchedValue, setsearchedValue] = useState(null);
  const item = useRef();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  }

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(search(searchedValue));
  }

  useEffect(() => {
    dispatch(search(null));
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer onSubmit={searchHandler}>
            <Input 
              placeholder="Search users or notes..." 
              onChange={(e) => setsearchedValue(e.target.value)}
            />
            <SearchButton type="submit">
              <Search style={{ color: "white", fontSize: 18 }} />
            </SearchButton>
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none" }}>
            <LogoContainer>
              <InstitutionName>Pune Institute of Technology</InstitutionName>
              <Logo>StudySphere</Logo>
            </LogoContainer>
          </Link>
        </Center>
        <Right>
          {currentUser ? (
            <>
              <Link to={"/profile/" + currentUser._id} style={{ textDecoration: "none" }}>
                <MenuItem>
                  <AccountCircle style={{ color: "white" }} />
                  <Item>{currentUser.username}</Item>
                </MenuItem>
              </Link>
              <MenuItem>
                <ExitToApp style={{ color: "white" }} onClick={logoutHandler} />
                <Button onClick={logoutHandler}>Logout</Button>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Item>Sign In</Item>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Item>Register</Item>
                </Link>
              </MenuItem>
            </>
          )}
          <Link to="/searchuser" style={{ textDecoration: "none" }}>
            <MenuItem>
              <Chat style={{ color: "white" }} />
              <Item>Chat</Item>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

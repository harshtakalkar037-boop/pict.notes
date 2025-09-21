import { useState } from "react";
import styled from "styled-components";
import { login } from "../../redux/apiCalls";
import { mobile } from "../../responsive.js";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #181a20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #23272f;
  color: #e0e0e0;
  ${mobile({ width: "75%" })}
  box-shadow: 0 4px 32px rgba(0,0,0,0.4);
`;
const TitleNav=styled.h1`
  font-size: 45px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 3vh;
  color: #00bcd4;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: #e0e0e0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  background: #23272f;
  color: #e0e0e0;
  border: 1px solid #00bcd4;
  border-radius: 6px;
  ${mobile({border:"1px solid #00bcd4"})}
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #00bcd4;
  color: #181a20;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 6px;
  transition: background 0.2s;
  &:hover {
    background-color: #0097a7;
    color: #e0e0e0;
  }
  &:disabled {
    background-color: #23272f;
    color: #888;
    cursor: not-allowed;
  }
`;

const LinkTag = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
  color: #00bcd4;
`;

const Error = styled.span`
  color: #ff5252;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector((state) => state.user);
  
  
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <Container>
  <TitleNav>Study Sphere</TitleNav>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}

          < LinkTag>
          Need an account
          <Link to="/register" style={{textDecoration:"none"}}>
           <b style={{marginLeft:"5px"}}>SIGN UP</b>
          </Link>
          </ LinkTag>
          < LinkTag>
          <Link to="/">
           <b>Skip</b>
          </Link>
          </ LinkTag>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
import { useState } from "react";
import styled from "styled-components";
import { login } from "../../redux/apiCalls";
import { mobile } from "../../responsive.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  ${mobile({ width: "75%" })}
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const TitleNav = styled.h1`
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3vh;
  color: white;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  ${mobile({ border: "2px solid #e2e8f0" })}
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 18px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    background: #a0aec0;
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const LinkTag = styled.div`
  margin: 15px 0px;
  font-size: 14px;
  text-decoration: none;
  color: #718096;
  text-align: center;
`;

const Error = styled.span`
  color: #e53e3e;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  display: block;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await login(dispatch, { email, password });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Container>
      <TitleNav>StudySphere</TitleNav>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isFetching}>
            {isFetching ? "LOGGING IN..." : "LOGIN"}
          </Button>
          {error && <Error>Something went wrong... Please try again.</Error>}

          <LinkTag>
            Need an account? {' '}
            <Link to="/register" style={{ textDecoration: "none", color: "#667eea", fontWeight: "600" }}>
              SIGN UP
            </Link>
          </LinkTag>
          <LinkTag>
            <Link to="/" style={{ textDecoration: "none", color: "#667eea", fontWeight: "600" }}>
              Skip
            </Link>
          </LinkTag>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../../redux/apiCalls";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #181a20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
  ${mobile({paddingTop:"12vh" })}
`;
const TitleNav=styled.h1`
  font-size: 45px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 3vh;
  color: #00bcd4;
  ${mobile({textAlign:"center",fontSize:"35px",marginBottom:"1vh"})}
`
const Wrapper = styled.div`

  width: 40%;
  padding: 20px;
  background-color: #23272f;
  color: #e0e0e0;
  ${mobile({ width: "75%" , marginTop:"2vh"})}
  box-shadow: 0 4px 32px rgba(0,0,0,0.4);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: #e0e0e0;
  ${mobile({fontSize:"20px"})}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  ${mobile({flexDirection:"column",flexWrap:"nowrap"})}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  background: #23272f;
  color: #e0e0e0;
  border: 1px solid #00bcd4;
  border-radius: 6px;
  ${mobile({border:"1px solid #00bcd4"})}
`;

const Agreement = styled.span`
  font-size: 10px;
   margin-bottom: 20px;
   margin-top: 5px;
`;

const Button = styled.button`
  width: 40%;
  display: block;
  border: none;
  padding: 15px 20px;
  background-color: #00bcd4;
  color: #181a20;
  font-weight: 600;
  cursor: pointer;
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
  margin-top: 20px;
  font-size: 12px;
  display: block;
  text-decoration: none;
  color: #00bcd4;
`;
const Error = styled.span`
  color: #ff5252;
`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
 
  const dispatch = useDispatch();
  const { isFetching, error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    password=== confirmpassword ?
    register(dispatch,{
      firstname,lastname,username,email, password,
  }) : alert("password is not same")
  
}
   
  return (
    <Container>
  <TitleNav>Study Sphere</TitleNav>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" 
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            required
          />
          <Input placeholder="last name" 
           onChange={(e) => setLastname(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="username" 
           onChange={(e) => setUsername(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="email" 
           onChange={(e) => setEmail(e.target.value)}
           type="email"
           required
          />
          <Input placeholder="password" 
           onChange={(e) => setPassword(e.target.value)}
           type="password"
           required
          />
          <Input placeholder="confirm password" 
           onChange={(e) => setConfirmPassword(e.target.value)}
           type="password"
           required
          />
           <LinkTag>
          Already an user?
          <Link to="/login">
            <b>LOGIN</b>
          </Link>
          </LinkTag>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
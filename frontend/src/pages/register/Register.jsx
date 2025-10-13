import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../../redux/apiCalls";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({paddingTop:"12vh" })}
`;
const TitleNav=styled.h1`
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3vh;
  color: white;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
  ${mobile({textAlign:"center",fontSize:"35px",marginBottom:"1vh"})}
`
const Wrapper = styled.div`
  width: 40%;
  padding: 40px;
  background: white;
  border-radius: 20px;
  ${mobile({ width: "75%" , marginTop:"2vh"})}
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 30px;
  text-align: center;
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
  margin: 10px 10px 10px 0px;
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  ${mobile({border:"2px solid #e2e8f0"})}
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    outline: none;
  }
`;

const Agreement = styled.span`
  font-size: 12px;
   margin-bottom: 20px;
   margin-top: 10px;
   color: #718096;
   line-height: 1.5;
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
  margin-top: 20px;
  font-size: 14px;
  display: block;
  text-decoration: none;
  color: #718096;
  text-align: center;
`;
const Error = styled.span`
  color: #e53e3e;
  font-size: 14px;
  margin-top: 10px;
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
     <TitleNav>StudySphere</TitleNav>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First name" 
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            required
          />
          <Input placeholder="Last name" 
           onChange={(e) => setLastname(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="Username" 
           onChange={(e) => setUsername(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="Email" 
           onChange={(e) => setEmail(e.target.value)}
           type="email"
           required
          />
          <Input placeholder="Password" 
           onChange={(e) => setPassword(e.target.value)}
           type="password"
           required
          />
          <Input placeholder="Confirm password" 
           onChange={(e) => setConfirmPassword(e.target.value)}
           type="password"
           required
          />
           <LinkTag>
          Already an user? {' '}
          <Link to="/login" style={{textDecoration: "none", color: "#667eea", fontWeight: "600"}}>
            LOGIN
          </Link>
          </LinkTag>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b style={{color: "#2d3748"}}>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>CREATE ACCOUNT</Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

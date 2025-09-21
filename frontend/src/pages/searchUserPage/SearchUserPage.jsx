import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../../responsive"
 import BuildConversation from '../../component/BuildConversation/BuildConversation'
 import Navbar from "../../component/Navbar";

 const Container = styled.div`
  width: 100%;
  margin-top: 3vh;
  padding: 20px;
  background: #181a20;
  color: #e0e0e0;
  font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
`;
 const SearchUserPage = () => {
   return (
    <>
    <Navbar />
      <Container>
        <BuildConversation />
      </Container>
      </>
   )
 }
 
 export default SearchUserPage
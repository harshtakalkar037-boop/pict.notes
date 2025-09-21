
import React from "react";
import BuildConversation from '../../component/BuildConversation/BuildConversation';
import Navbar from "../../component/Navbar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const SearchUserPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: '#f5faff', boxShadow: '0 2px 12px rgba(33,150,243,0.08)' }}>
          <BuildConversation />
        </Paper>
      </Container>
    </>
  );
}

export default SearchUserPage;
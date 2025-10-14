import React from "react";
import styled from "styled-components";
import { useState } from "react";
import './BuildConversation.css';
import { useSelector } from "react-redux";
import { mobile } from "../../responsive"
import CircularLoader from '../../component/CircularLoader'
import { publicRequest } from '../../requestMethods'
import { Search, Message, People } from "@material-ui/icons";
import SearchedUser from "../SearchedUser/SearchedUser";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #667eea;
`;

const MessageIcon = styled(Message)`
  color: #667eea;
  font-size: 32px !important;
  margin-right: 15px;
`;

const MessageTitle = styled.div`
  font-size: 24px;
  color: #2d3748;
  font-weight: 700;
`;

const MessageSubtitle = styled.div`
  font-size: 14px;
  color: #718096;
  margin-top: 5px;
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  background: #f8fafc;
  border-radius: 10px;
  padding: 5px 15px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  height: 45px;
  font-size: 16px;
  color: #2d3748;
  padding: 0 10px;

  &::placeholder {
    color: #a0aec0;
  }
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const UserWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #718096;
`;

const PeopleIcon = styled(People)`
  font-size: 48px !important;
  color: #cbd5e0;
  margin-bottom: 15px;
`;

const BuildConversation = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchedItem, setSearchedItem] = useState("");
  const [users, setUsers] = useState(null);

  const searchHandler = async (e) => {
    e.preventDefault();
    if (!searchedItem.trim()) return;
    
    setIsSearching(true);
    try {
      const res = await publicRequest.get("users/findusers/" + searchedItem);
      setUsers(res.data);
    } catch (error) {
      console.error("Search error:", error);
    }
    setIsSearching(false);
  };

  return (
    <Container>
      {/* Header */}
      <HeaderContainer>
        <MessageIcon />
        <div>
          <MessageTitle>Start Conversation</MessageTitle>
          <MessageSubtitle>Connect with other students</MessageSubtitle>
        </div>
      </HeaderContainer>

      {/* Search Section */}
      <SearchSection>
        <SearchContainer onSubmit={searchHandler}>
          <Input
            placeholder="Search by username or email..."
            value={searchedItem}
            onChange={(e) => setSearchedItem(e.target.value)}
            required
          />
          <SearchButton type="submit">
            <Search style={{ color: "white", fontSize: 20 }} />
          </SearchButton>
        </SearchContainer>
      </SearchSection>

      {/* Results Section */}
      {isSearching ? (
        <CircularLoader item={"users"} />
      ) : (
        <UserWrapper>
          {users?.length === 0 ? (
            <EmptyState>
              <PeopleIcon />
              <h3 style={{ textAlign: "center", color: "#718096", marginBottom: "10px" }}>
                No users found
              </h3>
              <p style={{ textAlign: "center", color: "#a0aec0" }}>
                Try searching with a different username
              </p>
            </EmptyState>
          ) : (
            users?.map((u, i) => <SearchedUser receiverUser={u} key={i} />)
          )}
        </UserWrapper>
      )}
    </Container>
  );
};

export default BuildConversation;

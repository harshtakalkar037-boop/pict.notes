import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "100px")};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 4px 25px rgba(0,0,0,0.15);

  @media (min-width: 700px) {
    height: 100px;
  }
`;

export const LeftContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

export const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
  align-items: center;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  margin: 10px;
  padding: 12px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 0.5px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  margin: 12px;
  padding: 15px 25px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 0.5px;
  text-align: center;
  width: 80%;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(10px);
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Subtitle = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 2px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
`;

export const MainLogo = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 3px 10px rgba(0,0,0,0.3);
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const LogoText = styled.h1`
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

export const OpenLinksButton = styled.button`
  width: 60px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);

  @media (min-width: 700px) {
    display: none;
  }
`;

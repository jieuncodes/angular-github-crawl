import styled from "styled-components";

interface FooterProps {
    handleLoadClick: () => void;
}

function Footer({handleLoadClick}: FooterProps) {
  const FooterArea = styled.div`
    display: flex;
    gap: 5px;
    height: 30px;
    width: 100%;
    margin-top: 20px;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid;
    bottom: 0;
    position:sticky;
    background-color: white;
  `;

  const LoadBtn = styled.button``;
  const ResetBtn = styled.button``;

  return (
    <FooterArea>
      <LoadBtn onClick={handleLoadClick}>load</LoadBtn>
      <ResetBtn>초기화</ResetBtn>
    </FooterArea>
  );
}

export default Footer;

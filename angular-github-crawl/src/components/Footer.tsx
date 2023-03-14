import styled from "styled-components";

interface FooterProps {
    handleLoadClick: () => void;
    handleResetClick: () => void;
}

const FooterArea = styled.div`
    display: flex;
    gap: 5px;
    position:fixed;
    bottom:0;
    height: 30px;
    width: 100%;
    margin-top: 20px;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid;
    background-color: white;
    z-index: 10;
  `;

  const LoadBtn = styled.button``;
  const ResetBtn = styled.button``;

function Footer({handleLoadClick, handleResetClick}: FooterProps) {
  
  return (
    <FooterArea>
      <LoadBtn onClick={handleLoadClick} className="load-btn">load</LoadBtn>
      <ResetBtn onClick={handleResetClick}>초기화</ResetBtn>
    </FooterArea>
  );
}

export default Footer;

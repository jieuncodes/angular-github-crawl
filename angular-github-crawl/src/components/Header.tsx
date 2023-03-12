import styled from "styled-components";

function Header() {
  const HeaderArea = styled.div`
    display: flex;
    gap: 5px;
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: white;
  `;

  const OrganizationName = "Angular";
  const RepositoryName = "Angular-repo";

  return (
    <HeaderArea>
      <span>{OrganizationName}</span>
      <span>/</span>
      <span>{RepositoryName}</span>
    </HeaderArea>
  );
}

export default Header;

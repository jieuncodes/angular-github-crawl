import styled from "styled-components";
function Header() {
  const Organization = styled.div``;
  const Repo = styled.div``;

  const OrganizationName = "Angular";
  const RepositoryName = "Angular-repo";

  return (
    <>
      <Organization>{OrganizationName}</Organization>
      <Repo>{RepositoryName}</Repo>
    </>
  );
}

export default Header;

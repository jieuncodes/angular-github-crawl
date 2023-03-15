import { HeaderArea } from "../styles/Header";

function Header() {
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

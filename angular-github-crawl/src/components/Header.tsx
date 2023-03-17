import {
  GoBackBtn,
  HeaderArea,
  HeaderTitle,
} from "../styles/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import DropDowns from "./DropDowns";

function Header() {
  const nav = useNavigate();
  const path = useLocation();
  const OrganizationName = "Angular";
  const RepositoryName = "Angular-repo";


  return (
    <HeaderArea>
      {path.pathname == "/" ? null : (
        <GoBackBtn>
          <ArrowBackIcon
            onClick={() => {
              nav(-1);
            }}
          />
        </GoBackBtn>
      )}
      <HeaderTitle>
        <span>{OrganizationName}</span>
        <span>/</span>
        <span>{RepositoryName}</span>
      </HeaderTitle>
      <DropDowns />
    </HeaderArea>
  );
}

export default Header;

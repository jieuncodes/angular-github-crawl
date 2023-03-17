import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import { issueStateAtom, issueStateSelector } from "../atom";

const Container = tw.div`
`;

const Select = tw.select`
`;


function DropDowns() {
  const [issueState, setIssueState] = useRecoilState(issueStateAtom);

  useEffect(() => {
    console.log("issueState", issueState);
  }, [issueState]);

  const handleSelectChange = (event:React.ChangeEvent<any>) => {
    setIssueState(event.currentTarget.value);
    console.log("SELECTED", event.currentTarget.value);
  }

  return (
    <Container>
      <Select value={issueState} onChange={handleSelectChange}>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="all">All</option>
      </Select>
    </Container>
  );
}

export default DropDowns;

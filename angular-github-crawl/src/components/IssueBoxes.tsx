import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchIssues } from "../api";
import { perPageAtom } from "../atom";
import Footer from "./Footer";

const Boxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const IssueBox = styled.div`
  border: 1px solid;
  width: 90%;
  min-height: 80px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "header comment"
    "meta comment";
`;
const BoxHeader = styled.div`
  grid-area: header;
`;
const IssueNum = styled.span``;
const IssueTitle = styled.span``;
const BoxMeta = styled.div`
  grid-area: meta;
`;
const Writer = styled.span``;
const CreatedAt = styled.span``;
const CommentsInfo = styled.span`
  grid-area: comment;
`;

function IssueBoxes() {
  const [perPage, setPerPage] = useRecoilState(perPageAtom);
  const { data, isLoading } = useQuery(["issues", perPage], () => fetchIssues(perPage));
  console.log(data);

  const handleLoadClick = () => {
    setPerPage(perPage + 10);
  };
  return (
    <>
      <Boxes>
        {data?.map((issue) => (
          <IssueBox key={issue.id}>
            <BoxHeader>
              <IssueNum>#{issue.number}</IssueNum>
              <IssueTitle>{issue.title}</IssueTitle>
            </BoxHeader>
            <BoxMeta>
              <Writer>작성자: {issue.user?.login}</Writer>
              <CreatedAt>작성일: {issue.updated_at}</CreatedAt>
            </BoxMeta>
            <CommentsInfo>코멘트: {issue.comments}</CommentsInfo>
          </IssueBox>
        ))}
      </Boxes>
      <Footer handleLoadClick={handleLoadClick} />
    </>
  );
}

export default IssueBoxes;

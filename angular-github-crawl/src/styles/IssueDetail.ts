import styled from "styled-components"

export const IssueDetailArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
export const IssueHeader = styled.div`
  display: grid;
  grid-template-areas:
    "avatar num title comment"
    "avatar meta meta comment";
  font-size: 15px;
`;
export const WriterProfile = styled.div`
  grid-area: avatar;
  object-fit: cover;
  height: 50px;
  width: 50px;
`;
export const Img = styled.img`
  height: 50px;
  width: 50px;
`;
export const IssueNum = styled.span`
  grid-area: num;
`;
export const IssueTitle = styled.span``;
export const IssueMeta = styled.div`
  grid-area: meta;
`;
export const Writer = styled.span``;
export const CreatedAt = styled.span``;
export const CommentsInfo = styled.span`
  grid-area: comment;
`;
export const IssueBody = styled.div``;
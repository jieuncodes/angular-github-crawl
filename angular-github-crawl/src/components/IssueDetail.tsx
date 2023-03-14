import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchIssueDetail } from "../api";

interface IUser {
  avatar_url: string;
  login: string;
}
interface IIssueData {
  body: string;
  comments: number;
  created_at: string;
  id: number;
  state: string;
  title: string;
  updated_at: string;
  user: IUser;
  number: number;
}
const IssueDetailArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const IssueHeader = styled.div`
  display: grid;
  grid-template-areas:
    "avatar num title comment"
    "avatar meta meta comment";
  font-size: 15px;
`;
const WriterProfile = styled.div`
  grid-area: avatar;
  object-fit: cover;
  height: 50px;
  width: 50px;
`;
const Img = styled.img`
  height: 50px;
  width: 50px;
`;
const IssueNum = styled.span`
  grid-area: num;
`;
const IssueTitle = styled.span``;
const IssueMeta = styled.div`
  grid-area: meta;
`;
const Writer = styled.span``;
const CreatedAt = styled.span``;
const CommentsInfo = styled.span`
  grid-area: comment;
`;
const IssueBody = styled.div``;

function IssueDetail() {
  const { id } = useParams();
  const [issueData, setIssueData] = useState<IIssueData>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchIssueDetail(id || "");
      setIssueData(data as IIssueData);
      return data;
    }
    fetchData();
  }, [id]);
  return (
    <IssueDetailArea>
      <IssueHeader>
        <WriterProfile>
          <Img src={issueData?.user.avatar_url} />
        </WriterProfile>
        <IssueNum>#{issueData?.number}</IssueNum>
        <IssueTitle>{issueData?.title}</IssueTitle>
        <IssueMeta>
          <Writer>작성자: {issueData?.user.login}</Writer>
          <CreatedAt>작성일: {issueData?.updated_at}</CreatedAt>
        </IssueMeta>
        <CommentsInfo>코멘트: {issueData?.comments}</CommentsInfo>
      </IssueHeader>
      <IssueBody>{issueData?.body}</IssueBody>
    </IssueDetailArea>
  );
}
export default IssueDetail;

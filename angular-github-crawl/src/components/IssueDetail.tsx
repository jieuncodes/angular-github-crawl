import Markdown from "marked-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIssueDetail } from "../api";
import formatDate from "../formatDate";
import { CommentsInfo, CreatedAt, IssueNum, IssueTitle, Writer } from "../styles/IssueBoxes";
import { Img, IssueBody, IssueDetailArea, IssueHeader, IssueMeta, WriterProfile } from "../styles/IssueDetail";

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


function IssueDetail() {
  const { id } = useParams();
  const [issueData, setIssueData] = useState<IIssueData>();
  const [issueBody, setIssueBody] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchIssueDetail(id || "");
      setIssueData(data as IIssueData);
      setIssueBody(data.body || "");
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
          <CreatedAt>
            작성일: {formatDate(issueData?.updated_at || "")}
          </CreatedAt>
        </IssueMeta>
        <CommentsInfo>코멘트: {issueData?.comments}</CommentsInfo>
      </IssueHeader>
      <IssueBody className="bodyArea"><Markdown value={issueBody}></Markdown></IssueBody>
    </IssueDetailArea>
  );
}
export default IssueDetail;

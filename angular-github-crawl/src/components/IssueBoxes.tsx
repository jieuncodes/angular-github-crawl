import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchIssues } from "../api";
import { pageAtom, renderedDataAtom } from "../atom";
import Footer from "./Footer";

const Boxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 50px;
  justify-content: center;
  align-items: center;
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
const LoadingBox = styled.div`
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 10px 50px;
  border-radius: 5px;
  background-color: lightgray;
`;
const AdBox = styled.div`
  cursor: pointer;
`;
const EndBox = styled.div`
  color: red;
  font-weight: 500;
  background-color: pink;
`;

function IssueBoxes() {
  const [page, setPage] = useRecoilState(pageAtom);
  const { data } = useQuery([page], () => fetchIssues(page));
  const [loading, setLoading] = useState(false);
  const [renderedData, setRenderedData] = useRecoilState(renderedDataAtom);
  const loadBtn = document.querySelector(".load-btn") as HTMLButtonElement;
  const boxes = document.querySelector(".boxes");

  const handleLoadClick = async () => {
    if (data?.length == 0) {
      const endBox = { isEnd: true, id: "end" };
      const newRenderedData = [...renderedData, endBox];
      setRenderedData(newRenderedData);
      loadBtn.disabled = true;
      setTimeout(() => {
        boxes?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 300);
      return;
    }
    setLoading(true);
    const loadingBox = {
      isLoadingBanner: true,
      id: `lb-${page}`,
    };
    const adBox = { isAdBanner: true, id: `ad-${page}` };
    const newRenderedData = [
      ...renderedData,
      loadingBox,
      ...(data || []),
      adBox,
    ];
    setRenderedData(newRenderedData);
    setLoading(false);
    setTimeout(() => {
      boxes?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
    setPage(page + 1);
  };

  const handleResetClick = () => {
    setPage(0);
    setRenderedData([]);
    loadBtn.disabled = false;
  };

  return (
    <>
      <Boxes className="boxes">
        {renderedData.map((data: any) =>
          data.isLoadingBanner ? (
            <LoadingBox key={data.id}>
              <span>issue 10개 로딩 시작</span>
            </LoadingBox>
          ) : data.isAdBanner ? (
            <a href="https://thingsflow.com/ko/home" key={data.id}>
              <AdBox>
                <img src="https://hellobot-test.s3.ap-northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7" />
              </AdBox>
            </a>
          ) : data.isEnd ? (
            <EndBox key={data.id}>
              <span>No More Issues</span>
            </EndBox>
          ) : (
            <Link to={`/issue/${data.number}`} key={data.id}>
              <IssueBox>
                <BoxHeader>
                  <IssueNum>#{data.number}</IssueNum>
                  <IssueTitle>{data.title}</IssueTitle>
                </BoxHeader>
                <BoxMeta>
                  <Writer>작성자: {data.user?.login}</Writer>
                  <CreatedAt>작성일: {data.updated_at}</CreatedAt>
                </BoxMeta>
                <CommentsInfo>코멘트: {data.comments}</CommentsInfo>
              </IssueBox>
            </Link>
          )
        )}
      </Boxes>
      <Footer
        handleLoadClick={handleLoadClick}
        handleResetClick={handleResetClick}
      />
    </>
  );
}

export default IssueBoxes;

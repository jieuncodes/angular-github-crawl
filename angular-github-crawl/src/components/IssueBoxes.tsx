import { Key, useRef } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchIssues } from "../api";
import { pageAtom, renderedDataAtom } from "../atom";
import formatDate from "../formatDate";
import { AdBox, Boxes, BoxHeader, BoxMeta, CommentsInfo, CreatedAt, EndBox, IssueBox, IssueNum, IssueTitle, LoadingCover, Writer } from "../styles/IssueBoxes";
import Footer from "./Footer";

interface IBoxData {
  isAdBanner: boolean;
  isEnd: boolean;
  id?: Key;
  number?: number;
  title?: string;
  user?: {
    login?: string;
  };
  updated_at?: string;
  comments?: string;
}

function IssueBoxes() {
  const [page, setPage] = useRecoilState(pageAtom);
  const { data, isLoading, isSuccess } = useQuery(
    [page],
    () => fetchIssues(page),
    { cacheTime: 1000 * 60 * 60 }
  );
  const [renderedData, setRenderedData] = useRecoilState(renderedDataAtom);
  const loadBtn = document.querySelector(".load-btn") as HTMLButtonElement;
  const boxesRef = useRef<HTMLDivElement>(null);

  const handleLoadClick = async () => {
    if (data?.length === 0) {
      const endBox = { isEnd: true, id: "end" };
      const newRenderedData = [...renderedData, endBox];
      setRenderedData(newRenderedData);
      loadBtn.disabled = true;
      setTimeout(() => {
        boxesRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 300);
      return;
    }

    const adBox = { isAdBanner: true, id: `ad-${page}` };
    const newRenderedData = [
      ...renderedData,
      ...(data || []),
      adBox,
    ];
    setRenderedData(newRenderedData);
    setTimeout(() => {
      boxesRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
    setPage((prevpage) => prevpage + 1);
  };

  const handleResetClick = () => {
    setPage(0);
    setRenderedData([]);
    loadBtn.disabled = false;
  };

  return (
    <>
      <Boxes ref={boxesRef} className="boxes">
        {isLoading ? (
          <LoadingCover>
            <span>issue 10개 로딩 시작</span>
          </LoadingCover>
        ) : null}
        {renderedData.map((data: IBoxData) => data.isAdBanner && isSuccess ? (
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
            <Link to={`/issue/${data.number}`} key={data.id} style={{ display: "flex", justifyContent: "center" }}>
              <IssueBox>
                <BoxHeader>
                  <IssueNum>#{data.number}</IssueNum>
                  <IssueTitle>{data.title}</IssueTitle>
                </BoxHeader> 
                <BoxMeta>
                  <Writer>작성자: {data.user?.login}</Writer>
                  <CreatedAt>
                    작성일: {formatDate(data.updated_at || "")}
                  </CreatedAt>
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

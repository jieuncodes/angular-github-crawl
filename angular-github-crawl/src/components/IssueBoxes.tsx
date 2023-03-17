import AdjustIcon from '@mui/icons-material/Adjust';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Key, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchIssues } from "../api";
import { issueStateAtom, issueStateSelector, pageAtom, renderedDataAtom } from "../atom";
import formatDate from "../formatDate";
import { IssueState } from "../styles/Header";
import { AdBox, Boxes, BoxHeader, BoxMeta, CommentsInfo, CreatedAt, EndBox, IssueBox, IssueNum, IssueTitle, LoadingCover, Writer } from "../styles/IssueBoxes";
import ShortenedText from '../util/ShortendText';
import Footer from "./Footer";
const loadBtn = document.querySelector(".load-btn") as HTMLButtonElement;


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
  state: string;
  state_reason: string;
}

function IssueBoxes() {
  const boxesRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useRecoilState(pageAtom);
  const { data, isLoading, isSuccess } = useQuery(
    [page],
    () => fetchIssues(page),
    { cacheTime: 1000 * 60 * 60 }
  );
  const [renderedData, setRenderedData] = useRecoilState(renderedDataAtom);
  const [filteredData, setFilteredData] = useRecoilState(issueStateSelector);
  const [issueState, setIssueState] = useRecoilState(issueStateAtom);

  useEffect(()=>{
    setRenderedData(filteredData);
  }, [issueState]);

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
    setIssueState("open");
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
        {renderedData.map((data: IBoxData) =>
          data.isAdBanner && isSuccess ? (
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
            <Link
              to={`/issue/${data.number}`}
              key={data.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <IssueBox>
                <BoxHeader>
                  <IssueState>
                    {data.state == "open" ? (
                      <AdjustIcon color="success" />
                    ) : data.state == "closed" ? (
                      data.state_reason == "completed" ? (
                        <CheckCircleOutlineIcon color="secondary" />
                      ) : (
                        <RemoveCircleOutlineIcon />
                      )
                    ) : null}
                  </IssueState>
                  <IssueTitle>
                    {ShortenedText(data?.title || "")}
                    <IssueNum>#{data.number}</IssueNum>
                  </IssueTitle>
                  <CreatedAt><span>{formatDate(data.updated_at || "")}</span></CreatedAt>
                </BoxHeader>
                <BoxMeta>
                  <CommentsInfo><ChatBubbleOutlineIcon fontSize='inherit'/> {data.comments}</CommentsInfo>
                </BoxMeta>
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

import tw from "tailwind-styled-components";
import styled from "styled-components";

export const Boxes = tw.div`flex flex-col w-full justify-center align-middle gap-[10px] pb-[50px]`;

export const IssueBox = styled.div`
  border: 1px solid;
  width: 90%;
  min-height: 80px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "header comment"
    "meta comment";
    padding: 10px;
`;
export const BoxHeader = styled.div`
  grid-area: header;
`;
export const IssueNum = tw.span``;
export const IssueTitle = tw.span``;
export const BoxMeta = styled.div`
  grid-area: meta;
`;
export const Writer = tw.span``;
export const CreatedAt = tw.span``;
export const CommentsInfo = styled.span`
  grid-area: comment;
`;
export const AdBox = tw.div`
  cursor-pointer
`;
export const EndBox = tw.div`
bg-red-300 font-bold text-red-600
`;
export const LoadingCover = tw.div`
fixed z-20 top-0 h-full w-full text-3xl flex justify-center place-items-center bg-gray-500/50 text-white`;

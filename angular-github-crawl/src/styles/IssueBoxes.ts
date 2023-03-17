import tw from "tailwind-styled-components";
import styled from "styled-components";

export const Boxes = tw.div`flex flex-col w-full justify-center align-middle gap-[10px] pb-[50px]`;

export const IssueBox = styled.div`
  border: 1px solid;
  width: 90%;
  min-height: 80px;
  display: grid;
  grid-template-rows: 2fr 1fr;
    padding: 10px;
`;
export const BoxHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  margin-bottom: 10px;
`;
export const IssueNum = tw.span`ml-2 text-gray-400`;
export const IssueTitle = tw.span``;
export const BoxMeta = styled.div`
display:grid;
  grid-template-columns: 1fr 6fr 1fr;
`;
export const Writer = tw.span``;
export const CreatedAt = tw.div`text-gray-500 flex justify-end mr-2`;
export const CommentsInfo = tw.div`border-[0.5px] border-gray-400 col-start-2 rounded-xl px-2 pt-[1px] text-xs w-fit h-5`;
export const AdBox = tw.div`
  cursor-pointer
`;
export const EndBox = tw.div`
bg-red-300 font-bold text-red-600
`;
export const LoadingCover = tw.div`
fixed z-20 top-0 h-full w-full text-3xl flex justify-center place-items-center bg-gray-500/50 text-white`;

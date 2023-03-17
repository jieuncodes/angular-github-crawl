import { render } from "@testing-library/react";
import {atom, selector} from "recoil";

export const pageAtom = atom<number>({
    key:"page",
    default:0,
})

export const renderedDataAtom = atom<any>({
    key:"renderedIssues",
    default:[],
});

export const issueStateAtom = atom<string>({
    key:"issueState",
    default:"open",
})

export const issueStateSelector = selector({
    key: "filteredIssues",
    get: ({get}) => {
        const issueState = get(issueStateAtom);
        const renderedData = get(renderedDataAtom);
        console.log("renderedData",renderedData);

        const filteredData = renderedData.filter((data: { state: string; }) => data.state === issueState);
        console.log("RENDEREDDATA", renderedData )
        console.log(filteredData);


        return filteredData;
    },
    set: ({set}, newValue) => {
        set(issueStateAtom, newValue);
    }

})
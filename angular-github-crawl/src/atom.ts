import {atom} from "recoil";

export const pageAtom = atom<number>({
    key:"page",
    default:0,
})

export const renderedDataAtom = atom<any>({
    key:"renderedIssues",
    default:[],
});

export const repoOwnerAtom = atom({
    key:"owner",
    default: "",
})

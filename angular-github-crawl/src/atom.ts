import {atom} from "recoil";

export const perPageAtom = atom<number>({
    key:"perPage",
    default: 10,
})
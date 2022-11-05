import { IPromptData } from "../IPromptData";

const toSDPlugins = [
    (i: IPromptData) => {
        if (i.emphasize) {
            i.weight = (
                1.05 ** i.emphasize +
                parseFloat(i.weight ?? "0")
            ).toFixed(3);
            i.emphasize = 0;
        }
        return i;
    },
];

export const toSD = (NAI: IPromptData[], options?: {}) => {
    return NAI.map((i) => {
        const newData = { ...i };
        toSDPlugins.forEach((p) => p(newData));
        return newData;
    });
};

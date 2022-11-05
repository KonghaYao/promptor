import { IPromptData } from "../IPromptData";

const toNAIPlugins = [
    (i: IPromptData) => {
        if (i.emphasize) {
            i.weight = (
                1.05 ** -i.emphasize +
                parseFloat(i.weight ?? "0")
            ).toFixed(3);
            i.emphasize = 0;
        }
        return i;
    },
    (i: IPromptData) => {
        if (i.weight) {
            // ! 如果 NAI 转换符号大致相等。。。
            i.emphasize = Math.round(
                Math.round(Math.pow(parseFloat(i.weight), 1 / 1.05) * 1000) /
                    1000
            );
            delete i.weight;
        }
        return i;
    },
];

export const toNAI = (NAI: IPromptData[], options?: {}) => {
    return NAI.map((i) => {
        const newData = { ...i };
        toNAIPlugins.forEach((p) => p(newData));
        return newData;
    });
};

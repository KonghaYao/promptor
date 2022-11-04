import { convertToString } from "./convertToString";
import { IPromptData } from "./IPromptData";

/** 将用户的 Tag 转化为字符串 */

export const TagsToPrompt = (data: IPromptData[], positive = "()") => {
    return data
        .map((i) => {
            const count = Math.abs(i.emphasize);
            const tag = i.emphasize > 0 ? positive : "[]";
            return (
                tag[0].repeat(count) + convertToString(i) + tag[1].repeat(count)
            );
        })
        .join(",");
};

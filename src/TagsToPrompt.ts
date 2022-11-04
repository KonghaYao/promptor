import { convertToString } from "./convertToString";
import { IPromptData } from "./IPromptData";

/**
 * 将输入的 IPromptData 转化为字符串
 * @param positive 这里可以输入强调标签 {} 或者 ()
 */
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

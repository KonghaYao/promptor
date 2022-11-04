import { promptParserDecorator } from "./promptParserDecorator";
import { promptToTagData } from "./promptToTagData";
import { IPromptData } from "./IPromptData";

/** 将字符串转化为 Tag 数组 */

export const PromptToTags = (s: string): IPromptData[] => {
    const data = promptToTagData(s);
    // console.log(data, s);
    return data.map((i) => promptParserDecorator(i));
};

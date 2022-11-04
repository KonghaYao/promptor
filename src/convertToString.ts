import { IPromptData } from "./IPromptData";

/** 处理 Stable Diffusion 特殊语法为字符串 */
export const convertToString = (data: IPromptData) => {
    /** [from:to:weight],[from::weight],[to:weight] */
    if (
        data.fromTo &&
        data.fromTo.length === 2 &&
        typeof data.weight === "string"
    )
        return `[${
            data.fromTo[0] === "" ? data.fromTo[1] : data.fromTo.join(":")
        }:${data.weight}]`;

    // (tags:weight)
    if (typeof data.weight === "string") return `(${data.text}:${data.weight})`;

    // [dog|cat|cow]
    if (data.alternatingArr && data.alternatingArr.length)
        return `[${data.alternatingArr.join("|")}]`;
    return data.text;
};

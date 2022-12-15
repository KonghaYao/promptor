import { IPromptData } from "./IPromptData";

/**
 * 从字符串中识别出 emphasize ，并且分割字符串为单独的字串
 * 主要实现方式：递归 + 括号边界匹配
 */
export const promptToTagData = (s: string) => {
    return mainLoop(`,${s},`, 0);
};

const mainLoop = (s: string, baseEm = 0): IPromptData[] => {
    /** 声明左括号的数组 */
    let lel = "({[（";

    /** 声明右括号的数组 */
    let rgl = ")}]）";

    /** 声明分割符号的数组 */
    let splitSymbol = ",，";

    /** 记录上一个切割的位置 */
    let lastStopCursor = 0;
    /**  记录平台基础值，左加右减，归零时进行字符串收割 */
    let emphasizeCount = 0;

    /** 收集每一个括号分割部分 */
    let piece: string[] = [];
    for (let i = 0; i < s.length; i++) {
        const item = s[i];
        if (
            i === s.length - 1 ||
            (splitSymbol.includes(item) && emphasizeCount === 0)
        ) {
            piece.push(s.slice(lastStopCursor, i + 1));
            lastStopCursor = i + 1;
        } else if (lel.includes(item)) {
            item === "[" ? emphasizeCount-- : emphasizeCount++;
        } else if (rgl.includes(item)) {
            item === "]" ? emphasizeCount++ : emphasizeCount--;
        }
    }
    // console.log(piece);
    // debugger;
    return (
        piece
            /** 排除分隔符的影响 */
            .filter((i) => !splitSymbol.includes(i))
            /** Only Gold Knows */
            .flatMap((i) => {
                if (i.length === 0) return [];
                let a = 0;
                let b = i.length - 1;
                let emphasize = 0;
                let count = 0;
                let start = [];

                while (a < b) {
                    const left = i[a];
                    if (left === " " || splitSymbol.includes(left)) {
                        a++;
                        continue;
                    } else if (lel.includes(left)) {
                        start.push(a);
                        left === "[" ? emphasize-- : emphasize++;
                        count++;
                        a++;
                    }
                    const right = i[b];
                    if (right === " " || splitSymbol.includes(right)) {
                        b--;
                    } else if (rgl.includes(right)) {
                        if (count === 0) break;
                        b--;
                        count--;
                    } else {
                        break;
                    }
                }

                emphasize = count === 0 ? emphasize : emphasize - count;
                if (a === b + 1) return [];

                if (count !== 0) {
                    // 到最后 count 居然还有，说明错误了，需要进行纠正
                    a = start.at(-count);
                }
                const text = i.slice(a, b + 1);
                // 如果 text===i 会导致重复循环错误
                if (
                    text !== i &&
                    [...splitSymbol].some((i) => text.includes(i))
                ) {
                    // 递归，如果有分割符号，那么可以再分
                    return mainLoop(text, emphasize + baseEm);
                }
                return [{ text, emphasize: emphasize + baseEm }];
            })
    );
};

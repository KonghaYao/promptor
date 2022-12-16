import { IPromptData } from "./IPromptData";

/**
 * 从字符串中识别出 emphasize ，并且分割字符串为单独的字串
 * 主要实现方式：递归 + 括号边界匹配
 */
export const promptToTagData = (s: string) => {
    return mainLoop(`,${s},`, 0);
};

/** 声明左括号的数组 */
let lel = "({[（";

/** 声明右括号的数组 */
let rgl = ")}]）";

/** 声明分割符号的数组 */
let splitSymbol = ",，";
const getPiece = (s: string, forceRight = false) => {
    /** 记录上一个切割的位置 */
    let lastStopCursor = 0;
    /**  记录平台基础值，左加右减，归零时进行字符串收割 */
    let emphasizeCount = 0;

    /** 收集每一个括号分割部分 */
    let piece: string[] = [];
    for (let i = 0; i < s.length; i++) {
        const item = s[i];
        if (lel.includes(item)) {
            item === "[" ? emphasizeCount-- : emphasizeCount++;
        } else if (rgl.includes(item)) {
            item === "]" ? emphasizeCount++ : emphasizeCount--;
        }
        if (
            i === s.length - 1 ||
            (emphasizeCount === 0 &&
                (splitSymbol.includes(item) ||
                    // 第二轮纠正的时候，进行一个 错误排除
                    (forceRight && [...rgl, ...lel].includes(item))))
        ) {
            piece.push(s.slice(lastStopCursor, i + 1));
            lastStopCursor = i + 1;
        }
    }
    if (
        emphasizeCount !== 0 &&
        [...splitSymbol].some((i) => piece.at(-1).includes(i))
    ) {
        // console.log(s, emphasizeCount, piece);
        // debugger;
        // 强调层次错误了，必定是最后一个部分的问题
        const it = getPiece(piece.at(-1).split("").reverse().join(""), true)
            .map((i) => i.split("").reverse().join(""))
            .reverse();
        // console.warn(it, s);
        piece.pop();
        piece.push(...it);
    }
    return piece;
};
const mainLoop = (s: string, baseEm = 0): IPromptData[] => {
    const piece = getPiece(s);
    // debugger;
    return (
        piece
            /** 排除分隔符的影响 */
            .filter((i) => !splitSymbol.includes(i))
            .flatMap((i) => {
                /** 删除左右两侧的括号，并递归解析 */
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

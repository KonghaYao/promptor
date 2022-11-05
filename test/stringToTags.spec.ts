import { describe, it, expect } from "vitest";
import { promptToTagData } from "../src/promptToTagData";

/** 非最终结果测试，这是中间函数的测试 */
describe("Prompt 解析第一步测试", () => {
    it("正常括号测试", () => {
        const info = promptToTagData(
            "dream,(((extremely detailed, CG unity, {8k wallpaper}))),{painting},(detailed flooding bare feet:1.5)"
        );
        // console.log(info);
        expect(info).eql([
            { text: "dream", emphasize: 0 },
            { text: "extremely detailed", emphasize: 3 },
            { text: "CG unity", emphasize: 3 },
            { text: "8k wallpaper", emphasize: 4 },
            { text: "painting", emphasize: 1 },
            { text: "detailed flooding bare feet:1.5", emphasize: 1 },
        ]);
    });
    it("正常括号测试2", () => {
        const info = promptToTagData("(a), ((b c)), ((((d)))), [g]");
        // console.log(info);
        expect(info).eql([
            { text: "a", emphasize: 1 },
            { text: "b c", emphasize: 2 },
            { text: "d", emphasize: 4 },
            { text: "g", emphasize: -1 },
        ]);
    });
    it("负向括号获取", () => {
        const info = promptToTagData(",[info],[[black,cursor,delete]]");
        expect(info).eql([
            { text: "info", emphasize: -1 },
            { text: "black", emphasize: -2 },
            { text: "cursor", emphasize: -2 },
            { text: "delete", emphasize: -2 },
        ]);
    });
    it("重叠括号获取", () => {
        const info = promptToTagData(
            "(music {alpha}),{{music {beta}}},[music {fin}],{{{music} beta}},[[{music} beta]],ganyu (Ganshin Impact),white {starry} stocking "
        );
        // console.log(info);
        expect(info).eql([
            {
                emphasize: 1,
                text: "music {alpha}",
            },
            {
                emphasize: 2,
                text: "music {beta}",
            },
            {
                emphasize: -1,
                text: "music {fin}",
            },
            {
                emphasize: 2,
                text: "{music} beta",
            },
            {
                emphasize: -2,
                text: "{music} beta",
            },
            {
                emphasize: 0,
                text: "ganyu (Ganshin Impact)",
            },
            {
                emphasize: 0,
                text: "white {starry} stocking",
            },
        ]);
    });
});

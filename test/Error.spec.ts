import { describe, it, expect } from "vitest";
import { promptToTagData } from "../src/promptToTagData";

/** 非最终结果测试，这是中间函数的测试 */
describe("错误解析测试", () => {
    it("左括号错误测试", () => {
        const info = promptToTagData(
            "(((extremely detailed, CG unity, {8k wallpaper})),{painting}"
        );
        expect(info).eql([
            {
                emphasize: 2,
                text: "extremely detailed",
            },
            {
                emphasize: 2,
                text: "CG unity",
            },
            {
                emphasize: 3,
                text: "8k wallpaper",
            },
            {
                emphasize: 1,
                text: "painting",
            },
        ]);
    });
    it("左括号错误测试2", () => {
        const info = promptToTagData(
            "(((((extremely detailed, CG unity, {8k wallpaper})),{painting}"
        );
        expect(info).eql([
            {
                emphasize: 2,
                text: "extremely detailed",
            },
            {
                emphasize: 2,
                text: "CG unity",
            },
            {
                emphasize: 3,
                text: "8k wallpaper",
            },
            {
                emphasize: 1,
                text: "painting",
            },
        ]);
    });
});

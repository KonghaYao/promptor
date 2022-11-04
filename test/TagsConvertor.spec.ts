import { describe, it, expect } from "vitest";
import { TagsToPrompt } from "../src/TagsToPrompt";
import { PromptToTags } from "../src/PromptToTags";

/**
 *
 * 全测试魔咒 (a), ((b c)), ((((d)))),[g],(e:1.5),[cow|horse],[cow|horse|dog|cat],[mountain:lake:0.25],[in foreground::0.6],[ in foreground:0.6]
 */
describe("魔咒字符串解析", () => {
    it("通用字符串转魔咒测试", () => {
        const data = PromptToTags("(a), ((b c)), ((((d)))), [g]");
        // console.log(data);
        expect(data).eql([
            { text: "a", emphasize: 1 },
            { text: "b c", emphasize: 2 },
            { text: "d", emphasize: 4 },
            { text: "g", emphasize: -1 },
        ]);
    });
    it("SD (tag:number) 数值权重测试", () => {
        const data = PromptToTags("(e:1.5)");
        expect(data).eql([
            {
                text: "e",
                weight: "1.5",
                emphasize: 0,
            },
        ]);
    });
    it("SD [cow|horse] Alternating Words", () => {
        const data = PromptToTags("[cow|horse],[cow|horse|dog|cat]");
        expect(data).eql([
            {
                text: "cow|horse",
                emphasize: 0,
                alternatingArr: ["cow", "horse"],
            },
            {
                text: "cow|horse|dog|cat",
                emphasize: 0,
                alternatingArr: ["cow", "horse", "dog", "cat"],
            },
        ]);
    });
    it("SD [from:to:when] Prompt editing", () => {
        const data = PromptToTags(
            "[mountain:lake:0.25],[in foreground::0.6],[ in foreground:0.6]"
        );
        expect(data).eql([
            {
                text: "mountain:lake:0.25",
                emphasize: 0,
                weight: "0.25",
                fromTo: ["mountain", "lake"],
            },
            {
                text: "in foreground::0.6",
                emphasize: 0,
                weight: "0.6",
                fromTo: ["in foreground", ""],
            },
            {
                text: "in foreground:0.6",
                emphasize: 0,
                weight: "0.6",
                fromTo: ["", "in foreground"],
            },
        ]);
    });
    it("不同括号统一", () => {
        const data = PromptToTags("(a), ((b c)), ((((d))))");
        const data1 = PromptToTags("{a}, {{b c}}, {{{{d}}}}");
        const data2 = PromptToTags("（a）, （（b c））, （（（（d））））");
        const data3 = PromptToTags("（a）， （（b c））， （（（（d））））");
        expect(data)
            .eql(data1)
            .eql(data2)
            .eql(data3)
            .eql([
                { text: "a", emphasize: 1 },
                { text: "b c", emphasize: 2 },
                { text: "d", emphasize: 4 },
            ]);
    });
});
describe("魔咒数据转字符串", () => {
    it("通用字符串转魔咒测试", () => {
        const data = PromptToTags("(a), ((b c)), ((((d)))), [g]");
        expect(TagsToPrompt(data)).eql("(a),((b c)),((((d)))),[g]");
    });
    it("SD (tag:number) 数值权重测试", () => {
        const data = PromptToTags("(e:1.5),(a:0.273)");
        expect(TagsToPrompt(data)).eql("(e:1.5),(a:0.273)");
    });
    it("SD [cow|horse] Alternating Words", () => {
        const data = PromptToTags("[cow|horse],[cow|horse|dog|cat]");
        expect(TagsToPrompt(data)).eql("[cow|horse],[cow|horse|dog|cat]");
    });
    it("SD [from:to:when] Prompt editing", () => {
        const data = PromptToTags(
            "[mountain:lake:0.25],[in foreground::0.6],[ in foreground:0.6]"
        );
        expect(TagsToPrompt(data)).eql(
            "[mountain:lake:0.25],[in foreground::0.6],[in foreground:0.6]"
        );
    });
});

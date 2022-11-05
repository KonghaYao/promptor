import { describe, it, expect } from "vitest";
import { PromptToTags } from "../src";
import { toNAI } from "../src/Convertor/2NAI";
import { toSD } from "../src/Convertor/2SD";

/** 非最终结果测试，这是中间函数的测试 */
describe("NAI 与 SD 等价交换测试", () => {
    it("NAI -> SD 括号权重测试", () => {
        const info = toSD(PromptToTags("{one},{{two}},[-one],[[-two]]"), {});
        expect(info).eql([
            { text: "one", emphasize: 0, weight: "1.050" },
            { text: "two", emphasize: 0, weight: "1.103" },
            { text: "-one", emphasize: 0, weight: "0.952" },
            { text: "-two", emphasize: 0, weight: "0.907" },
        ]);
        // console.log(info);
    });
    it("NAI*SD -> SD 括号权重测试", () => {
        // ! 混杂数据转换，如果在 NAI 中混入 ( ,视为 {，并进行计算而非视为 SD 的权重计算

        const origin = PromptToTags("((one:0.23)),((two))");
        const info = toSD(origin, {});

        expect(info).eql([
            { text: "one", emphasize: 0, weight: "1.280" },
            { text: "two", emphasize: 0, weight: "1.103" },
        ]);
        // console.log(info);
    });
    it("SD -> NAI 括号权重测试", () => {
        const info = toNAI(
            PromptToTags("(one),((two)),[-one],[[-two]],(one_sp:1.050)"),
            {}
        );
        console.log(info);
        // console.log(info);
    });
});

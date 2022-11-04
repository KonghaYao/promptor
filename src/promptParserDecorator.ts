import { IPromptData } from "./IPromptData";

/** 2. 流程修饰函数，用于解析 Stable Diffusion 的独特语法 */
export const promptParserDecorator = (data: IPromptData) => (
    [
        // Prompt editing
        (data: IPromptData) => {
            if (data.emphasize <= -1) {
                const [_, from, to, weight] =
                    data.text.match(/([^:]+):([^:]*):([\d\.]+)/) ?? [];
                if (_) {
                    data.weight = weight;
                    data.fromTo = [from, to];
                    data.emphasize++;
                    return true;
                } else {
                    const [_, to, weight] =
                        data.text.match(/([^:]+):([\d\.]+)/) ?? [];
                    if (_) {
                        data.emphasize++;
                        data.weight = weight;
                        data.fromTo = ["", to];
                        return true;
                    }
                }
            }
            return false;
        },
        // 数值权重修饰
        (data: IPromptData) => {
            if (data.emphasize >= 1) {
                const [_, key, weight] =
                    data.text.match(/(.+):([\d\.]+)/) ?? [];
                if (_) {
                    data.weight = weight;
                    data.text = key;
                    data.emphasize--;
                    return true;
                }
            }
            return false;
        },
        // 可选融合
        (data: IPromptData) => {
            if (data.emphasize <= -1) {
                if (data.text.includes("|")) {
                    data.emphasize++;
                    data.alternatingArr = data.text
                        .split("|")
                        .map((i) => i.trim());
                    return true;
                }
            }
            return false;
        },
    ].some((i) => {
        return i(data);
    }),
    data
);

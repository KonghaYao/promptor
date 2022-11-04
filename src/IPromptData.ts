/** 解析出来的统一数据 */
export interface IPromptData {
    text: string;
    /** 强调数目 */
    emphasize: number;
    /** 数值权重, 由于解析精度问题，故不进行改变 */
    weight?: string;
    /** 融合语法 */
    alternatingArr?: string[];
    /** Prompt editing*/
    fromTo?: [string, string];
}

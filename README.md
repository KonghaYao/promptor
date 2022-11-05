# AI 绘图 Prompt 解析库

![](https://img.shields.io/npm/l/promptor)
![](https://img.shields.io/npm/v/promptor)

1. 本项目从 [魔导绪论项目](https://github.com/KonghaYao/ai-tag) 分离出来，是用于 Prompt 字符串解析的一个库。
2. 魔导绪论项目的一键导入和一键导出功能都是基于这个库进行操作的

## 功能

具体功能 Typescript 有提示，这里只是把导出的名称列举一下。同时，所有的测试例子其实都是 DEMO，非常简单，详见 [代码](./test/TagsConvertor.spec.ts)。

-   [x] [IPromptData](./src/IPromptData.ts): Prompt 魔咒解析为的对象 interface
-   [x] PromptToTags: 字符串魔咒转 IPromptData 格式
-   [x] TagsToPrompt: IPromptData 转化为字符串
-   [x] 支持 [数值加权](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis) ,[Prompt editing](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#prompt-editing), [Alternating Words](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#alternating-words) （Stable Diffusion 专有）
-   [x] 支持 Novel AI Tag 解析
-   [ ] 支持 NAI 和 SD Tag 等价交换（开发中）

## License

MIT

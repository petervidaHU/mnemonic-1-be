import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import { initialPrompt, selectorPrompt } from './Prompts';
import { JSONFunctionSchemaIn } from './schemas';
import { returnObject, sanitizeLogicOutput } from './utilities';

export const invokeLLM = async (data: Array<string>) => {
  const chatModel = new ChatOpenAI({
    temperature: 1,
    maxTokens: 200,
    modelName: 'gpt-3.5-turbo',
    // modelName: 'gpt-4',
    openAIApiKey: process.env.OPENAI_KEY,
  });

  const promptForLogic = new PromptTemplate({
    inputVariables: ['acronyms'],
    template: initialPrompt,
  });

  const promptForSelector = new PromptTemplate({
    inputVariables: ['mnemonicsArray'],
    template: selectorPrompt,
  });

  const logicChain = RunnableSequence.from([
    promptForLogic,
    chatModel,
    new StringOutputParser(),
  ]);

  const selectorChain = RunnableSequence.from([
    promptForSelector,
    chatModel.bind({
      functions: [JSONFunctionSchemaIn],
      function_call: { name: 'extractor' },
    }),
    new JsonOutputFunctionsParser(),
  ]);

  const combinedChain = RunnableSequence.from([
    {
      acronyms: (i) => i.acronyms,
    },
    {
      mnemonicsList: logicChain,
      original: (i) => i.acronyms,
    },
    sanitizeLogicOutput,
  ]);

  const getStarterMnemonics = async (data) => {
    type ResponseType = any;
    let response: ResponseType;
    let i = 0;

    do {
      response = await combinedChain.invoke({
        acronyms: data.join(', '),
      });
      i++;
    } while (
      i < 5 &&
      response.mnemonicsArray &&
      response.mnemonicsArray.length === 0
    );

    return response;
  };

  const getResponse = async (responseArray: Array<string>) => {
    if (responseArray.length < 3) return returnObject(data, responseArray);

    const { answers } = await selectorChain.invoke({
      mnemonicsArray: responseArray,
    });

    return returnObject(data, answers);
  };

  const { mnemonicsArray } = await getStarterMnemonics(data);

  return getResponse(mnemonicsArray);
};

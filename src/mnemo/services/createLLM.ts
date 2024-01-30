import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import { getInitialPrompt, selectorPrompt } from './Prompts';

const JSONFunctionSchema = {
  name: 'extractor',
  description: 'Extracts Arrays of strings from the input.',
  parameters: {
    type: 'object',
    properties: {
      answer1: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'The first array of the input',
      },
      answer2: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'The first array of the input',
      },
      answer3: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'The first array of the input',
      },
    },
    required: [],
  },
};

export const invokeLLM = async (data: Array<string>) => {
  const outputParser = new StringOutputParser();
  const JsonOutputParser = new JsonOutputFunctionsParser();

  const initialPrompt = getInitialPrompt();

  const chatModel = new ChatOpenAI({
    temperature: 1,
    maxTokens: 200,
    modelName: 'gpt-3.5-turbo',
    // modelName: 'gpt-4',
    openAIApiKey: process.env.OPENAI_KEY,
  });

  const prompt1 = new PromptTemplate({
    inputVariables: ['obj'],
    template: initialPrompt,
  });

  const prompt2 = new PromptTemplate({
    inputVariables: ['i'],
    template: selectorPrompt,
  });

  const logicChain = RunnableSequence.from([prompt1, chatModel, outputParser]);

  const selectorChain = RunnableSequence.from([
    prompt2,
    chatModel.bind({
      functions: [JSONFunctionSchema],
      function_call: { name: 'extractor' },
    }),
    JsonOutputParser,
  ]);

  const combinedChain = RunnableSequence.from([
    {
      obj: (inp) => inp.obj,
    },
    {
      i: logicChain,
    },
    selectorChain,
  ]);

  const resp = await combinedChain.invoke({
    obj: JSON.stringify(data),
  });

  return resp;
};

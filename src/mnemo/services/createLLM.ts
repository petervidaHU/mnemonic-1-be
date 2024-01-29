import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { OpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { CreateMnemoDto } from 'src/dto/create-mnemo';
import { getInitialPrompt, selectorPrompt } from './Prompts';

export const invokeLLM = async (data: CreateMnemoDto) => {
  const { characters } = data;

  const initialPrompt = getInitialPrompt();

  const chatModel = new OpenAI({
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

  const outputParser = new StringOutputParser();

  const logicChain = RunnableSequence.from([prompt1, chatModel, outputParser]);

  const selectorChain = RunnableSequence.from([
    prompt2,
    chatModel,
    outputParser,
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
    obj: JSON.stringify(characters),
  });

  return resp;
};

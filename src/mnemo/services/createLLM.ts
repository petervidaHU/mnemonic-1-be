import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { CreateMnemoDto } from 'src/dto/create-mnemo';

const createText =
  'create an easily memorizable related text (mnemonic) for this acronym: {acronims}. ';

export const invokeLLM = (data: CreateMnemoDto) => {
  const { longText, description, globalOptions } = data;
  const acronym = longText
    .map(({ char }) => {
      return char[0];
    })
    .join(', ');
  console.log('data: ', acronym);

  const chatModel = new ChatOpenAI({
    maxTokens: 30,
    openAIApiKey: process.env.OPENAI_KEY,
  });

  const prompt1 = new PromptTemplate({
    inputVariables: ['acronims'],
    template: createText,
  });

  const myChain = prompt1.pipe(chatModel);

  // return null;

  return myChain.invoke({
    acronims: acronym,
  });
};

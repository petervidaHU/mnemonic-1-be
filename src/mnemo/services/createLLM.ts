import { v4 as uuidv4 } from 'uuid';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import { initialPrompt, selectorPrompt } from './Prompts';

const JSONFunctionSchemaIn = {
  name: 'extractor',
  description: 'Extracts strings from the input Array.',
  parameters: {
    type: 'object',
    properties: {
      answer1: {
        type: 'string',
        description: 'The first item of the input',
      },
      answer2: {
        type: 'string',
        description: 'The second item of the input',
      },
      answer3: {
        type: 'string',
        description: 'The third item of the input',
      },
    },
    required: [],
  },
};

const clearing = (inputString: string) =>
  inputString.replace(/^\d+\.\s/gm, '').replace(/\n/g, '');

const sanitizeLogicOutput = ({
  mnemonicsList,
  original,
}: {
  mnemonicsList: string;
  original: string;
}) => {
  const originalArray = original.split(', ');
  const mnemonics = mnemonicsList.split('/');

  const finalMnemonics: Array<string> = mnemonics
    .filter((mnemonic) => {
      const thisMnemo = clearing(mnemonic).trim().split(' ');
      return thisMnemo.length === originalArray.length;
    })
    .map((filteredMnemo) => filteredMnemo.trim())
    .filter((mnemo) =>
      mnemo.split(' ').every((word, idx) => word[0] === originalArray[idx]),
    );

  return {
    mnemonicsArray: finalMnemonics,
  };
};

export const invokeLLM = async (data: Array<string>) => {
  const chatModel = new ChatOpenAI({
    temperature: 1,
    maxTokens: 200,
    modelName: 'gpt-3.5-turbo',
    // modelName: 'gpt-4',
    openAIApiKey: process.env.OPENAI_KEY,
  });

  const promptForLogic = new PromptTemplate({
    inputVariables: ['obj'],
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

  const checkBeforeSelector = ({
    mnemonicsArray,
  }: {
    mnemonicsArray: Array<string>;
  }) => {
    if (mnemonicsArray.length > 0) {
      console.log('memonicsarray is 1', mnemonicsArray);
      return selectorChain;
    } else {
      console.log('menomibcsarr 0');
      return null;
    }
  };

  const combinedChain = RunnableSequence.from([
    {
      obj: (inp) => inp.obj,
    },
    {
      mnemonicsList: logicChain,
      original: (inp) => inp.obj,
    },
    sanitizeLogicOutput,
    checkBeforeSelector,
  ]);

  let response: RunnableSequence<{ mnemonicsArray: any }, never> | null;
  let i = 0;

  do {
    response = await combinedChain.invoke({
      obj: data.join(', '),
    });
    i++;
  } while (i < 5 && response == null);

  const returnObject = (r: RunnableSequence<{ mnemonicsArray: any }, never>) =>
    Object.values(r)
      .filter((answer) => answer !== '')
      .map((answer) => ({
        id: uuidv4(),
        text: answer,
      }));

  return response == null ? [] : returnObject(response);
};

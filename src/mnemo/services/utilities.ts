import { v4 as uuidv4 } from 'uuid';

const clearing = (inputString: string) =>
  inputString.replace(/^\d+\.\s/gm, '').replace(/\n/g, '');

export const sanitizeLogicOutput = ({
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

export const returnObject = (rawResponse: Array<string>) =>
  rawResponse
    .filter((answer) => answer !== '')
    .map((answer) => ({
      id: uuidv4(),
      text: answer,
    }));

import { MnemoApiResponse } from 'src/types/mnemoTypes';
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
  console.log('----start sanitizing------');

  const finalMnemonics: Array<string> = mnemonics
    .filter((mnemonic) => {
      console.log('mnemos in sanitizng before: ', mnemonic);
      const thisMnemo = clearing(mnemonic).trim().split(' ');
      console.log('mnemos in sanitizng after: ', thisMnemo);
      return thisMnemo.length === originalArray.length;
    })
    .map((filteredMnemo) => filteredMnemo.trim())
    .filter((mnemo) =>
      mnemo.split(' ').every((word, idx) => word[0] === originalArray[idx]),
    );

  console.log('final sanitized: ', finalMnemonics);
  console.log('----end sanitizing------');
  return {
    mnemonicsArray: finalMnemonics,
  };
};

export const returnObject = (
  acronym,
  rawResponse: Array<string>,
): MnemoApiResponse => ({
  acronyms: acronym.join(''),
  data: rawResponse
    .filter((answer) => answer !== '')
    .map((answer) => ({
      id: uuidv4(),
      text: answer,
    })),
});

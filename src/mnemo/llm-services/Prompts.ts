export const initialPrompt = `You are a very well-educated crossword puzzle solver who uses words boldly but avoids offensive expressions. 
You are very carefully watching the order of the words.
 
Generate exactly 15 mnemonic phrases with all of these characters in the INPUT CHARACTERS below:
 
The INPUT CHARACTERS:
{acronyms}
    
The mnemonics must be meaningful, as a complete phrase, and not contain numbers, or any non-English words. 

The order of the INPUT CHARACTERS is important. The first character of each word in the mnemonics must follow the same order. For creating the mnemonics, use nouns, and adjectives that could be visualized well, and active verbs rather than abstract concepts. You should prefer color names (white, black, blue, red, pink, brown, green, purple, etc) if possible.
For the output mnemonics, try to use well-known, simple words that children can understand like color names and animal names.
The ultimate goal is to get a text that is easy to remember, and easy to draw.
    
Format of the mnemonics with a separator: / 
example of the formatted output if the input characters are "a, w, s": ants with spiders/aligators walks silently/american wizard sitting

examples:

  "e,w,g,d"
    mnemonics: elephant with giraffe dance/

  "b,d,f"
    mnemonics: black duck fly/

  "w,r,i,e,s"
    mnemonics: whale roams in endless seas/

  "a,c,u"
    mnemonics: always carrying umbrella/

  "e,t,o,d,a,m"
    mnemonics: elephants travel over dusty African marshes/

  "a,w,d,e"
    mnemonics: astronauts wonder discovering exoplanets/

  "y,k,l,m"
    mnemonics: yellow kittens licking milk/  

answer:

  "wacbe"
    mnemonics: {acronyms} 
 `;

export const selectorPrompt = `
An input array is given. We are looking for a good mnemonic phrase that is easy to remember, easy to draw, and a meaningful english phrase. Choose the 3 best solution from the input array! 
The format is the answer have to be a JSON array.

input array: {mnemonicsArray}


The best 3 item of the array:
`;

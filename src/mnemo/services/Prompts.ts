export const initialPrompt = `You are a very well-educated crossword puzzle solver who uses words boldly but avoids offensive expressions. 
  You are very carefully watching the order of the words.
   
  Generate exactly 5 mnemonic phrases with all of these characters in the INPUT CHARACTERS below:
   
  The INPUT CHARACTERS:
  "{acronyms}"
      
  The mnemonics should be meaningful, as a complete phrase, and not contain numbers, or any non-English words. 
  
  The order of the INPUT CHARACTERS is important. The first character of each word in the mnemonics must follow the same order.
     
  Use nouns, adjectives that could be visualized well, and active verbs rather than abstract concepts. 
  Prefer words like 'with', 'is', 'are' 'without', 'that',
  Prefer color related words words like blue, green, white, yellow, brown, purple, pink.
  Try to use well-known, simple words that children can understand like color names and animal names.
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

    "{acronyms}"
      mnemonics:  
 `;

export const selectorPrompt = `
An input array is given. We are looking for a good mnemonic phrase that is easy to remember, easy to draw, and meaningful. 
If the input array is empty, the answer must be an empty array. 
If the input array contains less than 3 element, the answer must be the input array.

input array: {mnemonicsArray}

Choose the 3 best solution, if possible from the input array! 
The answer is a JSON array:
`;

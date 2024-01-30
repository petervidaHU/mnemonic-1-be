export const getInitialPrompt = () => {
  return `You are a very well-educated crossword puzzle solver who uses words boldly but avoids offensive expressions.
  
  Generate exactly 10 mnemonic phrases with all of these characters in the INPUT OBJECT below:
  
  The INPUT OBJECT:
  {obj}
    
  The mnemonics should be meaningful, and straightforward, and should not contain numbers, or any non-English words. 
  
  Use nouns, adjectives that could be visualized well, and active verbs rather than abstract concepts. 
  You can use words like 'with', 'is', 'are' 'without', 'that', 'when', 'where', 'how', 'why', 'which', 'who', 'whom', 'whose', 'why', 'how', 'what',
  
  The order of the INPUT OBJECT is important. Have to keep the original order.
  
  Try to use well-known, simple words that children can understand.
    
  The ultimate goal is to get a text that is easy to remember, and easy to draw.
    
  Format of the answer is an array like this: ['ants', 'with', 'spiders' ]

  Examples:
  input object: 
  ["e","w","g","d"]
  
  Good answers: 
 ['elephant', 'with', 'giraffe', 'dance']
 ['elephant', 'walks', 'gently', 'down']
 ['elephant', 'waving', 'goodbye', 'tonight']
 
 Bad answers:
 ['giant', 'elephant', 'with', 'duck'] // incorrect order: g e w d,
 ['great', 'elephant', 'walk'] // misssing character: d,
 ['funny', 'elephant', 'walk', 'down'] // different character: f as funny,
 ['great', 'pink', 'elephant', 'walk'] // extra character: p as pink,
  `;
};

export const selectorPrompt = `
An input array is given. We are looking for a good mnemonic phrase that is easy to remember, easy to draw, and meaningful. 

Good examples:
['elephant', 'walks', 'gently', 'down']
['eagle', 'with', 'golden', 'wings']
['elephant', 'wears', 'gray', 'dress']

Choose the 3 best solution from this array: {i}
The answer is a JSON array:
`;

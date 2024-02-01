export const JSONFunctionSchemaIn = {
  name: 'extractor',
  description: 'Extracts items of the input Array.',
  parameters: {
    type: 'object',
    properties: {
      answers: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'an array of the list items of the input',
      },
    },
  },
  required: [],
};

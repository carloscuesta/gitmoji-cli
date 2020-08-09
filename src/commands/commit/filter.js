const coAuthors = (input: string) => {
  // Clean input
  const coAuthors = input
    .trim()
    .split(',')
    .map((coAuthor) => coAuthor.trim())
    .filter((coAuthor) => !!coAuthor)

  // Remove duplications
  return [...new Set(coAuthors)].join(', ')
}

const refs = (input: string) =>
  input
    .replace(/[^0-9#! ]/g, '')
    .replace(/ +(?= )/g, '')
    .trim()

export default {
  coAuthors,
  refs
}

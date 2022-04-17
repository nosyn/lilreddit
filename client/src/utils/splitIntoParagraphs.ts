export const splitIntoParagraphs = (content: string) =>
  content.split(/\n/).filter((content) => content.length > 0);

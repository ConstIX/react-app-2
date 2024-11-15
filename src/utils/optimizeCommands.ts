export const optimizeCommands = (commands: string): string => {
  return commands.replace(/(.)\1+/g, (match, p1) => `${match.length}${p1}`)
}

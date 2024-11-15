export const calculateFinalPosition = (initialPosition: { x: number; y: number }, commands: string) => {
  const position = { ...initialPosition }

  for (const command of commands) {
    if (command === 'О' || command === 'Б') {
      continue
    }

    switch (command) {
      case 'Л':
        position.x = Math.max(position.x - 1, 0)
        break
      case 'П':
        position.x = Math.min(position.x + 1, 30)
        break
      case 'В':
        position.y = Math.max(position.y - 1, 0)
        break
      case 'Н':
        position.y = Math.min(position.y + 1, 30)
        break
    }
  }

  return position
}

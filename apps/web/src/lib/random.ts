export const generateBlurredName = (id: string): string => {
  const text = "Lorem Ipsum Dolor";
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const chars = text.split('');
  const positions: number[] = [];
  const availablePositions = Array.from({ length: chars.length - 1 }, (_, i) => i);
  
  // Generate 5 random positions to insert spaces
  for (let i = 0; i < 5 && availablePositions.length > 0; i++) {
    const index = (seed + i * 17) % availablePositions.length;
    positions.push(availablePositions[index]);
    availablePositions.splice(index, 1);
  }
  
  // Insert spaces at random positions (from end to start to preserve indices)
  const result = [...chars];
  positions.sort((a, b) => b - a).forEach(pos => {
    result.splice(pos, 0, ' ');
  });
  
  return result.join('');
};


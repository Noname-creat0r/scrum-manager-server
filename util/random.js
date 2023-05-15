exports.getRandomInt = (min, max) => {
  const num = Math.floor(Math.random() * max) 
  return num >= min ? num : min
}

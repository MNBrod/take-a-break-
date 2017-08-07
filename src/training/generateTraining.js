function makeTraining(num) {
  let result = [];
  for (let i = 0; i < num; i++) {
    result.push({
      input: {
        insDel: Math.random(),
        filesChanged: Math.random(),
        time: Math.random()
      },
      output: {}
    });
  }
  return result;
}

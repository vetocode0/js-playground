// Statefarm scrolling numbers sample code.

for (const line of lines) {
    let results = processNumbersInRange(line);
      process.stdout.write(`${results}\n`);

function generateScrollingNumberCandidates (range) {
    const splitRange = range.split(',');
    let numbersInRange = []
    for(let i =0, j = splitRange[0]; i < splitRange[1]; i++, j++)
        numbersInRange[i] = j;
    return numbersInRange;
}

function processNumbersInRange(range){
    let numbersInRange = generateScrollingNumberCandidates(range);
    return numbersInRange.map(isScrollingNumber)
}

function isScrollingNumber (num) {
    let testArray = num.toString().split('');
    const shiftArray = createShiftArray(testArray.length);
    if(isOnlyUniqueNumbers(testArray) && isWithoutZero(testArray) && isScrollable(testArray, 0, 0, shiftArray))
      return num;
  }
  
  function isOnlyUniqueNumbers (testArray) {
    for ( testNum in testArray){
          let filterResult = testArray.filter(function (expected) { return testNum === expected;}).length;
          if(filterResult > 1)
              return false;
      }
      return true;
  }
  
  function isWithoutZero (testArray) {
    if (testArray.includes('0'))
      return false;
    return true;
  }
  
  function isScrollable (arrayString, index = 0, recurseCount = 0, shiftArray) {
      if (recurseCount >= arrayString.length && index === 0){
          return true;
      } 
      if (recurseCount >= arrayString.length && index != 0)
          return false;
      let shiftIteratorPosition = parseInt(arrayString[index]) + index;
      let newIndexPosition = shiftArray[shiftIteratorPosition];
      return isScrollable(arrayString, newIndexPosition, ++recurseCount, shiftArray);
  }
  
  function createShiftArray (arrayLength) {
      let shiftArray = [];
      for(let i = 0; i < 18; i++){
          shiftArray[i] = (i % arrayLength);
      }
      return shiftArray;
  }
  
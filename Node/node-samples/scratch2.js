// Statefarm scrolling numbers sample code.

let test = "147";
processNumbersInRange("200, 300")

function generateScrollingNumberCandidates (range) {
    const splitRange = range.split(',');
    let numbersInRange = []
    for(let i =0, j = splitRange[0]; j < splitRange[1]; i++, j++)
        numbersInRange[i] = j;
    return numbersInRange;
}

function processNumbersInRange(range){
    let numbersInRange = generateScrollingNumberCandidates(range);
    //for ( numbers in numbersInRange)
    let filteredNumbers = numbersInRange.filter(isScrollingNumber);
    return filteredNumbers;
}

function isScrollingNumber (num) {
    let testArray = num.toString().split('');
    const shiftArray = createShiftArray(testArray.length);
    console.log(isOnlyUniqueNumbers(testArray));
    if(isOnlyUniqueNumbers(testArray) && isWithoutZero(testArray) && isScrollable(testArray, 0, 0, shiftArray))
      return true;
    return false;
  }
  
  function isOnlyUniqueNumbers (testArray) {
    for(let i = 0; i < testArray.length; i++ )
    {
        for(let j = 0; j < testArray.length; j++)
        {
            if(i != j)
                if(testArray[i] === testArray[j])
                    return false;
        }
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
  
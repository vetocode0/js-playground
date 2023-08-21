
// Statefarm scrolling numbers sample code.

let testArray = '5467'.toString().split('');
let repeatDetected = processNumbersInRange("1,29");
console.log(repeatDetected)
  
  function isOnlyUniqueNumbers (stringArray) {
    for(let i = 0; i < stringArray.length; i++ )
    {
        for(let j = 0; j < stringArray.length; j++)
        {
            if(i != j)
                if(stringArray[i] === stringArray[j])
                    return false;
        }
    }
    return true;
  }
  function processNumbersInRange(range){
    let numbersInRange = generateScrollingNumberCandidates(range);
    return numbersInRange.filter(isScrollingNumber)
                          .toString()
                          .replace(/,/g,"\n");
}

function generateScrollingNumberCandidates (range) {
    const splitRange = range.split(',');
    let numbersInRange = []
    for(let i =0, j = splitRange[0]; j < splitRange[1]; i++, j++)
        numbersInRange[i] = j;
    return numbersInRange;
}

function isScrollingNumber (num) {
    let testArray = num.toString().split('');
    const shiftArray = createShiftArray(testArray.length);
    console.log(`Number value: ${num.toString()}. Unique: ${isOnlyUniqueNumbers(testArray)}. Without zero: ${isWithoutZero(testArray)}. Scrollable: ${isScrollable(testArray, 0, 0, shiftArray)}`);
    console.log();
    console.log();
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
      if (recurseCount > 0 && index === 0)
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
  

// Statefarm scrolling numbers sample code.

let num = 147;
let arrayString = num.toString().split('');
let multipleOccurences = isScrollingNumber(arrayString);
console.log(`Is scrolling number: ${multipleOccurences}`)
createShiftArray(4);
let result = scroll(arrayString, 0, 0);
console.log(`Scroll result: ${result}`);


function isScrollingNumber (num) {
    let testArray = num.toString().split('');
    
    if(isOnlyUniqueNumbers(testArray) && isWithoutZero(testArray) && isScrollable(testArray))
      return true
    
    return false;
  }
  
  function isOnlyUniqueNumbers (testArray) {
    for ( testNum in testArray){
          let filterResult = arrayString.filter(function (expected) { return testNum === expected;}).length;
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
  
  function isScrollable (testArray) {
    let evenPattern = /[2468]/g;
    if(testArray.length == 2 && testArray.toString().match(evenPattern).length > 0)
      return false;
    return true;
  }

function scroll (arrayString, index = 0, recurseCount = 0) {
    if (recurseCount >= arrayString.length && index === 0){
        return true;
    } 
    if (recurseCount >= arrayString.length && index !== 0)
        return false;
    let shiftArray = createShiftArray(arrayString.length);
    console.log(shiftArray)
    let shiftIteratorPosition = parseInt(arrayString[index]) + index;
    let newIndexPosition = shiftArray[shiftIteratorPosition];
    console.log(newIndexPosition);
    scroll(arrayString, newIndexPosition, ++recurseCount);
}

function createShiftArray (arrayLength) {
    let shiftArray = [];
    for(let i = 0; i < 18; i++){
        shiftArray[i] = (i % arrayLength);
    }
    return shiftArray;
}
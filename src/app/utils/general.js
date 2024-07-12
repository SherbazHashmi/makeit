export const create2DArrayEveryNthElement = (oneDArray, subarraySize) => {
  const outputArray = [];
  oneDArray.forEach((element, index) => {
    const modOfIndex = index % subarraySize;
    // if mod is 0, we can split into new array
    if(modOfIndex === 0) {
      outputArray.push([element])
    } else { // otherwise add this element to the last sub array
      const lastElementIndex = outputArray.length - 1;
      const lastSubArray = outputArray[lastElementIndex];
      outputArray[lastElementIndex] = [...lastSubArray, element];
    }
  });
  return outputArray;
};
export const combineToSingleObject = array => {
  const outputArray = [];

  for (let i = 0; i < array?.length; i++) {
    const obj = array[i];
    const newObj = {};

    for (let prop in obj) {
      if (typeof obj[prop] !== 'object') {
        newObj[prop] = obj[prop];
      } else {
        const nestedObj = obj[prop];
        for (let nestedProp in nestedObj) {
          newObj[nestedProp] = nestedObj[nestedProp];
        }
      }
    }
    delete newObj['0'];

    outputArray.push(newObj);
  }

  return outputArray;
};

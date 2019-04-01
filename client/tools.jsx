function set (obj, attributeList, value) {
  let original = obj
  // convert string values into lists
  if (typeof attributeList === 'string') {
    attributeList = attributeList.split('.')
  }
  if (attributeList instanceof Array) {
    try {
      var lastAttribute = attributeList.pop()
      for (var elem of attributeList) {
        // create each parent if it doesnt exist
        if (!(obj[elem] instanceof Object)) {
          obj[elem] = {}
        }
        // change the object reference be the nested element
        obj = obj[elem]
      }
      obj[lastAttribute] = value
    } catch (error) {
      console.warn('the set function was unable to set the value for some reason, here is the original error message', error)
      console.warn(`the set obj was:`, obj)
      console.warn(`the set attributeList was:`, attributeList)
      console.warn(`the set value was:`, value)
    }
  } else {
    console.log(`obj is:`, obj)
    console.log(`attributeList is:`, attributeList)
    console.log(`value is:`, value)
    console.error(`There is a 'set' function somewhere being called and its second argument isn't a string or a list (see values above)`)
  }
  return original
}

export let setupHandleChange = (self) => (listOfAttributes) => ({ target }) => {
  self.setState({ ...set(self.state, listOfAttributes, target.value) })
}

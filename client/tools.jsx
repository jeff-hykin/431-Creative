export let set = (obj, attributeList, value) => {
  let original = obj
  // convert string values into lists
  if (typeof attributeList === 'string') {
    attributeList = attributeList.split('.')
  }
  /* istanbul ignore else */
  if (attributeList instanceof Array) {
    try {
      var lastAttribute = attributeList.pop()
      for (var elem of attributeList) {
        // create each parent if it doesnt exist
        /* istanbul ignore else */
        if (!(obj[elem] instanceof Object)) {
          obj[elem] = {}
        }
        // change the object reference be the nested element
        obj = obj[elem]
      }
      obj[lastAttribute] = value
    /* istanbul ignore catch */
    } catch (error) {
    }
  } else {
  }
  return original
}

export let setupHandleChange = (self) => (listOfAttributes) => ({ target }) => {
  self.setState({ ...set(self.state, listOfAttributes, target.value) })
}

  // TOP POST RULES
  const createArrays = (publicArray, privateArray, data) => {
    data.map((row) =>{
      row.privacy == 'public' ? publicArray.push(row) : privateArray.push(row);
    })
  }

  const checkComments = (array) => {
    return array.filter((row) => {
        return parseInt(row.comments) > 10
    })
  }

  const checkViews = (array) => {
    return array.filter((row) => {
       return  parseInt(row.views) > 9000
    })
  }

  const checkTitleLength = (array) => {
    return array.filter((row) => {
        return row.title.length < 40
    })
  }

  exports.createArrays = createArrays;
  exports.checkComments = checkComments;
  exports.checkViews = checkViews;
  exports.checkTitleLength = checkTitleLength;
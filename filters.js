  // TOP POST RULES


  const filterByComments = (array) => {
    return array.filter((row) => {
        return parseInt(row.comments) > 10
    })
  }

  const filterByViews = (array) => {
    return array.filter((row) => {
       return  parseInt(row.views) > 9000
    })
  }

  const filterByTitleLength = (array) => {
    return array.filter((row) => {
        return row.title.length < 40
    })
  }

  exports.filterByComments = filterByComments;
  exports.filterByViews = filterByViews;
  exports.filterByTitleLength = filterByTitleLength;
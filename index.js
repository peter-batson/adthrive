
const fs = require('fs');

const neatCsv = require('neat-csv')
const filters = require('./filters.js');

const createCsvWriter = require('csv-writer').createObjectCsvWriter

const topPostsArray = [];
const otherPostsArray = [];
const dailyTopPostsArray = [];

const {
  POSTS_CSV,
  TOP_POSTS_CSV,
  OTHER_POSTS_CSV,
  DAILY_TOP_POSTS_CSV
} = require('./constants.js')



const parseCsv = async() => {
  fs.readFile(POSTS_CSV, async (err, data) => {
    if (err) {
      return console.error(err)
    }
    const parsedData = await neatCsv(data);
    const header = detailedMode(process.argv[2])
    createArrays(parsedData);
    const filteredTopPostsArray = await filterTopPostsArray(topPostsArray);
    await createCsvFiles(filteredTopPostsArray, TOP_POSTS_CSV, header);
    await createCsvFiles(otherPostsArray, OTHER_POSTS_CSV, header)    
    await createCsvFiles(sortDailyTopPosts(filteredTopPostsArray), DAILY_TOP_POSTS_CSV, header);
  })
}

const detailedMode = (arg) => {
  return arg != 'detailed' ? [{id: 'id', title: 'id'}] : [
    {id: 'id', title: 'id'},
    {id: 'title', title: 'Title'},
    {id: 'privacy', title: 'Privacy'},
    {id: 'likes', title: 'Likes'},
    {id: 'views', title: 'Views'},
    {id: 'comments', title: 'Comments'},
    {id: 'timestamp', title: 'Timestamp'}]
}

const createCsvFiles  = async(data, fileName, headerOptions)  => {
  const csvWriter = createCsvWriter({
    path: `${fileName}`,
    header: headerOptions,
  });
  csvWriter.writeRecords(data)
    .then(() => {console.log('files written successfully')})
    .catch(error => {console.log(error)})
  }

  const createArrays = (data) => {
    data.map((row) =>{
      row.privacy == 'public' ? topPostsArray.push(row) : otherPostsArray.push(row);
    })
  }

  const filterTopPostsArray = (array) => {
     const filteredComments = filters.filterByComments(array);
     const filteredViews = filters.filterByViews(filteredComments);
     const finalFilteredArray = filters.filterByTitleLength(filteredViews);
    return finalFilteredArray;
  }

  const sortDailyTopPosts = (array) => {
    const hashMap = {};
    array.forEach((post) => {
      const key = new Date(post.timestamp).toDateString();
      if (key in hashMap) {
        const previousPost = hashMap[key];
        const previousPostLikes = previousPost.likes;
        const likes = post.likes;
        if (previousPostLikes < likes) {
          hashMap[key] = post;
        }
      } else {
        hashMap[key] = post;
      }
    });
    for (key in hashMap) {
      const post = hashMap[key];
      const {id} = post
      dailyTopPostsArray.push({id})
    }
    return dailyTopPostsArray
  }

  parseCsv();






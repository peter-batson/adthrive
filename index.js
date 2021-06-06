
const fs = require('fs');
const path = require('path');
const neatCsv = require('neat-csv')
const topPosts = require('./topPosts.js');
const helpers = require('./helpers.js')

const createCsvWriter = require('csv-writer').createObjectCsvWriter

const topPostsArray = [];
const otherPostsArray = [];
const dailyTopPostsArray = [];

const POSTS_CSV = path.join(__dirname, "./output/posts.csv");
const TOP_POSTS_CSV = './output/top_posts.csv'
const OTHER_POSTS_CSV = './output/other_posts.csv'
const DAILY_TOP_POSTS_CSV = './output/daily_top_posts.csv'




const parseCsv = async() => {
  fs.readFile(POSTS_CSV, async (err, data) => {
    if (err) {
      return console.error(err)
    }
    const parsedData = await neatCsv(data);
    const header = {id: 'id', title: 'id'}
    topPosts.createArrays(topPostsArray, otherPostsArray, parsedData);
    const filteredTopPostsArray = filterTopPostsArray(topPostsArray);
    await createCsvFiles(filteredTopPostsArray, TOP_POSTS_CSV, header);
    await createCsvFiles(otherPostsArray, OTHER_POSTS_CSV, header)    
    await createCsvFiles(sortDailyTopPosts(filteredTopPostsArray), DAILY_TOP_POSTS_CSV, header);
  })
}

const createCsvFiles  = (data, fileName, headerOptions)  => {
  const csvWriter = createCsvWriter({
    path: `${fileName}`,
    header: [
      headerOptions,
    ]
  });
  csvWriter
    .writeRecords(data)
  }

  const filterTopPostsArray = (array) => {
     const filteredComments = topPosts.checkComments(array);
     const filteredViews = topPosts.checkViews(filteredComments);
     const finalFilteredArray = topPosts.checkTitleLength(filteredViews);
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


  exports.TOP_POSTS_CSV = TOP_POSTS_CSV,
  exports.OTHER_POSTS_CSV = OTHER_POSTS_CSV,
  exports.DAILY_TOP_POSTS_CSV = DAILY_TOP_POSTS_CSV,


  parseCsv();






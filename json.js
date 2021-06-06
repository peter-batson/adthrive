const fs = require('fs');
const path = require('path');
const posts = require('./index.js');

const TOP_POSTS_JSON = './output/top_posts.json'
const OTHER_POSTS_JSON = './output/other_posts.json'
const DAILY_TOP_POSTS_JSON = './output/daily_top_posts.json'

const writeCsvToJSON = async() => {
    fs.readFile(posts.TOP_POSTS_CSV, async (err, data) => {
        if (err) {
            return console.error(err)
        }
        console.log(JSON.stringify(data))
        fs.writeFileSync(TOP_POSTS_JSON, JSON.stringify(data))
    })
    fs.readFile(posts.OTHER_POSTS_CSV, async (err, data) => {
        if (err) {
            return console.error(err)
        }
        console.log(JSON.stringify(data))
        fs.writeFileSync(OTHER_POSTS_JSON, JSON.stringify(data))
    })
    fs.readFile(posts.DAILY_TOP_POSTS_CSV, async (err, data) => {
        if (err) {
            return console.error(err)
        }
        console.log(JSON.stringify(data))
        fs.writeFileSync(DAILY_TOP_POSTS_JSON, JSON.stringify(data))
    })
}

writeCsvToJSON()
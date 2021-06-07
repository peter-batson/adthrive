const fs = require('fs');
const posts = require('./index.js');

const {
    TOP_POSTS_CSV,
    OTHER_POSTS_CSV,
    DAILY_TOP_POSTS_CSV,
    TOP_POSTS_JSON,
    OTHER_POSTS_JSON,
    DAILY_TOP_POSTS_JSON
} = require('./constants.js')

const writeCsvToJSON = async() => {
    fs.readFile(TOP_POSTS_CSV, async (err, data) => {
        if (err) {
            return console.error(err)
        }
        fs.writeFileSync(TOP_POSTS_JSON, JSON.stringify(data))
    })
    fs.readFile(OTHER_POSTS_CSV, async (err, data) => {
        if (err) {
            return console.error(err)
        }
        fs.writeFileSync(OTHER_POSTS_JSON, JSON.stringify(data))
    })
    fs.readFile(DAILY_TOP_POSTS_CSV, async (err, data) => {
        if (err) {
            return console.error(err)
        }
        fs.writeFileSync(DAILY_TOP_POSTS_JSON, JSON.stringify(data))
    })
}

writeCsvToJSON()
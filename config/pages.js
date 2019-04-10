const fs = require('fs')
const path = require('path')

let pages = [];
let pagePath = path.resolve(__dirname, '../src/page');
pages = fs.readdirSync(pagePath);
pages.forEach((page, idx) => {
  pages[idx] = page.split('.')[0]
})

module.exports = pages

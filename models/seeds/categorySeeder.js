// 連線設定
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

// require Schema and data json
const Category = require('../category')
const restaurantData = require('../../restaurant.json')
let categories = []

// 將json資料中的餐廳類別提取出來，並且不重複
function buildCategory() {
  const data = restaurantData.results;
  const categoriesSet = new Set();
  for (const restaurant of data) {
    categoriesSet.add(restaurant.category);
  }
  categories = Array.from(categoriesSet);
}

db.once('open', () => {
  buildCategory()
  // 將 categories 轉換成對應的物件陣列
  const categoryObjects = categories.map(category => {
    return { name: category };
  });

  // 使用 Category.create 建立 category 種子資料
  Category.create(categoryObjects)
    .then(() => {
      console.log('CategorySeeder建立成功!');
      process.exit();
    })
    .catch(err => {
      console.error('建立 Category 種子資料時發生錯誤：', err);
      process.exit();
    });
});



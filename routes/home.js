router.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

router.get('/search', (req, res) => {
  console.log('正確導向/search')
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    restaurant => { return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) }
  )
  res.render('index', { restaurants, keyword })
})
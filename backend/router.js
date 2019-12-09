const router = require('express').Router() //just the routing/handling of routes part of express
const users = require('./controllers/users')
const lists = require('./controllers/lists')
const items = require('./controllers/items')
// const secureRoute = require('./lib/secureRoute')


//ITEMS
router.route('/items/')
  //client requests an item be saved for a list
  .post(items.add)
  //get all items so we can check if new item exists
  .get(items.index)

router.route('/items/:listingId')
  .get(items.show)

//future things, have a put and a delete so we can refresh the data from the source regularly and mark/remove anything that's changed

// --- User Routes
// Additional features would be to change your login details
//would require .put to /login/:userId

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

//-----LIST routs

router.route('/lists')
  .get(lists.index) // gives an index for all Lists - for Development

router.route('/lists/:userId')
  .get(lists.userAll) // Returns all the users lists
  .post(lists.create) // Creates a New List

router.route('/lists/:userId/:listId')
  .get(lists.oneList) // Shows the specific list via List ID / User ID
  .put(lists.editList) // Allows you to edit specific List

router.route('/lists/:userId/:listId/etsy')
  .put(lists.addEtsyItem) //add specific item using { item: itemid} to our saved etsy list

router.route('/lists/:userId/:listId/customItems')
  .get(lists.allCustomItems) // Allows you to get all custom added itesm from the speicific list
  .post(lists.addItem) //allows you to add custom items to a speific list

router.route('/lists/:userId/:listId/customItems/:itemId')
  .put(lists.editCustomItems) // allows you to edit custom items from a speicific list
  .delete(lists.removeCustomItem) // Allows you to remove custom item from specific list

router.route('/lists/public/:listId')
  .get(lists.publicList) // Shows speicifc list, for Public sharing


module.exports = router
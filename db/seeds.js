const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')

const User = require('../models/User')
const Category = require('../models/Category')
const Item = require('../models/Item')
const List = require('../models/List')

//test data set to pump into your database for dev purposes
//it will delete anything that is currently in your database
//this is a stand alone programme, it is not run out of app.js or connected to it!

//connect mongoose to db 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  //this takes error and db params
  (err, db) => {
    //if it errors trying to connected to db, console log the error
    if (err) return console.log(err)
    //drop the db (clears any existing records)
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            firstname: 'DevUser',
            surname: 'world',
            email: 'user@dev.com',
            password: '12345',
            passwordConfirmation: '12345'
          },
          {
            firstname: 'Hello',
            surname: 'Time',
            email: 'user@time.com',
            password: '12345',
            passwordConfirmation: '12345'
          }
        ])
      })
      .then(() => {
        return Category.create([
          {
            categoryName: 'Accessories',
            etsyCategoryName: 'accessories',
            subcategory: [
              {
                subcategoryName: 'Gloves',
                etsysubcategoryName: 'accessories/gloves'
              },
              {
                subcategoryName: 'Men',
                etsysubcategoryName: 'accessories/men'
              }
            ]
          },
          {
            categoryName: 'Art',
            etsyCategoryName: 'art',
            subcategory: [
              {
                subcategoryName: 'Sculpture',
                etsysubcategoryName: 'art/sculpture'
              },
              {
                subcategoryName: 'Painting',
                etsysubcategoryName: 'art/painting'
              }
            ]
          }
        ])
      })
      .then(() => {
        return Item.create([
          {
            productName: 'Rubber Chicken',
            price: '2.99',
            currenctCode: 'GBP',
            description: 'One large rubber chicken',
            src: 'www.rubberchicken.com',
            listingId: '1234556',
            imgsrc: 'wwww.rubberchicken.com/pics'
          },
          {
            productName: 'novalty mug',
            price: '3.99',
            currenctCode: 'GBP',
            description: 'One large MUG for muggy people',
            src: 'www.largemugs.com',
            listingId: '1234556444',
            imgsrc: 'www.largemugs.com/pics'
          }
        ])
      })
      .then((users) => {
        return List.create([
          { //seed with all fields holding a single value
            user: users[0],
            listName: 'All fields have single value',
            giftRecipient: 'Bob',
            eventName: 'Bob Birthday',
            eventDate: '2020-01-07',
            eventReminder: true,
            budget: '50',
            listStatus: 'Active',
            // subcategory: {},
            keywords: '', //not implemented for MVP
            // itemsSaved: [['oi']],
            // customItem: {},
            shareUrl: '' //null until we implement url structures
          }
         
        ])
      })
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  })
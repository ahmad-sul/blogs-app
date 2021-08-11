const mongoose = require('mongoose')
const User = require('../models/UserSchema')
const mongoURL = require('./config/env').mongoURL


mongoose.connect(
    mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log("connected to blogs-app DB")
  );



async function seedData() {
    try{
       await User.deleteMany({})

         
  const users=Array().fill(null).map(()=>{

    const user = new User({
        firstname:faker.name.findName(),
        username:faker.name.userName(),
        email: faker.internet.email(),
        password:faker.internet.password()
    })
   return user.save()
    
})

    // console.log(users)
    await Promise.all(users)
    }
    catch(err){
console.log(err.message)
    }
    mongoose.connection.close()
}

seedData()
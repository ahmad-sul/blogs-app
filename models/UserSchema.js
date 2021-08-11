const mongoose = require("mongoose")

 const Schema = mongoose.Schema ;


const UserSchema = new Schema({
  
    userName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      avatar: {
        type: String,
        default:
          "https://cdn4.iconfinder.com/data/icons/Pretty_office_icon_part_2/256/personal-information.png",
      }
})

const UsersModel = User = mongoose.model("user",UserSchema)


module.exports= UsersModel;
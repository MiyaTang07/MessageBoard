const mongoose = require('mongoose')
class Model{
  constructor(){
    let commitSchema = mongoose.Schema({
      id: String,
      name: String,
      content: String,
      create_at:String
    })
    return mongoose.model('Commits',commitSchema)
  }
}

module.exports = new Model()
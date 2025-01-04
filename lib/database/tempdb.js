//NARUTO
const mongoose = require("mongoose");
const TempDb = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: "NARUTO-MD"
  },
  creator: {
    type: String,
    default: "NARUTO"
  },
  data: {
    type: Object,
    default: {}
  }
});
const dbtemp = mongoose.model("dbtemp", TempDb);
module.exports = {
  dbtemp
};

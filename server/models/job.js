const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  info: {
    type: String,
    required: true,
  },

  followers: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("Job", JobSchema);

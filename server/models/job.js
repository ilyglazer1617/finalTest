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
  //! populate
  // followers: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});
module.exports = mongoose.model("Job", JobSchema);

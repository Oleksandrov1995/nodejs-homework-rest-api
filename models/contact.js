const { Schema, model } = require("mongoose");


const contactSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'user',
  },
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);



module.exports = { Contact};

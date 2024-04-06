import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tel: { type: Number, required: true, unique: true, ref: "user" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Contact = mongoose.model("contact", contactSchema);

export default Contact;

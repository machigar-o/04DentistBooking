const mongoose = require("mongoose");
const DentistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    hospital: {
      type: String,
      required: [true, "Please add hospital"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    expertist: {
      type: String,
      required: [true, "Please add expertist"],
    },
    tel: {
      type: String,
    },
    picture: {
      type: String,
      required: [true, "Please add URL to dentist picture"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Cascade delete bookings when a dentist is deleted
DentistSchema.pre("remove", async function (next) {
  console.log(`Booking being removed from dentist ${this._id}`);
  await this.model("Booking").deleteMany({ dentist: this._id });
  next();
});
// Reverse populate with virtuals
DentistSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "dentist",
  justOne: false,
});
module.exports = mongoose.model("Dentist", DentistSchema);

import mongoose from "mongoose";
const donationSchema = new mongoose.Schema({
  donationAmount: {
    type: Number,
    required: true,
  },
  donationday : {
    type : String,
    enum : ["Monthly","Once"],
    default : "Monthly",
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
paymentDetails : {
    pidx : {type:String},
    method:{type:String,enum:['COD','khalti']},
    status : {type : String,enum:['paid','unpaid','pending'],default : 'pending'}
}
},{
    timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;

import mongoose from 'mongoose';

const SingleEntrySchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    debit: {
      type: String,
      required: true,
    },
    credit: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const companySchema = mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
    },
    enteries: [SingleEntrySchema],
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);

export default Company;

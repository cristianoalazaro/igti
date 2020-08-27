import mongoose from "mongoose";
const accountsSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
  },
});

const AccountsModel = mongoose.model("accounts", accountsSchema);

//export { accountsModel };
export default AccountsModel;

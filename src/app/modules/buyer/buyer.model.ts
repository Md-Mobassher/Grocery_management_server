import { Schema, model } from 'mongoose'
import { BloodGroup, Gender } from './buyer.constant'
import { BuyerModel, TAddress, TBuyer, TUserName } from './buyer.interface'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [30, 'Name can not be more than 30 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [30, 'Name can not be more than 30 characters'],
  },
})

const addressSchema = new Schema<TAddress>({
  address1: {
    type: String,
    required: [true, 'Address1 address is required'],
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  postCode: {
    type: Number,
    required: [true, 'Post-Code is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
})

const buyerSchema = new Schema<TBuyer, BuyerModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: addressSchema,
    permanentAddress: addressSchema,
    profileImg: { type: String, default: '' },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// generating full name
buyerSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + ' ' + this?.name?.lastName
})

// filter out deleted documents
buyerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

buyerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

buyerSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//checking if user is already exist!
buyerSchema.statics.isBuyerExistsByEmail = async function (email: string) {
  const existingUser = await Buyer.findOne({ email })
  return existingUser
}
buyerSchema.statics.isBuyerExists = async function (id: string) {
  const existingUser = await Buyer.findOne({ _id: id })
  return existingUser
}

export const Buyer = model<TBuyer, BuyerModel>('Buyer', buyerSchema)

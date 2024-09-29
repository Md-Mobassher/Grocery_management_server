import { Schema, model } from 'mongoose'
import { IProduct, ProductModel } from './product.interface'

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    imageUrl: [{ type: String, required: true }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean },
    tags: [{ type: String }],
    discount: {
      percentage: { type: Number },
      startAt: { type: Date },
      endAt: { type: Date },
    },
    brand: { type: String },
    ratingsAverage: { type: Number },
    ratingsQuantity: { type: Number },
  },
  {
    timestamps: true,
  },
)

productSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } })
  next()
})

productSchema.statics.isProductExist = async function (id: string) {
  return await Product.findById(id)
}

export const Product = model<IProduct, ProductModel>('Product', productSchema)

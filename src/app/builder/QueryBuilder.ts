import { FilterQuery, Query } from 'mongoose'
import mongoose from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }

    return this
  }

  filter() {
    const queryObj: Record<string, unknown> = { ...this.query } // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])

    // Filter by Category
    this.addCategoryFilter(queryObj)

    // Filter by Price
    this.addPriceFilter(queryObj)

    // Filter by Brand
    this.addBrandFilter(queryObj)

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  private addCategoryFilter(queryObj: Record<string, unknown>) {
    if (this.query.category) {
      try {
        const categoryId = new mongoose.Types.ObjectId(
          this.query.category as string,
        )
        queryObj['category'] = categoryId
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Invalid category ID:', error)
      }
    }
  }

  private addPriceFilter(queryObj: Record<string, unknown>) {
    const minPrice = this.query.minPrice
    const maxPrice = this.query.maxPrice

    const numericMinPrice =
      minPrice !== undefined ? Number(minPrice) : undefined
    const numericMaxPrice =
      maxPrice !== undefined ? Number(maxPrice) : undefined

    if (
      !isNaN(numericMinPrice as number) &&
      !isNaN(numericMaxPrice as number)
    ) {
      queryObj['price'] = {
        $gte: numericMinPrice as number,
        $lte: numericMaxPrice as number,
      }
    } else if (!isNaN(numericMinPrice as number)) {
      queryObj['price'] = { $gte: numericMinPrice as number }
    } else if (!isNaN(numericMaxPrice as number)) {
      queryObj['price'] = { $lte: numericMaxPrice as number }
    }

    // Remove minPrice and maxPrice from the query object as they've been applied
    delete queryObj.minPrice
    delete queryObj.maxPrice
  }

  private addBrandFilter(queryObj: Record<string, unknown>) {
    if (this.query.brand !== undefined) {
      queryObj['brand'] = { $regex: this.query.brand, $options: 'i' }
    }
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)

    return this
  }

  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
    this.modelQuery = this.modelQuery.select(fields)
    return this
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter()
    const total = await this.modelQuery.model.countDocuments(totalQueries)
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const totalPage = Math.ceil(total / limit)

    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder

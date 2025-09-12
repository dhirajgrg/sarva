class apiFeatures {
	constructor(query, queryString) {
		this.query = query
		this.queryString = queryString
	}
	search() {
		if (this.queryString.search) {
			const keyword = this.queryString.search

			// 🔍 Search across multiple string fields
			this.query = this.query.find({
				$or: [
					{ title: { $regex: keyword, $options: "i" } },
					{ description: { $regex: keyword, $options: "i" } },
					{ category: { $regex: keyword, $options: "i" } },
					{ location: { $regex: keyword, $options: "i" } },
				],
			})
		}
		return this
	}

	filter() {
		const queryObj = { ...this.queryString }
		const excludedFields = ["search", "page", "sort", "limit", "fields"]
		excludedFields.forEach((el) => delete queryObj[el])

		// 1B) Advanced filtering
		let queryStr = JSON.stringify(queryObj)
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		)

		this.query = this.query.find(JSON.parse(queryStr))

		return this
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ")
			this.query = this.query.sort(sortBy)
		} else {
			this.query = this.query.sort("-createdAt")
		}
		return this
	}

	limitFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ")
			this.query = this.query.select(fields)
		} else {
			this.query = this.query.select("-__v")
		}
		return this
	}

	async paginate() {
		const page = this.queryString.page * 1 || 1
		const limit = this.queryString.limit * 1 || 10
		const skip = (page - 1) * limit

		const numDocs = await this.query.clone().countDocuments()
		if (skip >= numDocs && numDocs > 0) {
			throw new Error("This page does not exist")
		}

		this.query = this.query.skip(skip).limit(limit)
		return this
	}
}

export default apiFeatures

const Product = require('../models/productModels')
const {getPostData} = require('../utils')

//@desc    Gets All Products
//@route   GET /api/products
async function getProducts(req,res) {
	try {
		const products = await Product.findAll()
		 res.writeHead(200, { 'Content-Type': 'application/json' })
		 res.end(JSON.stringify(products))
	} catch(error) {
		console.log(error)
	}
}

//@Desc Get Product By Id
//@route GET /api/product/:id
async function getProductById(req,res,id) {
	try {
		const products = await Product.findById(id)

		if(!products) {
		 res.writeHead(404, {'Content-Type': 'application/json'})
		 res.end()
		}
		res.writeHead(200, {'Content-Type': 'application/json'})
		res.end(JSON.stringify(products)) 

	} catch(error) {
		console.log(error)
	}
}

// @Desc  Create a Product
// @route POST /api/products
async function createProduct(req,res) {
	try {
		const body = await getPostData(req)
		const {name,description,price} = JSON.parse(body)
		const product = {
			name,
			description,
			price
		}
		const newProduct = await Product.create(product)
		res.writeHead(201, { 'Content-Type': 'application/json' })
		return res.end(JSON.stringify(newProduct))
	} catch(error) {
		console.log(error)
	}
}


// @Desc Update a Product
// @route PUT /api/products 
async function updateProduct(req,res,id) {
	try {

		const product = await Product.findById(id)
		if(!product) {
			res.writeHead(404, {'Content-Type': 'application/json'})
			res.end()
		 }
		else {
			const body = await getPostData(req)
			const {title,description,price} = JSON.parse(body)
			const productData = {
				title:title || product.title,
				description: description || product.description,
				price: price || product.price
			}

			const updProduct = await Product.update(id,productData)
			res.writeHead(201, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify(updProduct))
		}
	} catch(error) {
		console.log(error)
	}
} 

//@Desc Delete A Product
//@route DELETE /api/products/id
async function removeProduct(req,res,id) {
	const products = await Product.findById(id)
	try {
		if(!products) {
			res.writeHead(404, {'Content-Type': 'application/json'})
			res.end(JSON.stringify({ message: 'Product Not Found' }))
		   }
	
		   else {
			   await Product.deleteProduct(id)
			   res.writeHead(200, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify())
		   }
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	removeProduct
}
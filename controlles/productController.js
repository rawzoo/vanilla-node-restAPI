const Product = require('../models/productModels')


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

module.exports = {
	getProducts,
	getProductById
}
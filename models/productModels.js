const product = require('../product.json')


// Find All Products
function findAll() {
	return new Promise((resolve,reject) => {
	     resolve(product)
	})
}

//Find Product By ID
function findById(id) {
	return new Promise((resolve,reject) => {
		const product = product.find((p) => p.id === id)
	     resolve(product)
	})
}


module.exports = {
    findAll,
	findById
}

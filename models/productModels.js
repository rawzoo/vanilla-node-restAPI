let products = require('../data/product.json')
const {v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')


// Find All Products
function findAll() {
	return new Promise((resolve,reject) => {
		resolve(products)
	})
}

//Find Product By ID
function findById(id) {
	return new Promise((resolve,reject) => {
		const product = products.find((p) => p.id === id)
	     resolve(product)
	})
}


//Create new Product
function create(product) {
	return new Promise((resolve,reject) => {
		const newProduct = {id: uuidv4(), ...product}
		products.push(newProduct)
		writeDataToFile('./data/product.json', products)
		resolve(newProduct)
	})
}

//Update a Product
function update(id,product) {
	return new Promise((resolve,reject) => {
		const index = products.findIndex((p)=> p.id === id)
		products[index] = {id, ...product}
		writeDataToFile('./data/product.json', products)
		resolve(products[index])
	})
}

//Delete a Product
function deleteProduct(id) {
	return new Promise((resolve,reject) => {
		products = products.filter((p) => p.id !== id)
		writeDataToFile('./data/product.json',products)
		resolve()
	})
}


module.exports = {
    findAll,
	findById,
	create,
	update,
	deleteProduct
}

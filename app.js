const http = require('http')
const {getProducts, getProductById} = require('./controlles/productController')

const PORT = process.env.PORT || 5000

const server = http.createServer((req,res) => {

	if(req.url === '/api/products' && req.method === 'GET') {
		getProducts(res,req)
	} 
	else if(req.url.match(/\/api\/products\/([0-9]+)/)&& req.method === 'GET')
	{
		const id = req.url.split('/')[3]
		getProductById(req,res,id)
	 }
	else {
		res.writeHead('404',{'Content-Type': 'application/json'})
		res.end(JSON.stringify({message: 'Not Foundd'}))
	}

})
server.listen(PORT, () => console.log(`Server Running on ${PORT}`))



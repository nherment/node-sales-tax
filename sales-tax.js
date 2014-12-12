

var seneca = require('seneca')()

seneca.add({role: 'sales-tax', cmd: 'calc'}, function(args, callback) {

	if(!args.price) {
		args.price = 0
	}

	var result = {
		basePrice: args.price,
		finalPrice: args.price,
		taxes: []
	}
	callback(undefined, result)
})

seneca.use('./lib/canada/global-tax.js')
seneca.use('./lib/canada/alberta-tax.js')
seneca.use('./lib/canada/manitoba-tax.js')
seneca.use('./lib/canada/ontario-tax.js')


module.exports = seneca

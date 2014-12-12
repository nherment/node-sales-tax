
var helper = require('../../lib/tax-helper.js')

var pluginName = 'canada-ontario'

module.exports = function(options) {


	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario'}, function(args, callback) {

			var result = helper.applyPercentTax(args, null, 'HST', 13);
			callback(undefined, result)

	})
	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario', type: 'restaurant'}, function(args, callback) {
		if(args.price >= 4) {
			this.prior(args, callback)
		} else {
			this.act({role: 'sales-tax', cmd: 'calc', country: 'canada', price: args.price}, callback);
		}

	})
	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario', type: 'alcohol'}, function(args, callback) {

		var result = helper.applyPercentTax(args, null, 'HST', 18);
		callback(undefined, result)

	})

	return {
		name: pluginName
	}

}


var helper = require('../../lib/tax-helper.js')

var pluginName = 'canada-manitoba'

module.exports = function(options) {


	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'manitoba', type: 'lodging'}, applySpecialTax)
	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'manitoba', type: 'hotel-room'}, applySpecialTax)

	function applySpecialTax(args, callback) {

		this.prior(args, function(err, result) {

			if(err) return callback(err, undefined)

			result = helper.applyPercentTax(args, result, args.type, 5);

			callback(undefined, result)

		})
	}

	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'manitoba'}, function(args, callback) {

		this.prior(args, function(err, result) {

			if(err) return callback(err, undefined)

			result = helper.applyPercentTax(args, result, 'PST', 8);

			callback(undefined, result)

		})
	})

	return {
		name: pluginName
	}

}

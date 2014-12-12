
var pluginName = 'canada-alberta'

var helper = require('../../lib/tax-helper.js')

module.exports = function(options) {

	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'alberta', type: 'food'}, apply4PercentTax)
	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'alberta', type: 'hotel-room'}, apply4PercentTax)

	function apply4PercentTax(args, callback) {

		this.prior(args, function(err, result) {

			if(err) return callback(err, undefined)

			result = helper.applyPercentTax(args, result, args.type, 4);

			callback(undefined, result)

		})
	}

	return {
		name: pluginName
	}

}

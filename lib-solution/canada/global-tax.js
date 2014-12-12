
var pluginName = 'canada'

var helper = require('../../lib/tax-helper.js')

module.exports = function(options) {

	this.add({role: 'sales-tax', cmd: 'calc', country: 'canada'}, function(args, callback) {
		result = helper.applyPercentTax(args, null, 'GST', 5);
		callback(undefined, result)
	})

	return {
		name: pluginName
	}

}



module.exports = {
	applyPercentTax: function(args, preExistingResult, taxName, percents) {

		if(!args.price) {
			args.price = 0
		}
		if(!preExistingResult) {
			preExistingResult = {
				basePrice: args.price,
				finalPrice: args.price,
				taxes: []
			}
		}

		preExistingResult.finalPrice += args.price * percents / 100;
		preExistingResult.taxes.push({
			name: taxName,
			amount: args.price * percents / 100,
			percents: percents,
		})
		return preExistingResult;
	}
}

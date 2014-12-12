

var assert = require('assert')

var seneca = require('../sales-tax.js')


describe('ontario', function() {

	it('default values', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario'}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 0)
			assert.equal(result.finalPrice, 0)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'HST')
			assert.equal(result.taxes[0].amount, 0)
			assert.equal(result.taxes[0].percents, 13)

			done()
		})

	})

	it('simple price', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 113)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'HST')
			assert.equal(result.taxes[0].amount, 13)
			assert.equal(result.taxes[0].percents, 13)

			done()
		})

	})

	it('restaurant > 4', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario', type: 'restaurant', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 113)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'HST')
			assert.equal(result.taxes[0].amount, 13)
			assert.equal(result.taxes[0].percents, 13)

			done()
		})

	})

	it('restaurant = 4', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario', type: 'restaurant', price: 4}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 4)
			assert.equal(result.finalPrice, 4 + 4 *0.13)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'HST')
			assert.equal(result.taxes[0].amount, 4 * 13 / 100)
			assert.equal(result.taxes[0].percents, 13)

			done()
		})
	})

	it('restaurant < 4', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario', type: 'restaurant', price: 3}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 3)
			assert.equal(result.finalPrice, 3 + 3*0.05)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'GST')
			assert.equal(result.taxes[0].amount, 3*5 /100)
			assert.equal(result.taxes[0].percents, 5)

			done()
		})

	})

	it('alcohol', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'ontario', type: 'alcohol', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 118)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'HST')
			assert.equal(result.taxes[0].amount, 18)
			assert.equal(result.taxes[0].percents, 18)

			done()
		})

	})

})

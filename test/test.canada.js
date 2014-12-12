

var assert = require('assert')

var seneca = require('../sales-tax.js')


describe('canada', function() {

	it('default values', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada'}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 0)
			assert.equal(result.finalPrice, 0)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'GST')
			assert.equal(result.taxes[0].amount, 0)
			assert.equal(result.taxes[0].percents, 5)

			done()
		})

	})

	it('simple price', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 105)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 1)
			assert.equal(result.taxes[0].name, 'GST')
			assert.equal(result.taxes[0].amount, 5)
			assert.equal(result.taxes[0].percents, 5)

			done()
		})

	})

})

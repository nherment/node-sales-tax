

var assert = require('assert')

var seneca = require('../sales-tax.js')


describe('global', function() {

	it('default values', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc'}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 0)
			assert.equal(result.finalPrice, 0)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 0)

			done()
		})

	})

	it('simple price', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 100)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 0)

			done()
		})

	})

})

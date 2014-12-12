

var assert = require('assert')

var seneca = require('../sales-tax.js')


describe('manitoba', function() {

	it('default values', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'manitoba'}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 0)
			assert.equal(result.finalPrice, 0)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 2)
			assert.equal(result.taxes[0].name, 'GST')
			assert.equal(result.taxes[0].amount, 0)
			assert.equal(result.taxes[0].percents, 5)

			assert.equal(result.taxes[1].name, 'PST')
			assert.equal(result.taxes[1].amount, 0)
			assert.equal(result.taxes[1].percents, 8)

			done()
		})

	})

	it('simple price', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'manitoba', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 113)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 2)
			assert.equal(result.taxes[0].name, 'GST')
			assert.equal(result.taxes[0].amount, 5)
			assert.equal(result.taxes[0].percents, 5)

			assert.equal(result.taxes[1].name, 'PST')
			assert.equal(result.taxes[1].amount, 8)
			assert.equal(result.taxes[1].percents, 8)

			done()
		})

	})

	it('food', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'manitoba', type: 'lodging', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 110)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 2)
			assert.equal(result.taxes[0].name, 'GST')
			assert.equal(result.taxes[0].amount, 5)
			assert.equal(result.taxes[0].percents, 5)

			assert.equal(result.taxes[1].name, 'lodging')
			assert.equal(result.taxes[1].amount, 5)
			assert.equal(result.taxes[1].percents, 5)

			done()
		})

	})

	it('hotel-room', function(done) {

		seneca.act({role: 'sales-tax', cmd: 'calc', country: 'canada', province: 'manitoba', type: 'hotel-room', price: 100}, function(err, result) {
			assert.ok(!err, err)
			assert.ok(result, 'missing result')
			assert.equal(result.basePrice, 100)
			assert.equal(result.finalPrice, 110)
			assert.ok(result.taxes)
			assert.equal(result.taxes.length, 2)
			assert.equal(result.taxes[0].name, 'GST')
			assert.equal(result.taxes[0].amount, 5)
			assert.equal(result.taxes[0].percents, 5)

			assert.equal(result.taxes[1].name, 'hotel-room')
			assert.equal(result.taxes[1].amount, 5)
			assert.equal(result.taxes[1].percents, 5)

			done()
		})

	})

})

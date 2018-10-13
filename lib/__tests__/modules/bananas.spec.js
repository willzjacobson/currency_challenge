const chai = require('chai');
const expect = chai.expect;

const {
  bananas: { getDaysInMonth, tickMonth },
} = require('../../modules');

describe('bananas module', function() {
  describe('getDaysInMonth function', function() {
    it('returns the number of days in a year', function() {
      const month = '10';
      const year = '2018';
      const numberOfDays = getDaysInMonth(year, month);

      expect(numberOfDays).to.equal(31);
    });
  });

  describe('tickMonth function', function() {
    it('returns an object containing next month info', function() {
      const month = '10';
      const year = '2018';
      const nextMonthInfo = tickMonth(year, month);

      expect(nextMonthInfo).to.be.an('object');
      expect(Object.keys(nextMonthInfo).length).to.equal(2);
      expect(nextMonthInfo.updatedMonth).to.equal('11');
      expect(nextMonthInfo.updatedYear).to.equal('2018');
    });

    it('handles year turnover', function() {
      const month = '12';
      const year = '2018';
      const nextMonthInfo = tickMonth(year, month);

      expect(nextMonthInfo.updatedMonth).to.equal('01');
      expect(nextMonthInfo.updatedYear).to.equal('2019');
    });
  });
});

/* eslint-disable no-undef*/
const moment = require('moment');
const { timeParser, fixTime, fixDate, fixDayOfWeek } = require('./time.js');


test('timeparser returns timeDiff', () => {
	expect(timeParser(moment().format('MM-DD'), moment().add('5', 'm').format('HH:mm'))).toBeGreaterThan(220000);
	expect(timeParser(moment().format('MM-DD'), moment().add('5', 'm').format('HH:mm'))).toBeLessThan(330000);
	expect(timeParser(moment().format('dddd'), moment().add('5', 'm').format('HH:mm'))).toBeGreaterThan(220000);
	expect(timeParser(moment().format('dddd'), moment().add('5', 'm').format('HH:mm'))).toBeLessThan(330000);
});


test('fixTime returns acceptable string for ISO 8601 time', () => {
	expect(fixTime('930')).toBe('09:30');
	expect(fixTime('9:30')).toBe('09:30');
	expect(fixTime('1230')).toBe('12:30');
	expect(fixTime('12:30')).toBe('12:30');
});

test('fixDate returns acceptable date string for for ISO 8601 time', () => {
	expect(fixDate('04/27')).toBe('04-27');
	expect(fixDate('4/27')).toBe('04-27');
	expect(fixDate('12/27')).toBe('12-27');
	expect(fixDate('4-27')).toBe('04-27');
	expect(fixDate('11-27')).toBe('11-27');
});

test('fixDayOfWeek returns the date of the given day of week user entered', () => {
	expect(fixDayOfWeek(moment().format('dddd'))).toBe(moment().format('MM-DD'));
	expect(fixDayOfWeek(moment().add(2, 'd').format('dddd'))).toBe(moment().add(2, 'd').format('MM-DD'));
	expect(fixDayOfWeek(moment().add(6, 'd').format('dddd'))).toBe(moment().add(6, 'd').format('MM-DD'));
});
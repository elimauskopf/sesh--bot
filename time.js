const moment = require('moment');

function timeParser(userDate, userTime) {

	const year = moment().year();

	userDate = fixDate(userDate);
	userTime = fixTime(userTime);

	const reminderDate = moment(`${year}-${userDate} ${userTime}`);

	// Cacluclate time difference
	return reminderDate.diff(moment());
}

// Fix the user given time
function fixTime(userTime) {

	// Colon not included
	if (!userTime.includes(':')) {
		if (userTime.length == 3) {
			// ie: 930
			userTime = '0' + userTime.slice(0, 1) + ':' + userTime.slice(1);
		}
		else {
			// ie: 1230
			userTime = userTime.slice(0, 2) + ':' + userTime.slice(2);
		}
	}
	else if (userTime.length === 4) {
		// ie: 9:30
		userTime = '0' + userTime;
	}

	return userTime;
}

// Fix the user given date
function fixDate(userDate) {

	if (userDate.toLowerCase() === 'today') {
		const date = returnToday();
		return date;
	}

	// Day of week entered
	if (isDayOfWeek(userDate)) {
		const date = fixDayOfWeek(userDate);
		return date;
	}

	// Date has no dash, ie: 4/27
	if (!userDate.includes('-')) {
		// Month less than 10, no 0 prefix
		if (userDate.length === 4 && userDate[0] !== 0) {
			userDate = '0' + userDate.slice(0, 1) + '-' + userDate.slice(2);
		}
		else if (userDate.length === 5) {
			// ie: 12/27
			userDate = userDate.slice(0, 2) + '-' + userDate.slice(3);
		}
	}
	else if (userDate.length === 4) {
		userDate = '0' + userDate;
	}

	return userDate;
}

// Calculates difference between today and given day of week
// Returns correctly formated date for timeParser
function fixDayOfWeek(userDay) {
	const daysOfWeek = {
		'SUNDAY': 1,
		'MONDAY': 2,
		'TUESDAY': 3,
		'WEDNESDAY': 4,
		'THURSDAY': 5,
		'FRIDAY': 6,
		'SATURDAY': 7,
	};

	let date;
	let dayDifference;
	const input = daysOfWeek[userDay.toUpperCase()];
	const today = daysOfWeek[moment().format('dddd').toUpperCase()];

	// ie: input = 'monday', today =  'monday'
	if (today === input) {
		date = returnToday();
		return date;
	}
	// ie: input = 'friday', today =  'monday'
	else if (input > today) {
		dayDifference = input - today;

	}
	// ie: input = 'friday', today =  'saturday'
	else if (input < today) {
		dayDifference = (7 - today) + input;
	}

	date = moment().add(dayDifference, 'd');
	return date.format('MM-DD');
}

// Returns todays fate formatted properly
function returnToday() {
	return moment().format('MM-DD');
}

// FixDate helper function
function isDayOfWeek(userInput) {
	const daysOfWeek = {
		'SUNDAY': 1,
		'MONDAY': 2,
		'TUESDAY': 3,
		'WEDNESDAY': 4,
		'THURSDAY': 5,
		'FRIDAY': 6,
		'SATURDAY': 7,
	};

	if (Object.keys(daysOfWeek).includes(userInput.toUpperCase())) {
		return true;
	}

	return false;
}

module.exports = { timeParser, fixTime, fixDate, fixDayOfWeek };


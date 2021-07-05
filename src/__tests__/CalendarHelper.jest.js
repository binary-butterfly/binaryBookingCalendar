import {
    checkIfDateActive,
    checkIfDateAvailable,
    compareDateWithoutTime,
    compareMonthAndYear,
    getDaysInMonth,
} from '../js/CalendarHelper';

describe.each([
    [-12, 1],
    [-1, 1],
    [0, 0],
    [1, -1],
    [13, -1],
])('test compareMonthAndYear', (offset, expected) => {
    test('With a difference of ' + offset + ' months returns ' + expected, () => {
        const dateA = new Date();
        const dateB = new Date(dateA);
        dateB.setMonth(dateA.getMonth() + offset);

        expect(compareMonthAndYear(dateA, dateB)).toBe(expected);
    });
});

describe.each([
    [-12, 1],
    [-1, 1],
    [0, 0],
    [1, -1],
    [13, -1],
])('test compareMonthAndYear', (offset, expected) => {
    test('compare month and year with a difference of ' + offset + ' years returns ' + expected, () => {
        const dateA = new Date();
        const dateB = new Date(dateA);
        dateB.setFullYear(dateA.getFullYear() + offset);

        expect(compareMonthAndYear(dateA, dateB)).toBe(expected);
    });
});

test('compare month and year with a difference of a day but in the same month returns 0', () => {
    const dateA = new Date('2021-01-01T13:37:00.000Z');
    const dateB = new Date('2021-01-02T13:00:00.000Z');

    expect(compareMonthAndYear(dateA, dateB)).toBe(0);
});

describe.each([
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2021-01-01T12:37:00.000Z'), 0, 'Same day different time returns '],
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), 0, 'Same day same time returns '],
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2021-02-01T12:37:00.000Z'), -1, 'Same time later month returns '],
    [new Date('2020-01-01T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), -1, 'Same date later year returns '],
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2020-01-01T13:37:00.000Z'), 1, 'Same date earlier year returns '],
    [new Date('2021-02-01T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), 1, 'Same time earlier month returns '],
])('test compareDateWithoutTime', (dateA, dateB, expected, name) => {
    test(name + expected, () => {
        expect(compareDateWithoutTime(dateA, dateB)).toBe(expected);
    });
});

describe.each([
    // note that js months start at 0
    [2021, 1, 28, '2021 was no leap year'],
    [2020, 1, 29, '2020 was a leap year'],
    [2021, 0, 31, 'Jan has 31 days'],
    [2021, 2, 31, 'March has 31 days'],
    [2021, 3, 30, 'April has 30 days'],
    [2021, 4, 31, 'May has 31 days'],
    [2021, 5, 30, 'June has 30 days'],
    [2021, 6, 31, 'Juli has 31 days'],
    [2021, 7, 31, 'August has 31 days'],
    [2021, 8, 30, 'September has 30 days'],
    [2021, 9, 31, 'Oktober has 31 days'],
    [2021, 10, 30, 'November has 30 days'],
    [2021, 11, 31, 'December has 31 days'],
    [2100, 1, 28, '2100 will skip a leap year'],
])('test getDaysInMonth', (year, month, expected, name) => {
    test(name, () => {
        expect(getDaysInMonth(year, month)).toBe(expected);
    });
});

describe.each([
    [new Date(), {}, {available: true}, 'Empty dict is true'],
    [new Date('2021-01-01T13:37:00.000Z'), {'Fri Jan 02 2021': {bookings: [{partial: false}]}}, {available: true}, 'Previous day is true'],
    [new Date('2021-01-01T13:37:00.000Z'), {'Fri Jan 01 2021': {bookings: [{partial: false}]}}, {
        available: false,
        bookings: [{partial: false}],
        earliest: undefined,
        last: undefined,
    }, 'Same day is false'],
    [new Date('2021-01-01T13:37:00.000Z'), {
        'Fri Jan 01 2021': {
            bookings: [{
                partial: true,
                begin: new Date('2021-01-01T13:37:00.000Z'),
                end: new Date('2021-01-01T14:37:00.000Z'),
            }],
        },
    }, {
        available: true,
        partial: true,
        bookings: [{
            partial: true,
            begin: new Date('2021-01-01T13:37:00.000Z'),
            end: new Date('2021-01-01T14:37:00.000Z'),
        }],
        earliest: new Date('2021-01-01T13:37:00.000Z'),
        last: new Date('2021-01-01T14:37:00.000Z'),
    }, 'Same day partial is true'],
    [new Date('2021-01-01T13:37:00.000Z'), {
        'Fri Jan 01 2021': {
            bookings: [{
                partial: true,
                begin: new Date('2021-01-01T13:37:00.000Z'),
                end: new Date('2021-01-01T14:37:00.000Z'),
            }, {partial: true, begin: new Date('2021-01-01T17:37:00.000Z'), end: new Date('2021-01-01T19:37:00.000Z')}],
        },
    }, {
        available: true,
        partial: true,
        bookings: [{
            partial: true,
            begin: new Date('2021-01-01T13:37:00.000Z'),
            end: new Date('2021-01-01T14:37:00.000Z'),
        }, {partial: true, begin: new Date('2021-01-01T17:37:00.000Z'), end: new Date('2021-01-01T19:37:00.000Z')}],
        earliest: new Date('2021-01-01T13:37:00.000Z'),
        last: new Date('2021-01-01T19:37:00.000Z'),
    }, 'Same day partial with multiple bookings sets correct earliest and last values'],
])('test checkIfDateAvailable', (date, unavailableDates, expected, name) => {
    test(name, () => {
        expect(checkIfDateAvailable(date, unavailableDates)).toStrictEqual(expected);
    });
});

describe.each([
    [new Date('2021-01-02T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), new Date('2021-01-03T13:37:00.000Z'), {
        active: true,
        partial: '',
    }, 'Active true and partial empty when in the middle of the booking'],
    [new Date('2021-01-02T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), new Date('2021-01-02T18:37:00.000Z'), {
        active: true,
        partial: 'top',
        until: new Date('2021-01-02T18:37:00.000Z'),
    }, 'Active true and partial top when end is on checked date'],
    [new Date('2021-01-02T13:37:00.000Z'), new Date('2021-01-02T13:37:00.000Z'), new Date('2021-01-03T13:37:00.000Z'), {
        active: true,
        partial: 'bottom',
        from: new Date('2021-01-02T13:37:00.000Z'),
    }, 'Active true and partial bottom when begin is on checked date'],
    [new Date('2021-01-02T13:37:00.000Z'), new Date('2021-01-02T10:37:00.000Z'), new Date('2021-01-02T18:37:00.000Z'), {
        active: true,
        partial: 'switch',
        from: new Date('2021-01-02T10:37:00.000Z'),
        until: new Date('2021-01-02T18:37:00.000Z'),
    }, 'Active true and partial switch when begin and end are on checked date'],
    [new Date('2021-01-03T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), new Date('2021-01-02T13:37:00.000Z'), {
        active: false,
        partial: '',
    }, 'Active false and partial empty when checked is not overlapping with the booking'],
    [new Date('2021-01-03T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), undefined, {
        active: false,
        partial: '',
    }, 'Active false and partial empty when no booking end set'],
    [new Date('2021-01-03T13:37:00.000Z'), undefined, new Date('2021-01-01T13:37:00.000Z'), {
        active: false,
        partial: '',
    }, 'Active false and partial empty when no booking begin set'],
    [new Date('2021-01-03T13:37:00.000Z'), undefined, undefined, {
        active: false,
        partial: '',
    }, 'Active false and partial empty when no booking set'],
])('test checkIfDateActive', (date, bookingBegin, bookingEnd, expected, name) => {
    test(name, () => {
        expect(checkIfDateActive(date, bookingBegin, bookingEnd)).toStrictEqual(expected);
    });
});

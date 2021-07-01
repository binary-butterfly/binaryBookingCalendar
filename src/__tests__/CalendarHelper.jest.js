import {compareDateWithoutTime, compareMonthAndYear, getDaysInMonth} from '../js/CalendarHelper';

describe.each([
    [-12, 1],
    [-1, 1],
    [0, 0],
    [1, -1],
    [13, -1],
])('compare month and year with a difference of %i months returns %i', (offset, expected) => {
    test('returns ${expected}', () => {
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
])('compare month and year with a difference of %i years returns %i', (offset, expected) => {
    test('returns ${expected}', () => {
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
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2021-01-01T12:37:00.000Z'), 0],
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), 0],
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2021-02-01T12:37:00.000Z'), -1],
    [new Date('2020-01-01T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), -1],
    [new Date('2021-01-01T13:37:00.000Z'), new Date('2020-01-01T13:37:00.000Z'), 1],
    [new Date('2021-02-01T13:37:00.000Z'), new Date('2021-01-01T13:37:00.000Z'), 1],
])('compare date without time for %s and %s returns %i', (dateA, dateB, expected) => {
    test('returns ${expected}', () => {
        expect(compareDateWithoutTime(dateA, dateB)).toBe(expected);
    });
});

describe.each([
    // note that js months start at 0
    [2021, 1, 28],
    [2020, 1, 29],
    [2021, 0, 31],
    [2021, 2, 31],
    [2021, 3, 30],
    [2021, 4, 31],
    [2021, 5, 30],
    [2021, 6, 31],
    [2021, 7, 31],
    [2021, 8, 30],
    [2021, 9, 31],
    [2021, 10, 30],
    [2021, 11, 31],
    [2100, 1, 28],
])('getDaysInMonth for %i %i returns %i', (year, month, expected) => {
    test('returns ${expected}', () => {
        expect(getDaysInMonth(year, month)).toBe(expected);
    })
});

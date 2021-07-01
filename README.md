# binaryBookingCalendar

This is a React Component that contains a calendar together with date/time inputs to allow users to select a time range
in which they want to book something.

## Usage

* Install the package using ```npm install --save binary-booking-calendar``` or by manually adding it to
  your ```package.json```
* Import the component: ```import Calendar from 'binary-booking-calendar/dist/binaryBookingCalendar'```
* Use it in your code with the properties explained below:


* ```bookings``` An array of already existing bookings formatted like
  this: ```{begin: $utcTimeStrinc, end: $utcTimeString}```
* ```maxBookingLength``` If bookings cannot be infinitely long, use this to set a max length in milliseconds
* ```initialView``` Either ```month```, ```3monnths``` or ```asap```
    * Hint: You could make this dependent on your users' device size like
      this: ```screen.width > 800 ? 'month' : 'asap'```
* ```getPrice``` A function that returns a promise which in turn returns the price for the booking timespan. This
  function should take the date objects ```bookingBegin``` and ```bookingEnd``` as parameters.
* ```handleSubmit``` A function that submits the booking to your backend. This should also accept the two date objects
  as well as an optional boolean indicating the booking starts now.

## Current state

While the calendar is in a usable state, it was written in limited time, therefore the code quality may not be the best
and there are still quite a few TODOs.  

At the moment, there aren't many config options, and the component is only available in German language.  
Both of these are supposed to change at some point but no timeframe has been set for this yet.

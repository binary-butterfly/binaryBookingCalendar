import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';
import '../scss/demo.scss';

const DemoPage = () => {
    return <Calendar bookings={[]}
                     initialView="month"
                     handleSubmit={(begin, end, now) => alert(JSON.stringify({begin: begin, end: end, now: now}))}
                     getPrice={() => new Promise((resolve) => resolve(10.0))}/>;
};

const DomContainer = document.getElementById('root');
ReactDOM.render(<DemoPage/>, DomContainer);

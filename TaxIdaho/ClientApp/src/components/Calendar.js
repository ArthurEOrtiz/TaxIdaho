import React, { Component } from 'react';
import './Calendar.css';

export class Calendar extends Component {
	static displayName = Calendar.name;

	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: new Date().getMonth(),
			selectedYear: new Date().getFullYear()
		};
	}

	componentDidMount() {
		this.createCalendar();
	}

	getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}

	createCalendar() {
		const { selectedMonth, selectedYear } = this.state;
		const daysInMonth = this.getDaysInMonth(selectedMonth, selectedYear);
		const daysArray = Array.from({ length: daysInMonth}, (_, i) => i + 1);

		return (
			<div className="calendar-container">
			<div className="calendar-header">
			  <button onClick={() => this.setState({ selectedMonth: selectedMonth - 1 })}>{'<'}</button>
			  <h2>{`${new Date(selectedYear, selectedMonth).toLocaleString('default', {
				month: 'long',
			  })} ${selectedYear}`}</h2>
			  <button onClick={() => this.setState({ selectedMonth: selectedMonth + 1 })}>{'>'}</button>
			</div>
			<div className="days-of-week">
			  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
				<div key={day}>{day}</div>
			  ))}
			</div>
			<div className="calendar-days">
			  {daysArray.map(day => (
				<div key={day} className="calendar-day">
				  {day}
				  {/* Add your logic to populate each day with text here */}
				</div>
			  ))}
			</div>
		  </div>
		);
	}

	render() {
		return <>{this.createCalendar()}</>
	}

}
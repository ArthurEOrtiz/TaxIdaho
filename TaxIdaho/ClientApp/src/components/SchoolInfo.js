import React, { Component } from 'react';

export class SchoolInfo extends Component {
	static displayName = SchoolInfo.name;

	constructor(props) {
		super(props);
		this.state = { courses: [], loading: true };
	}

	componentDidMount() {
		this.populateSchoolInfoDate();
	}

	static renderCoursesTable(courses) {
		return (
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>School Type</th>
						<th>Date</th>
						<th>Seq</th>
						<th>City</th>
						<th>Location 1</th>
						<th>Location 2</th>
						<th>Dead Line</th>
					</tr>
				</thead>
				<tbody>
					{courses.map((course, index) =>
						<tr key={index}>
							<td>{course.sSchoolType}</td>
							<td>{course.sDateSchool}</td>
							<td>{course.sSeq}</td>
							<td>{course.sCity}</td>
							<td>{course.sLocation1}</td>
							<td>{course.sLocation2}</td>
							<td>{course.sDeadLine}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: SchoolInfo.renderCoursesTable(this.state.courses);

		return (
			<div>
				<h1 id="tabelLabel"> School Info </h1>
				<p>Trying to display some data of a page</p>
				{contents}
			</div>
		);
	}

	//async populateSchoolInfoDate() {
	//	const response = await fetch('schoolinfo');
	//	const data = await response.json();
	//	this.setState({ courses: data, loading: false });
	//}
	async populateSchoolInfoDate() {
		try {
			const response = await fetch('schoolinfo');

			if (!response.ok) {
				throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			console.log('Received data:', data); // Log the received data for debugging purposes
			this.setState({ courses: data, loading: false });
		} catch (error) {
			console.error('Error:', error);
			// Handle the error, update state, or show a user-friendly error message as needed
		}
	}
}
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder } from '../actions';
import { clearReminders } from '../actions';
import { deleteReminder } from '../actions';
import moment from 'moment';

class App extends Component{

	constructor(props){
		super(props);
		this.state = {
			text : '',
			dueDate : ''
		}
	}

	addReminder(){
		console.log('this.state',this);
		this.props.addReminder(this.state.text, this.state.dueDate);
	}

	deleteReminder(id){
		console.log('deleting',id);
		console.log('this.props',this.props);
		this.props.deleteReminder(id);
	}

	clearReminders(){
		this.props.clearReminders(); 
	}

	renderReminder(){
		const { reminders } = this.props;
		return (
			<ul className="list-group col-sm-4">
				{
					reminders.map( reminder => {
						return (
							<li key={reminder.id} className="list-group-item">
								<div className="list-item">
									<div>{reminder.text}</div>
									<div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
								</div>
								<div className="list-item delete-button"
									onClick={()=> this.deleteReminder(reminder.id)}>&#x2715;</div>
							</li>
						);
					})

				}
			</ul>
		);
	}

	render(){
		return (
			<div className="App">
				<div className="title">
					Reminder Pro
				</div>
				<div className="form-inline reminder-form">
					<div className="form-group">
						<input className="form-control" placeholder="Remind me to..." onChange={event=>this.setState({ text :event.target.value})}/>
						<input className="form-control" type="datetime-local" onChange={event=>this.setState({ dueDate :event.target.value})}/>
					</div>
					<button type="button" className="btn btn-success" onClick={()=> this.addReminder()}>Save</button>
				</div>
				{ this.renderReminder()}
				<button type="button" className="btn btn-danger" onClick={()=> this.clearReminders()}>Clear Reminders</button>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ addReminder }, dispatch);
}

function mapStateToProps(state){
	return {
		reminders : state
	}
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);
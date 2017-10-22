import {ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constant';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) =>{
	let { text, dueDate } = action;
	return {
		text,
		dueDate,
		id : Math.random()
	}
};

const deleteById = (state =[], id) => {
	const reminder = state.filter( reminder => reminder.id !== id);
	console.log('updated list',reminder);
	return reminder;

};

const reminders = (state = [], action) =>{
	let reminders = null;
	state = read_cookie('reminders');
	switch(action.type){
		case ADD_REMINDER:
			reminders = [...state, reminder(action)];
			bake_cookie('reminders',reminders);
			return reminders;
		case DELETE_REMINDER:
			reminders = deleteById(state, action.id);
			bake_cookie('reminders',reminders);
			return reminders;
		case CLEAR_REMINDERS:
			reminders = [];
			bake_cookie('reminders',reminders);
			return reminders;
		default:
			return state;
	}
};


export default reminders;
// function to show the message
// create a constant for "help" elements then writes the selected message
// noinspection RegExpSimplifiable,JSUnnecessarySemicolon,JSIgnoredPromiseFromCall

function showMessage(input, message, type) {
	const msg = input.parentNode.querySelector("#help");
	msg.innerText = message;
	input.className = type ? "success" : "error";
	return type;
}

// function to show an error
// create to return the selected message when the function is called in another function
// return false to permit to activate css

function error(input, message) {
	return showMessage(input, message, false);
}

// function to show a success
// return true to permit to active css

function success(input) {
	return showMessage(input, "", true);
}

// function to analyze the content of an input
// checks if the input is not empty. If it is, it returns to the error function with the selected message.
// If the input contains an element, it returns to the success function  

function hasValue(input, message) {
	// the trim() method permit to remove the space before and after an input
	if (input.value.trim() === "") {
		return error(input, message);
	}
	return success(input);
}

// main function of the validation 
// 4 variables are given to him (the input, the different messages, the regex)

function validation(input, requiredMsg, invalidMsg, regex) {
	// verify if the input has a value with "hasValue" function
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	
	// create a constant with the value of the input and compares it to the selected regex  
	const dataInput = input.value.trim();
	if (!regex.test(dataInput)) {
		return error(input, invalidMsg);
	}
	return true;
}

// define all constants

const scriptURL = 'https://script.google.com/macros/s/AKfycbwXRahKw8X8CA69p8UnvtsrzeHzuD34N79aS32kd2heW43yaclFhvp10070pcfKrQqF/exec'
const form = document.querySelector("#contactus");

//constants for the different message (two for each input)

const FNAME_REQUIRED = "Please enter your first name"
const NAME_REQUIRED = "Please enter your name";
const ALLNAME_INVALID = "Please enter a correct name format";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const COMMENT_REQUIRED = "Please enter your comment";
const COMMENT_INVALID = "Please enter a correct comment format";

// constants for regex (name, email and comment)

const nameRegex = 
	/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const commentRegex =
	/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;

// added an event listener on the form button

form.addEventListener("submit", function (event) {

	event.preventDefault();

	// declaration of block scoped variables
	// one for each input related to the validation function
	// we declare the input, the two message (one for the error and one for invalid format) and the regex

	let fnameValid = validation(form.elements["fname"], FNAME_REQUIRED, ALLNAME_INVALID, nameRegex);
	let nameValid = validation(form.elements["name"], NAME_REQUIRED, ALLNAME_INVALID, nameRegex);
	let emailValid = validation(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID, emailRegex);
    let commentValid = validation(form.elements["comment"], COMMENT_REQUIRED, COMMENT_INVALID, commentRegex);

	//if all the information is good, we send them on the Excel, we write a message of reception, and we reset the inputs
	
	if (fnameValid && nameValid && emailValid && commentValid) {
		fetch(scriptURL, { method: 'POST', body: new FormData(form)});
		const div = document.getElementById('success');
      	div.innerHTML = 'Thank you. Your information has been taken into account';
		$('#contactus')[0].reset();
	};
});



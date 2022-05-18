function showMessage(input, message, type) {
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function validation(input, requiredMsg, invalidMsg, regex) {
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	
	const dataInput = input.value.trim();
	if (!regex.test(dataInput)) {
		return showError(input, invalidMsg);
	}
	return true;
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbwXRahKw8X8CA69p8UnvtsrzeHzuD34N79aS32kd2heW43yaclFhvp10070pcfKrQqF/exec'
const form = document.querySelector("#contactus");

const FNAME_REQUIRED = "Please enter your first name"
const NAME_REQUIRED = "Please enter your name";
const ALLNAME_INVALID = "Please enter a correct name format";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const PHONE_REQUIRED = "Please enter your phone number";
const PHONE_INVALID = "Please enter a correct phone number format";

const nameRegex = 
	/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
	/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

form.addEventListener("submit", function (event) {

	event.preventDefault();

	let fnameValid = validation(form.elements["fname"], FNAME_REQUIRED, ALLNAME_INVALID, nameRegex);
	let nameValid = validation(form.elements["name"], NAME_REQUIRED, ALLNAME_INVALID, nameRegex);
	let emailValid = validation(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID, emailRegex);
    let phoneValid = validation(form.elements["phone"], PHONE_REQUIRED, PHONE_INVALID, phoneRegex);

	if (fnameValid && nameValid && emailValid && phoneValid) {
		fetch(scriptURL, { method: 'POST', body: new FormData(form)});
		var div = document.getElementById('success');
      	div.innerHTML = 'Thank you. Your information has been taken into account';
		$('#contactus')[0].reset();
	};
});



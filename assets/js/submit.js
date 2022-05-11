$(function () {
    $('#submit').click(function () {
        const startAddress = $('#input-start').val();
        const endAddress = $('#input-end').val();
        const vehicle = $('#input-vehicle').val();

        if (startAddress === '' || endAddress === '' || vehicle === '') {
            alert('Please fill in all fields');
            return
        }
        alert('Your request has been submitted');

    });
})




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

const form = document.querySelector("#contactus");

const FNAME_REQUIRED = "Please enter your first name"
const NAME_REQUIRED = "Please enter your name";
const ALLNAME_INVALID = "Please enter a correct name format";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const TEL_REQUIRED = "Please enter your phone number";
const TEL_INVALID = "Please enter a correct phone number format";

const nameRegex = 
	/^[a-zA-Z][a-zA-Z0-9 ]+$/
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
	/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

form.addEventListener("submit", function (event) {

	event.preventDefault();

	let fnameValid = validation(form.elements["fname"], FNAME_REQUIRED, ALLNAME_INVALID, nameRegex);
	let nameValid = validation(form.elements["name"], NAME_REQUIRED, ALLNAME_INVALID, nameRegex);
	let emailValid = validation(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID, emailRegex);
    let phoneValid = validation(form.elements["tel"], TEL_REQUIRED, TEL_INVALID, phoneRegex);

	if (fnameValid && nameValid && emailValid && phoneValid) {
		alert("It's a demonstration only. No data was taken");
	}
});


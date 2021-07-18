window.onload = init;

function init(){
    toggleToolTip();
    firstNameFocus();
    fieldsOnBlur();
    fieldsOnFocus();
    setDefaultText();
    document.getElementById('contact').onsubmit = formSubmit;
}

//Setting default text 

function setDefaultText() {
    var hanInput = document.getElementById("healthAuthorityNumber");
    hanInput.value = "The letters ZHA followed by six numbers, e.g. ZHA346783";
    hanInput.onmousedown = function() {
        if(hanInput.value = "The letters ZHA followed by six numbers, e.g. ZHA346783") {
            this.value = "";
            this.className = "";        } 
     }
    }

//sets everything to onblur

function fieldsOnBlur() {
    document.getElementById('firstName').onblur = function(){return checkName("firstName");};
    document.getElementById('lastName').onblur = function(){return checkName("lastName");};
    document.getElementById('title').onblur = checkTitle;
    document.getElementById('healthAuthorityNumber').onblur = checkHAN;
    document.getElementById('email').onblur = checkEmail;
   document.getElementById('telephone').onblur = checkTel;
}

// removes error messages on focus


function fieldsOnFocus() {
        var ids = ['firstName','lastName','title','healthAuthorityNumber','email','telephone'];
        for(var i = 0;i<ids.length;i++)
            document.getElementById(ids[i]).onfocus = clearFieldError;
    }


function clearFieldError() {
    document.getElementById(this.id + 'Error').innerHTML = "&nbsp;";
    document.getElementById(this.id).classList.remove('inputError');
    document.getElementById('submitError').innerHTML = "&nbsp;";
}

// Toogle tooltip function
    function toggleToolTip() { 
        document.getElementById('info-image').onmouseover = function() {
            var toolTip = document.getElementById('tooltip-info');
            toolTip.className = "tooltip";
        }
        document.getElementById('info-image').onmouseout = function() {
            var toolTip = document.getElementById('tooltip-info');
            toolTip.className = "tooltip-hide";
        } 	
    }

// Set form focus to First Name
    function firstNameFocus() {
        document.getElementById("firstName").focus();
    }

// Stop form submitting if any of the fields are false

    function formSubmit() {
        var submitErrorMessage = document.getElementById('submitError');
        var firstNameCheck = checkName("firstName");
        var lastNameCheck = checkName("lastName");
        var titleCheck =  checkTitle();
        var emailCheck = checkEmail();
        var hanCheck = checkHAN();
        var telCheck = checkTel();
        if(firstNameCheck == false || lastNameCheck == false || titleCheck == false || hanCheck == false || emailCheck == false || telCheck == false) {
            submitErrorMessage.innerHTML = "Please fix the errors in the form";
            return false;
        } 
    }

/* --------------------- Mandatory Fields ------------------------------------*/ 

// Check Name

function checkName(name)
{
	var valid = true;
    var nameInput = document.getElementById(name).value;
    var nameClass = document.getElementById(name);
    var spacesOnlyRegEx = /^\s+$/;
    var containsNumbersRegEx = /\d$/;
    var containsSpecialCharsRegEx = /[!"£$%^&*()\-_+|~=`{}[:;<>?/,.@#\]$]/g;
    var hyphenRegex = /^[a-zA-Z][a-zA-Z]*(-[a-zA-Z][a-zA-Z]*)?$/;
    var errorMessage = document.getElementById(name + 'Error');
	if (nameInput == "" || nameInput.length == 0 || nameInput.length <= 1)
	{
        nameClass.className = "inputError";
        errorMessage.innerHTML = "Name field cannot be empty and must be more than 1 character";
		valid = false;
    }
    //checks if input is spaces only
    else if (!nameInput.replace(spacesOnlyRegEx, '').length) {
        nameClass.className = "inputError";
        errorMessage.innerHTML = "Name field cannot be spaces only";
        valid = false;
    }
    //uses regular expressions to test if names contains a number
    else if (containsNumbersRegEx.test(nameInput)) {
        nameClass.className = "inputError";
        errorMessage.innerHTML = "Name field cannot contain numbers";
        valid = false;
    }
    //checks if it's 'lastName' AND if it contains a hypehn, then uses regular expressions to test if it contains a properly used hyphen
    else if (name == "lastName" && nameInput.indexOf('-') != -1) {
        if (!hyphenRegex.test(nameInput)) {
            nameClass.className = "inputError";
            errorMessage.innerHTML = "Please enter a valid hyphenated name, ie Whittaker-Jones";
            valid = false;
      }
    }
    // checks for special characters
    else {
        if (containsSpecialCharsRegEx.test(nameInput)) {
        nameClass.className = "inputError";
        errorMessage.innerHTML = "Name field cannot contain Special characters";
        valid = false;
    } 
   }
    return valid;
}

// check title field

function checkTitle() {
    var valid = true;
    var optionValue = document.getElementById('title').value;
    var  errorMessage = document.getElementById('titleError');
    if(optionValue == "Choose title") {
        title.className = "inputError";
        errorMessage.innerHTML = "You must select a title";
        valid = false;
    }
    return valid;
}

// check HAN

function checkHAN() {
    var valid = true;
    var hanRegex = /^[Zz]{1}[Hh]{1}[Aa]{1}\d{6}$/;
    var hanID = document.getElementById('healthAuthorityNumber');
    var errorMessage = document.getElementById('healthAuthorityNumberError');
    var hanDefaultText = "The letters ZHA followed by six numbers, e.g. ZHA346783";
    if (!hanRegex.test(hanID.value)) {
        hanID.classList.add('inputError');
        errorMessage.innerHTML = "Your Zedland Health Authority Number must begin with ZHA followed by 6 numbers";
        if(hanID.value == "") {
            hanID.value = "The letters ZHA followed by six numbers, e.g. ZHA346783";
            hanID.classList.add('defaultText');
        } 
        valid = false;
    }
    return valid;
}

// check email

function checkEmail() {
    var valid = true;
    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var emailInput = document.getElementById('email').value;
    var errorMessage = document.getElementById('emailError');
    if (!emailRegex.test(emailInput)) {
        email.className = "inputError";
        errorMessage.innerHTML = "Please enter a valid email address";
        valid = false;
    }
    return valid;
}

// check Telephone

function checkTel() {
    var valid = true;
    var telValue = document.getElementById('telephone');
    var telRegex = /^\d{11}$/;
    var errorMessage = document.getElementById('telephoneError');
    if (telValue.value != "") {
        if(!telRegex.test(telValue.value)) {
            telephone.className = "inputError";
            errorMessage.innerHTML = "If you wish to submit your phone number, please enter a valid Zedland phone number (11 digits with no spaces)"
            valid = false;
        } 
    }
    return valid;
}



/*                 S O U R C E S                                           S O U R C E S                                      S O U R C E S                                   S O U R C E S                            */



///////////////////////////////// Toggle Tooltip ////////////////////////////////////////

/*

- Lesson 5 activity materials

*/

/////////////////////////////// Madatory fields //////////////////////////////////////////

/*

- https://www.safaribooksonline.com/videos/javascript-for-beginners/9781789133752/9781789133752-video15_1 - Beginning Javascript, JavaScript Forms Validation
- https://www.safaribooksonline.com/videos/javascript-for-beginners/9781789133752/9781789133752-video15_2 - Beginning Javascript, Constraint Validation
- https://www.w3schools.com/js/tryit.asp?filename=tryjs_validation_js
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
- http://regexlib.com/REDetails.aspx?regexp_id=26 - I started with this one but made some other adjustments
- https://forums.asp.net/t/2023592.aspx - I used this one in the comments but adapted it to take a normal first name as well, also to accept lower case letters for names and made some other adjustments
- https://www.regular-expressions.info/shorthand.html - spaces only

*/

//////////////////////////// Clearing fields on form focus ///////////////////////////////////

/*

- https://titan.dcs.bbk.ac.uk/~lbrod03/jv-2017-t1/form.html

*/


/////////////////////////////// Dfault Text //////////////////////////////////////////////////

/*

// - Session 8 activity materials
// https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue - onmousedown information to solve onfocus ordering

*/
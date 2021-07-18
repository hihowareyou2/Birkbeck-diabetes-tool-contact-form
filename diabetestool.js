function checkForm() {
        document.getElementById("bmiQuiz").onsubmit = function() {
            var score = scores();
            var totalRiskLevel = totalScores(score);
            var riskMessage = identifyRisks(score);
            displayResults(riskLevel(totalRiskLevel), highRiskMessage(riskMessage));
            document.getElementById("results").className = "displayResults";
            return false;
        }
    }

// function to extract numbers out of radio button as an array (scores)

function scores() {
    var scoresArray = [];
    var inputValues = document.getElementsByTagName("input");
    for(i = 0; i < inputValues.length; i++) {
        if(inputValues[i].checked) {
            scoresArray.push(parseInt(inputValues[i].value));
        }
    }
    return scoresArray;
}

// function to calculate Total scores, using array from function above

function totalScores(inputArray) {
    var addScores = 0;
    for(i = 0; i < inputArray.length; i++) {
        addScores += inputArray[i];
    }
    return addScores;
}

// function to see which are the main risk factors using the scores array

function identifyRisks(inputArray) {
    var riskFactors = [];
    for(i = 0; i < inputArray.length; i++) {
        if(inputArray[i] >= 10) {
            if(i == 0) {
                riskFactors.push("age");
            }
            else if(i == 1) {
                riskFactors.push("BMI");
            }
            else if(i == 2) {
                riskFactors.push("family");
            }
            else {
                riskFactors.push("diet");
            }
        }
    }
    return riskFactors;
}

// function to determine risk level based on the result of the totalScores function

function riskLevel(riskScores){
    var userRiskLevel;
    if(riskScores <= 15) {
        userRiskLevel = "Low";
    }
    else if(riskScores <= 25) {
        userRiskLevel = "Medium";
    }
    else {
        userRiskLevel = "High";
    }
    return userRiskLevel;
  }

  //function to determine which message to show a user if they are High Risk

  function highRiskMessage(idRisks) {
    var riskFactorMessage = "";
    if(idRisks.length == 0) {
        riskFactorMessage = "This is because of an average combination of your age, BMI, family and your diet";
    }
    else if(idRisks.length == 1) {
        riskFactorMessage = "Your main risk factor is your " + idRisks[0];
    }
    else if(idRisks.length == 2) {
        riskFactorMessage = "Your main risk factors are your " + idRisks[0] + " and your " + idRisks[1];
    }
    else if(idRisks.length == 3) {
        riskFactorMessage = "Your main risk factors are your " + idRisks[0] + ", " + idRisks[1] + " and your " + idRisks[2];
    }
    else {
        riskFactorMessage = "Your main risk factors are your " + idRisks[0] + ", " + idRisks[1] + ", " + idRisks[2]  + " and your " + idRisks[3];
    }
    return riskFactorMessage;
  }


// function to diplay result based on calculate risk level, and the high risk message in the function above

function displayResults(riskLevel, riskMessage) {
    var messageBlock = document.getElementById("resultsPara");
    var a = document.createElement('a');
    var extraText = document.createTextNode('');
    var riskMessageLow = "Your results show that you currently have a low risk of developing diabetes. However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.";
    var riskMessageMedium = "Your results show that you currently have a medium risk of developing diabetes. For more information on your risk factors, and what to do about them, please visit our diabetes advice website at ";
    var riskMessageHigh = "Your results show that you currently have a HIGH risk of developing diabetes. " + riskMessage + ". We advise that you contact the Health Authority to discuss your risk factors as soon as you can. Please fill in our "; 
    var riskMessageHighPart2 = " and a member of the Health Authority Diabetes Team will be in contact with you."; 
    if(riskLevel == "Low") {
        messageBlock.innerHTML = riskMessageLow;
    }
    else if(riskLevel == "Medium") {
        messageBlock.innerHTML = riskMessageMedium;
        a.innerHTML = "http://www.zha.org.zd.";
        a.href = "http://www.zha.org.zd.";
        messageBlock.appendChild(a);
    } else {
        messageBlock.innerHTML = riskMessageHigh;
        a.innerHTML = "contact form";
        a.href = "contactform.html";
        messageBlock.appendChild(a);
        extraText = riskMessageHighPart2;
        messageBlock.append(extraText);
    }
}

window.onload = checkForm;
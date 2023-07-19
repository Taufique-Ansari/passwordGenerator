const inputSlider = document.querySelector("[data-LengthSlider]");
const lengthDisplay = document.querySelector(".data-LengthNumber");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector ("[data-copyMsg]");
const uppercaseCheck = document.querySelector ("#check1");
const lowercaseCheck = document.querySelector("#check2");
const numbersCheck = document.querySelector ("#check3");
const symbolsCheck = document.querySelector ("#check4") ;
const indicator = document.querySelector ("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input [type=checkbox]") ;
const symbols = '~`!@#$%^&*()[]_-+=:;"<>,.?/';

let password = passwordDisplay.value;
var passwordLength = 10;

handleSlider();
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = inputSlider.value;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function randomInt(min,max){
    return Math.floor(Math.random() * (max-min) + min);
}

function generateRndNO(){
    return randomInt(0,9);
}

function generateRndLowercase(){
    return String.fromCharCode(randomInt(97,123))
}

function generateRndUppercase(){
    return String.fromCharCode(randomInt(65,91))
}

function generateSymbols(){
    const randomNo = randomInt(0,symbols.length)
    return symbols.charAt(randomNo)
}

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNo = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNo = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNo || hasSym) && passwordLength >= 8){
        setIndicator("lightgreen");
    }
    else if((hasUpper || hasLower) && (hasNo || hasSym) && passwordLength >= 6){
        setIndicator('yellow');
    }
    else{
        setIndicator('red');
    }
}

async function copyContent(){
    try{
        passwordDisplay.select();
        passwordDisplay.setSelectionRange(0, 99999);
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = 'copied';
    }
    catch(e){
        alert("something went wrong");
    }
}

copyBtn.addEventListener('click', () => {
    copyContent();
    copyMsg.style.visibility = 'visible';
    setTimeout(() => {
        copyMsg.style.visibility = 'hidden';
    },1000)
})

inputSlider.addEventListener('input', () =>{
    lengthDisplay.innerHTML = inputSlider.value;
    passwordLength = inputSlider.value;
})

function handleGenerateBtn(){
    let hasUpper = false;
    let hasLower = false;
    let hasNo = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNo = true;
    if(symbolsCheck.checked) hasSym = true;

    var c = 0;
    for(let i = 0; i < passwordLength; i++){
        // console.log("inside for");
        while(c < passwordLength){
            // console.log("inside while");
            if(hasUpper){
                let uppervalue = generateRndUppercase();
                passwordDisplay.value = passwordDisplay.value+uppervalue;
                c++;
                // console.log("inside if");
            }
            if(hasLower){
                let lowervalue = generateRndLowercase();
                passwordDisplay.value = passwordDisplay.value+lowervalue;
                c++;
                // console.log("inside if2");
            }
            if(hasNo){
                let numvalue = generateRndNO();
                passwordDisplay.value = passwordDisplay.value+numvalue;
                c++;
            }
            if(hasSym){
                let symvalue = generateSymbols();
                passwordDisplay.value = passwordDisplay.value+symvalue;
                c++;
            }
        }
    }
}

var count = 1;
generateBtn.addEventListener('click',() => {
    if(count<2){
        handleGenerateBtn();
        count++;
    }else{
        passwordDisplay.value = "";
        handleGenerateBtn();
    }
    copyBtn.addEventListener('click', () => {
        copyContent();
        copyMsg.style.visibility = 'visible';
        setTimeout(() => {
            copyMsg.style.visibility = 'hidden';
        },1000)
    })
    calStrength();
})


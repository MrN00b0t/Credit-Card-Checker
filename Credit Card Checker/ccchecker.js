// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];
//adding some extra arrays for providers that are not checked
//Valid CC number but unknown issuer
const added1 = [2, 7, 2, 0, 9, 9, 0, 5, 5, 5, 5, 7, 7, 1, 5, 1]
//Invalid CC and unknown issuer
const added2 = [7, 5, 3, 1, 4, 7, 6, 2, 0, 2, 8, 5, 5, 0, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, added1, added2];


// Add your functions below:
//Function to return true/false if array of numbers conforms to a Luhn algorithm (check digit included)
const validateCred = array => {
    //create Toggle to track every other element from check digit
    let doubleCounter = false;
    let checkArray = [];
    let checkSum = 0;
    for (let i = (array.length - 1); i >= 0; i--) {
        if (doubleCounter) {
            array[i] * 2 > 9 ? checkArray.push(array[i] * 2 - 9) : checkArray.push(array[i] * 2);
        } else {
            checkArray.push(array[i]);
        }
        doubleCounter = !doubleCounter;
    }
    for (let j = 0; j < checkArray.length; j++) {
        checkSum += checkArray[j];
    }
    return checkSum % 10 === 0;
}

//given nested array of number arrays, validate all number arrays and return an array of the invalid numbers
const findInvalidCards = nestedArray => {
    let invalidArray = [];
    for (let k = 0; k < nestedArray.length; k++) {
        //use validation function created earlier
        if (!validateCred(nestedArray[k])) {
            invalidArray.push(nestedArray[k]);
        }
    }
    return invalidArray;
}

//identify issuing company from first digit and return array of companies that have issued invalid number arrays (no duplicates)
const idInvalidCardCompanies = invalidNestArray => {
    let companyArray = [];
    for (let m = 0; m < invalidNestArray.length; m++) {
        switch (invalidNestArray[m][0]) {
            case 3:
                if (!companyArray.includes("Amex (American Express)")) {
                    companyArray.push("Amex (American Express)");
                }
                break;
            case 4:
                if (!companyArray.includes("Visa")) {
                    companyArray.push("Visa");
                }
                break;
            case 5:
                if (!companyArray.includes("Mastercard")) {
                    companyArray.push("Mastercard");
                }
                break;
            case 6:
                if (!companyArray.includes("Discover")) {
                    companyArray.push("Discover");
                }
                break;
            default:
                console.log(`Company not found - ${invalidNestArray[m][0]}`);
        }
    }
    return companyArray;
}
//Basic project test case using supplied data and created functions
//console.log(idInvalidCardCompanies(findInvalidCards(batch)));

//Extra Credit
//function to convert string number to an array of individual digits
const arrayNumber = stringNumber => {
    let numberArray = [];
    for (n = 0; n < stringNumber.length; n++) {
        numberArray.push(parseInt(stringNumber[n]));
    }
    return numberArray;
}
//test case for arrayNumber
//console.log(arrayNumber("343988425164318"));

//function to correct the card number
const correctNumber = invalidNumArray => {
    let correctedArray = invalidNumArray;
    correctedArray.pop();
    correctedArray.push(0);
    while (!validateCred(correctedArray)) {
        correctedArray.push(correctedArray.pop() + 1);
    }
    return correctedArray;
}
//tests for correctNumber
//console.log(correctNumber(invalid5));
//console.log(validateCred(correctNumber(invalid5)));
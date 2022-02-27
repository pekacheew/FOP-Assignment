const input = require('readline-sync')

var inputDisplay = ">>>> "   
var errorDisplay = "Please key in an option provided." 

function getInputString(){
                    
    var userInput = ""

    do{
        userInput = input.questionInt(inputDisplay)
        
        if(userInput.length == 0){ //check if it is empty string
            console.log(errorDisplay)
        }
    }while(userInput.length == 0)

    return userInput;
}

//validate input range
function getRangeValidation(input, lengths){
    if(input == 0){                         //INPUT 0, QUIT
        process.exit()
    }else if(input > lengths || input < 0){ //INPUT OUT OF RANGE
        console.log(errorDisplay)
        return true
    }else{                                  //INPUT WITHIN RANGE
        return false
    }
}

function getYorN(){
    yOrN = "";
    do{
        yOrN = input.question("\nEnter yes or no (y/n): ");
        if(yOrN.length > 1 || yOrN.length == 0 || yOrN != "y" && yOrN != "n"){
            console.log("Please enter y or n instead.");
            
        }else if(yOrN == "y"){
          return "y";
             
        }else if(yOrN == "n"){
           return "n";
            
        }
    }while(yOrN.length > 1 || yOrN.length == 0 || yOrN != "y" && yOrN != "n")
        
}




module.exports.getInputString = getInputString;
module.exports.getRangeValidation = getRangeValidation;
module.exports.getYorN = getYorN;
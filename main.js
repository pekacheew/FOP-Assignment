console.clear()
const toolbox = require('./toolbox');
const offering = require('./offering');
const OrderCart = require('./OrderCart');
const promoCodes = require('./promoCode');
const input = require('readline-sync');
const figlet = require('figlet');

//Store our items
var receiptArray = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var receipt = "";
var spReq = "";
var codeStr = "";
var pmCode;
var tOrF;
let allOrders = new OrderCart();
var option = 0;


//Main Program

do{
    option = getMenuOption()
    if(option == 1){
        getOrder() //Get & Add Order
    }else if(option == 2){
        viewCart() //View Cart
    }else if(option == 0){

        //double confirm with the user if they want to quit
        if(toolbox.getYorN() == "y"){   //if yes , quit
            process.exit()
        }else{                          //if no, force a loop
            option = 1
        }
        
    }
}while(option != 0)



function getMenuOption(){
    console.log("\n" + figlet.textSync("Welcome to Buangkok Square Kopitiam",{font:'bubble'}));
    console.log("===================================");
    console.log("1. View Menu");
    console.log("2. View Cart");
    console.log("0. Quit");
    return parseInt(toolbox.getInputString());
}


//consolidated order + add into cart
function getOrder(){
    menuSelection = offering.menu;
    foodType = getFoodType();       //foodType is reusable
    foodItem = getFoodItem();       //foodItem is reusable
    itemPrefs = "";                       //string for 
    item = menuSelection[(foodType-1)].offerings[(foodItem-1)];
    selectedItem = item;
    
    //clone the object using JSON.parse (deep clone)
    itemClone = JSON.parse(JSON.stringify(item))
    //preferences
    for(i = 0; i< item.preferences.length ; i++){
        itemClone.preferences[i] = selectedItem.preferences[i][getPreference()-1] //put pref into clone item

            function getPreference(){
            console.log("\nWhat are your preferences?");
            console.log("==========================");
            for(j = 0; j<selectedItem.preferences[i].length; j++){
                console.log(`${j+1}. ${selectedItem.preferences[i][j]}`);
            }
            console.log("0. Quit");
            //get input from user
            selectedPreference = parseInt(toolbox.getInputString());

            //input range validation
            if(toolbox.getRangeValidation(selectedPreference , selectedItem.preferences[i].length) == true ){
                getPreference()
            }
            return selectedPreference
        }
    }

    //get quantity
    itemClone.quantity = getQuantity();

    //add to order cart
    allOrders.addOrder(itemClone);

    //printing out and adding into displayItems()
    for(k=0 ; k<itemClone.preferences.length;k++){

        itemPrefs += " - "+itemClone.preferences[k]
    }

    displayOrder = `QTY: ${itemClone.quantity} x ${itemClone.description}${itemPrefs} - $${(itemClone.price*itemClone.quantity).toFixed(2)}`

    //Add into Order Cart so it will show when it is needed to be displayed
    allOrders.addDisplayOrder(displayOrder)
    //Print out immediately so it will show what has been "Added to Cart"
    console.log(`Added to Cart - ${displayOrder}`);
}


//Select Type of Food (Noodle/rice/drinks)
function getFoodType(){
        console.log("\nSelect Menu Type")
        console.log("==================")
        //display food types (noodle, rice , drinks)
        for(i=0; i < menuSelection.length ; i++){
            console.log(`${(i+1)}. ${menuSelection[i].viewType}`)
        }
        console.log("0. Quit")

        //get input from user
        foodType = parseInt(toolbox.getInputString())

        //input range validation
        if(toolbox.getRangeValidation(foodType , menuSelection.length) == true){
            getFoodType()
        }
        return foodType
}


//Select Food Item (Bak Chor Mee/ Laksa / Char Kway Teow)
function getFoodItem(){
    console.log("\nSelect Item Type")
    console.log("==================")
    for(i=0; i<menuSelection[foodType-1].offerings.length ; i++){
        console.log(`${(i+1)}. ${menuSelection[(foodType-1)].offerings[i].description}`)
    }
    console.log("0. Quit")

    //get input from user
    foodItem = parseInt(toolbox.getInputString())

    //input range validation
    if(toolbox.getRangeValidation(foodItem , menuSelection[foodType-1].offerings.length) == true){
        getFoodItem()
    }
    return foodItem
}


//Input for Quantity
function getQuantity(){
    console.log("\nHow many do you want?")
    quantity = parseInt(toolbox.getInputString()); //get input from user

    //input range validation for quantity
    if(quantity == 0 || quantity < 0){
        console.log("Invalid input, please enter a proper amount")
        getQuantity()
    }

    return quantity
}


//To View Cart
function viewCart(){

    //get total price
    totalAmount = allOrders.getTotalOrderPrice()

    console.log("\nYour cart:")
    console.log("=================================================")

    //check if cart is empty or not
    if(allOrders.isOrderEmpty() == true){
        console.log("Your cart is currently empty.")
    }

    //list down items added ony be one
    for (i=0; i<allOrders.orderItems.length;i++){
        console.log(`${i+1}. ${allOrders.getOrder(i)}`);
    }
    console.log("=================================================") 
    console.log("Total Price for all items is $"+totalAmount.toFixed(2))

    console.log("Enter Cart Option")
    console.log("1. Check Out")
    console.log("2. Remove Item")
    console.log("3. Remove all Items")
    console.log("0. Back to Main")

    //get input from user and validate the range.
    do{
        viewCartOption = parseInt(toolbox.getInputString())
            if(viewCartOption == 0){
                return
            }else if(viewCartOption > 3 || viewCartOption < 0){
                console.log("Please enter an option provided instead.")
            }
    }while(viewCartOption > 3 || viewCartOption < 0)
    
    
        if(viewCartOption == 1){
            checkOut()                          // checkout function
        }else if(viewCartOption == 2){
            allOrders.removeOrder((removeOrderHere()-1))    // remove order
        }else if(viewCartOption == 3){
            allOrders.removeAllOrder()                      // remove all order
        }else if(viewCartOption == 0){
            return
        }

}


//To Remove Order
function removeOrderHere(){
    console.log("\nWhich order do you want to remove?");
    return parseInt(toolbox.getInputString())
}

//Checkout function
function checkOut(){                            //check out all orders
    //for loop to display items 1 by 1
    console.log("\n==================================================")

    //check if cart is empty or not
    if(allOrders.isOrderEmpty() == true){
        console.log("Your cart is currently empty.")
    }

    for(i = 0 ; i < allOrders.orderItems.length ; i++){
        console.log(allOrders.displayItems[i])
    }
    console.log("==================================================")

    //ask user for any special requests
    if(allOrders.isOrderEmpty()==false){
        spRequest()
    }
    

    //if total amount is a valid amount , check out.
    if(totalAmount > 0){

        //go to PROMO CODE function
        checkForCode()

        //print out thank you MESSAGE
        console.log(`${figlet.textSync("\nThank you for eating with us",{font:'short'})}`)

        //print out DISPLAY ITEMS once again.
        console.log("\n==================================================")

        for(i = 0 ; i < allOrders.orderItems.length ; i++){
            console.log(`${i+1}. ${allOrders.displayItems[i]}`)
        }
        console.log("==================================================")

        pwpPromption()

        //print out SPECIAL REQUESTS
        console.log("\nSpecial Request(s):")
        console.log("===================")
        console.log(spReq)
        console.log("===================")

        //Unique RECEIPT number
        for(i=0; i < 9; i++){ 
            receipt += receiptArray[Math.floor(Math.random() * (receiptArray.length-1) +1)] 
        }

        //print out RECEIPT number
        console.log(`\nYour unique receipt number is : ${receipt}\n`)
        process.exit()

    }else if(totalAmount == 0.00){
        console.log("Unable to check out, you have not added any items to cart");
            return
    }

}

function spRequest(){                                //Special requests function
    spReq = input.question("\nEnter special request(s) or keep it empty. ")
    console.log("Confirm request? ")
    if(toolbox.getYorN() == "y"){
        return
    }else{
        spRequest()
    }
}

function pwpPromption(){                             //Purchase with Purchase promotion
    evenOdd = 0;
    //check if order is main or drink and add to evenOdd
    for(i=0; i < allOrders.orderItems.length ; i++){
        if(allOrders.orderItems[i].foodType == "Main"){
            evenOdd += 2;
        }else if(allOrders.orderItems[i].foodType == "Drink"){
            evenOdd += 0.999;               //it will never become an even number unless the user adds 2000 drinks
        }
    }

    //check if evenOdd is even or odd, if odd within a range then -$1
    if(evenOdd % 2 == 0 || (evenOdd % 2 !=0) && (evenOdd < 2)){
        
        console.log(`\nTotal Price for all items is $${totalAmount.toFixed(2)}\n`)

    }else if((evenOdd % 2 != 0) && (evenOdd > 2) ){
        totalAmount -= 1
        if(totalAmount < 0){
            totalAmount = 0
        }
        console.log("There is a purchase on purchase promotion and you have been given a $1 discount.")
        console.log(`\nTotal Price for all items is $${totalAmount.toFixed(2)}\n`)
    }
    
}

function checkForCode(){ 
        console.log("\n=========================")
        console.log("Do you have a promo code?")
        console.log("=========================")
        
        //ask user for input (yes or no) and validate input
        if(toolbox.getYorN() == "y"){ 
            i = 0

            do{
                codeStr = input.question("Enter your code (case-sensitive): ")
                pmCode = promoCodes.promoCodes
                do{
                    for(i = 0; i < pmCode.length ; i++){
                        //check entered code against the list of codes in promoCodes
                        if(codeStr == pmCode[i].promoCode){
                            tOrF = true;        //set tOrF as true
                            totalAmount = parseFloat(totalAmount - pmCode[i].discount)
                            //if totalAmount after discount is less than 0, total amount = 0
                                if(totalAmount < 0){
                                    totalAmount = 0
                                }
                            //if inputted promocode is valid, print price after discount
                            console.log(`\nTotal Price for all items is $${totalAmount.toFixed(2)}\n`)
                            return;
                        }else{
                            tOrF = false        //set tOrF as false
                        }
                    }
                    //if inputted promocode is not valid, tOrF = false , print error message
                    if(tOrF==false){
                        console.log("Invalid code, try again.")
                        checkForCode()
                    }         
                       
                }while(codeStr.length == 0)
            
            //validate against code
            }while(tOrF ==  false) 
            

        }else{
            return
        }
}
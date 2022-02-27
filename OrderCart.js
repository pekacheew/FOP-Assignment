class orderCart{
    
    constructor(){
        this.orderItems = [];
        this.displayItems = [];
        this.totalAmount = 0;
        
    }
    addDisplayOrder(neworder){                  //add order to be displayed
        this.displayItems.push(neworder);
    }
    addOrder(neworder){                         //add order object to be used
        this.orderItems.push(neworder); 
    }

    getOrder(index){                            //retrieve orders in cart
        return this.displayItems[index];  
    }

    removeOrder(index){                         //remove order in cart
        this.orderItems.splice(index,1) 
        this.displayItems.splice(index, 1)
        return
    }

    removeAllOrder(){                           //remove all orders
        this.orderItems = []
        this.displayItems = []  
        return          
    }

    isOrderEmpty(){                             //check if cart is empty
        return (this.orderItems.length==0)?true:false
    }

    getTotalOrderPrice(){                       //retrieve total price from orders
        this.totalAmount = 0
        var i;
        //A loop to get each object and to access the price of the objects
        for(i = 0 ; i < this.orderItems.length ; i++){
          this.totalAmount += parseFloat(this.orderItems[i].price * this.orderItems[i].quantity)
        }
        
        return this.totalAmount

    }

}
module.exports = orderCart


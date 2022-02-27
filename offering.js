const bakChorMee = {
    itemID      : 'n001',
    foodType    : 'Main',
    description : "Bak Chor Mee",
    preferences : [
        ['Mee Kia','Mee Pok','Mee Sua','Yellow Noodle'],
        ['Chili & Vinegar (Dry)','Chili (Dry)','Chili & Tomato (Dry)','Tomato (Dry)','Soup']
        
    ],
    price       : 3.5,
}

const laksa = {
    itemID      : 'n002',
    foodType    : 'Main',
    description : "Laksa",
    preferences : [
        ['Small','Big'],
        ['Thick Bee Hoon','Thin Bee Hoon','Kway Teow','Yellow Noodle']
    ],
    price       : 5,
}

const charKwayTeow = {
    itemID      : 'n003',
    foodType    : 'Main',
    description : "Char Kway Teow",
    preferences : [
        ['Small','Big'],
        ['Chili','No Chili']
    ],
    price       : 5,
}

const friedRice = {
    itemID      : 'r001',
    foodType    : 'Main',
    description : "Fried Rice",
    preferences : [
        ['Pork Cutlet','Chicken Cutlet','Beef Slices'],
        ['Extra Chili','Chili','No Chili']
    ],
    price       : 4.80,
}

const japaneseKatsuCurryRice = {
    itemID      : 'r002',
    foodType    : 'Main',
    description : "Japanese Katsu Curry Rice",
    preferences : [
        ['Small','Chicken Cutlet','Beef Slices'],
        ['Spicy Level x 5','Spicy Level x 3','Spicy Level x 1',]
    ],
    price       : 8,
}

const nasiLemak = {
    itemID      : 'r003',
    foodType    : 'Main',
    description : "Nasi Lemak",
    preferences : [
        ['Small','Chicken Cutlet','Beef Slices'],
        ['Extra Sambal','Sambal','No Sambal']
    ],
    price       : 5,
}

const iceMilo = {
    itemID      : 'd001',
    foodType    : 'Drink',
    description : "Ice Milo",
    preferences : [
        ['Normal Ice','No Ice','Extra Ice'],
        ['Kosong','Add Sugar','Add Milk']
    ],
    price       : 1.20,
}

const sugarCane = {
    itemID      : 'd002',
    foodType    : 'Drink',
    description : "Sugar Cane Drink",
    preferences : [
        ['Normal','No Ice','Extra Ice'],
        ['No Lemon','Add Lemon']
    ],
    price       : 2,
}

const bandung = {
    itemID      : 'd003',
    foodType    : 'Drink',
    description : "Bandung",
    preferences : [
        ['Normal','No Ice','Extra Ice'],
        ['Normal','More Milk','More Rose Syrup']
    ],
    price       : 1.60,
}


/************************************** Item Menu ************************************/
//Note views is an array of objects
const menu =[
    { 
        viewType : "Noodle",
        offerings : [bakChorMee, laksa, charKwayTeow],
    },

    {
        viewType : "Rice",
        offerings : [friedRice, japaneseKatsuCurryRice, nasiLemak],

    },
    {
        viewType : "Drinks",
        offerings : [iceMilo, sugarCane, bandung],
    },
    
]

//Here is where we export out the objects
module.exports.menu = menu;

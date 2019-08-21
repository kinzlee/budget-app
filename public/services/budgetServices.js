import allUIServices from './allUIServices.js'

export const data = {
    allItems: {
        exp:[],
        inc:[]
    },
    totalResults: {
        exp:[],
        inc:[]
    },
    budget: 0,
    percentage: -1
};

export const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach((cur) => {
        sum += cur.value;
    });
    data.totalResults[type] = sum;
}


export const addItem = (type, des, val) => {
    let ID;

    if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    }else {
        ID = 0;
    }

    const newItem = allocateBudget(ID, des, val, type)

     data.allItems[type].push(newItem);
    
    return  newItem;
};


export const deleteItem = (type, id) => {
    let ids = data.allItems[type].map((current) => {
        return current.id;
    });
    
    let index = ids.indexOf(id);
    if(index !== -1) {
        return data.allItems[type].splice(index, 1);
    }
   // return data.allItems[type] = [];
};

const type = () => {
     const obj = {
         id: '',
        description: '',
        value: '',
        type: '',
        percentage:'',
        calcpercentage: (totalIncome) => {
            if(totalIncome > 0) {
                obj.percentage = Math.round((obj.value / totalIncome) * 100);
            } else {
                obj.percentage = -1;
            }
        },
        getPercentage: () => {
            return obj.percentage;
        }
    
     };
    
    return {
        expense: (id, description, value, type, percentage) => {
            obj.id = id;
            obj.description = description;
            obj.value = value;
            obj.type = type;
            obj.percentage = -1;
            return obj;
        },
     
         income: (id, description, value, type) => {
            obj.id = id;
            obj.description = description;
            obj.value = value;
            obj.type = type;
            return obj;
        }
    };
    
 }
 
// create new item based on inc or exp type
export const allocateBudget = (ID, des, val, typ) => {
    let newItem;
    if (typ === `exp`) {
        newItem = type().expense(ID, des, val, typ);
    }else if(typ === `inc`) {
        newItem = type().income(ID, des, val, typ);
    }
    
    // return the new item
    return newItem;
};

const calculateBudget = () => {
    calculateTotal(`exp`);
    calculateTotal(`inc`);

    // calculate the budget: income - expenses
    data.budget = data.totalResults.inc - data.totalResults.exp;

    // calculate the percentage of the income we spent 
    if(data.totalResults.inc > 0) {
        data.percentage = Math.round((data.totalResults.exp / data.totalResults.inc) * 100);
    }else {
        data.percentage = -1;
    }
};

const calculatepercentages = () => {
    data.allItems.exp.forEach((cur) => {
        cur.calcpercentage(data.totalResults.inc);
    });
};

const getPercentages = () => {
    const allPercents = data.allItems.exp.map((cur) => {
        return cur.getPercentage();
    });
    return allPercents;
}


 const getBudget = () => {
    return {
        budget: data.budget,
        totalInc: data.totalResults.inc,
        totalExp: data.totalResults.exp,
        percentage: data.percentage
    };
}




export const updateBudget = () => {
    //calculate the budget
    calculateBudget();
    //return the budget
    const budget = getBudget();
    //display to the UI
    const {displayBudget} = allUIServices();
    return displayBudget(budget);
};

export const updatePercentages = () => {
    //calculate percentage
    calculatepercentages();
    //get percentages from the budget controller
    const percentages = getPercentages();
    //update to the UI
    const {percentageDisplay} = allUIServices();
    return percentageDisplay(percentages);
};


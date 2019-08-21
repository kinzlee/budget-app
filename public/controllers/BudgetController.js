// BUDGET APP CONTROLLER\
import {addItem} from '../services/budgetServices.js';
import {updateBudget} from '../services/budgetServices.js';
import {updatePercentages} from '../services/budgetServices.js';
import {deleteItem} from '../services/budgetServices.js';
import allUIServices from '../services/allUIServices.js';

   const budgetController = () => {
        
        const {getInput} = allUIServices();     

        if (getInput().description !== "" && !isNaN(getInput().value) && getInput().value > 0) {
            const newItem = addItem(getInput().type, getInput().description, getInput().value);
            // call a service called check budget type
            // allocateBudget(type, ID, des, val);
            // const newItem = addItemToUI(allUIServices.getInput())
            // allUIServices.addListItem()
            const {addListItem} = allUIServices();
            const {clearFields} = allUIServices();
            clearFields(); 
            addListItem(newItem, newItem.type);
            updateBudget();
           return updatePercentages();


            };
            
    }   
    export const ctrlDeleteItem = (event) => {
        let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
        if(itemID) {
            let splitID = itemID.split('-');
            let type = splitID[0];
            let ID = parseInt(splitID[1]);
    
            const {deleteListItem} = allUIServices();
            deleteItem(type, ID);
            
            deleteListItem(itemID);
            // update the new budget
            updateBudget();
            //update percentage
            updatePercentages();

    
        }
    };

    
   

export default budgetController;

import budgetController from './controllers/BudgetController.js';
import allUIservices from './services/allUIServices.js';
import {updateBudget} from './services/budgetServices.js';
import {ctrlDeleteItem} from './controllers/BudgetController.js';

 const holdEvventListeners = () => {
    const {getStingsDOM} = allUIservices(); 

    document.querySelector(getStingsDOM().inputBtn).addEventListener(`click`, budgetController);


   document.addEventListener(`keypress`, (event) => {
       if (event.keyCode == 13) {
           budgetController();
      }
    });

document.querySelector(getStingsDOM().container).addEventListener(`click`, ctrlDeleteItem);

const {typeChange} = allUIservices();
document.querySelector(getStingsDOM().inputBtn).addEventListener(`change`, typeChange);

};
const {displayCurrentDate} = allUIservices();
displayCurrentDate();
updateBudget({
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: -1
});
holdEvventListeners();
import UIctrl from './allUIServices.js';



export const holdEvventListeners = () => {
    const DOM = UIctrl.getStingsDOM();

    document.querySelector(DOM.inputBtn).addEventListener(`click`, ctrlAddItem);

    document.addEventListener(`keypress`, (event) => {
        if (event.keyCode == 13) {
            addItemToUI();
        }
    })

};

export const addItemToUI = (input) => {
    let newItem;

   
    // add the item to the budget app controller
   newItem = appCtrl.addItem(input.type, input.description, input.value); 

   // add the item to the UI
   UIctrl.addListItem(newItem, input.type);
};
const allUIServices = () => {

    const stringsDOM = {
        type:`.add__type`,
        description:`.add__description`,
        value:`.add__value`,
        inputBtn:`.add__btn`,
        incomeContainer: `.income__list`,
        expensesContainer: `.expenses__list`,
        budgetLabel: `.budget__value`,
        incomeLabel: `.budget__income--value`,
        expensesLabel: `.budget__expenses--value`,
        percentageLabel: `.budget__expenses--percentage`,
        container: `.container`,
        expensesPercentLabel: `.item__percentage`,
        dateLabel:`.budget__title--month`
    };

    const formatNumber = (num, type) => {
        num = Math.abs(num);
        num = num.toFixed(2);

        let numSplit = num.split('.');
        let int = numSplit[0];
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length -3, 3);

        }

        let dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') +  '' +  int +  '.' +  dec;
    };

    let nodeListForEach  = (list, callback) => {
        for(let i = 0; i < list.length; i++) {
                callback(list[i], i);
            }
        };

    return {

        getInput: () => {
            return {
                type: document.querySelector(stringsDOM.type).value,
                description: document.querySelector(stringsDOM.description).value,
                value: parseFloat(document.querySelector(stringsDOM.value).value)
            };
        },

        addListItem: (objItem, type) => {
            let html, newHtml, element;
            // add html string with placeholder text

            if (type === `inc`) {
                element = stringsDOM.incomeContainer;
                html = `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix">
                <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">
                <i class="ion-ios-close-outline"></i></button></div></div> </div>`;
   
            }else if (type === `exp`) {
                element = stringsDOM.expensesContainer;
                html =  `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix">
            <div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
            }
            
            // replaced the place holder text(the ones wrapped with the percentage symbol) with some actual data
            newHtml = html.replace(`%id%`, objItem.id);
            newHtml = newHtml.replace(`%description%`, objItem.description);
            newHtml = newHtml.replace(`%value%`, formatNumber(objItem.value, type));

            // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
            
        },

        deleteListItem: (selectorID) => {
           let elt = document.getElementById(selectorID);
           elt.parentNode.removeChild(elt);
        },

        clearFields:() => {
            let fields, fieldsArr; 
            
           fields = document.querySelectorAll(`${stringsDOM.description}, ${stringsDOM.value}`);
           fieldsArr =  Array.prototype.slice.call(fields);
            fieldsArr.forEach((current, index, array) => {
                current.value ='';                
            });
            fieldsArr[0].focus();
        },

        displayBudget: (obj) => {
            document.querySelector(stringsDOM.budgetLabel).textContent = obj.budget;
            document.querySelector(stringsDOM.incomeLabel).textContent = obj.totalInc;
            document.querySelector(stringsDOM.expensesLabel).textContent = obj.totalExp;

            if(obj.percentage >  0) {
            document.querySelector(stringsDOM.percentageLabel).textContent = obj.percentage + '%';
            }else {
            document.querySelector(stringsDOM.percentageLabel).textContent = '---';
            }
        },

        percentageDisplay: (percentages) => {
            const fields = document.querySelectorAll(stringsDOM.expensesPercentLabel);
            

            nodeListForEach(fields, (current, index) => {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
      
        },

        displayCurrentDate: () => {
            const now  = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'December'];
            const month = now.getMonth();
            const year = now.getFullYear();
            document.querySelector(stringsDOM.dateLabel).textContent = months[month] + ' ' + year;
        },

        typeChange: () => {
            let fields = document.querySelectorAll(
                stringsDOM.type + ',' + 
                stringsDOM.description + ',' +
                stringsDOM.value);

                nodeListForEach(fields, (cur) => {
                    cur.classList.toggle('red-focus');
                });

                document.querySelector(stringsDOM.inputBtn).classList.toggle('red');
        },
        
        getStingsDOM: () => {
            return stringsDOM;
        }

    };   
};

export default allUIServices;
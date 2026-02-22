const showResult = document.querySelector('.result');
const buttons = document.querySelectorAll('.btn-num');
const clearBtn = document.querySelector('.btn-cls');
const delBtn = document.querySelector('#btn-del');
const operatorsBtns = document.querySelectorAll('.btn-op');
const resultBtn = document.querySelector('#btn-res');


let calc = '';
let num1 = '';
let num2 = '';
let operator = '';

clearBtn.addEventListener('click', () => {
    calc = '';
    num1 = '';
    num2 = '';
    operator = '';
    showResult.textContent = calc;
});

delBtn.addEventListener('click', () => {
    if(calc.length > 0) {
        calc = calc.slice(0, -1);
        showResult.textContent = calc;
        if(num2) {
            num2 = num2.slice(0, -1);
        }
        else if(operator) {
            operator = '';
        }
        else if(num1) {
            num1 = num1.slice(0, -1);
        }
    }
});

buttons.forEach(button => { 
    button.addEventListener('click', () => {
        calc += button.textContent;
        if(button.textContent.match(/[0-9]/) && !operator) {
            num1 += button.textContent;
        }
        else if(button.textContent.match(/[0-9]/) && operator) {
            num2 += button.textContent;
        }
        showResult.textContent = calc;
    });
});

operatorsBtns.forEach(button => {
    button.addEventListener('click', () => {
        if(num1 && num2) {
            return;
        }
        else if(num1 && !operator)
            {
            operator = button.textContent;
            calc += operator;
            showResult.textContent = calc;
            num2 = '';
        }
    });
});


resultBtn.addEventListener('click', () => {
    if(num1 && operator && num2) {
        let result;
        switch(operator) {
            case '+':
                showResult.textContent = Number(num1) + Number(num2);
                console.log(showResult.textContent);
                break;
            case '-':
                showResult.textContent = Number(num1) - Number(num2);
                break;
            case '*':
                showResult.textContent = Number(num1) * Number(num2);
                break;
            case '/':
                if(num2 === '0') {
                    
                        showResult.textContent = 'Error: Division by zero';
                        showResult.style.color = "#e0534e";
                        showResult.style.fontSize = '1.2rem';
                    setTimeout(() => {
                        calc = '';
                        num1 = '';
                        num2 = '';
                        operator = '';
                        
                        showResult.style.color = '#5F85DB';
                        showResult.style.fontSize = '3em';
                        showResult.textContent = '';
                    }, 2000);
                }
                else{
                    showResult.textContent = Number(num1) / Number(num2);
                    break;
                }
        }
        calc = showResult.textContent; // atualiza o valor de calc para o resultado, permitindo operações consecutivas
        num1 = showResult.textContent; 
        num2 = '';
        operator = '';
    }
});

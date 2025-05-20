import React, {use, useEffect, useRef, useState} from 'react';
enum Operator {
  add = '+',
  substract = '-',
  multiply = '*',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const lastOperation = useRef<Operator | null>(null);

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPreviousNumber(`${subResult}`);
  }, [formula]);

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }
    setNumber(number + numberString);
  };

  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
    lastOperation.current = null;
    setFormula('0');
  };

  const deleteOperation = () => {
    let currentSing = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSing = '-';
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSing + temporalNumber.slice(0, -1));
    }

    setNumber('0');
  };

  const toogleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith('.')) {
      setPreviousNumber(number.slice(0, -1));
    } else {
      setPreviousNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);
    lastOperation.current = null;

    setPreviousNumber('0');
  };

  const calculateSubResult = (): number => {
    const [fistValue, operation, secondValue] = formula.split(' ');
    const num1 = Number(fistValue);
    const num2 = Number(secondValue);
    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;
      case Operator.substract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        if (num1 === 0) {
          setFormula('0');
          return 0;
        }
        return num2 / num1;

      default:
        throw new Error('Invalid operation');
    }
  };
  return {
    formula,
    number,
    previousNumber,
    setNumber,
    buildNumber,
    clean,
    deleteOperation,
    toogleSign,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateResult,
  };
};


import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multuply = 'x',
  divide = '/',
}

export const useCalculator = () => {

  const [formula, setFormula] = useState('');

  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if(lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula( number );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  useEffect(() => {
    const subResult =  calculateSubResult();
    setPrevNumber(`${subResult}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula] );

  // Borar toda la operacion de la pantalla
  const clean = () => {
    setNumber('0');
    setPrevNumber('0');

    lastOperation.current = undefined;
    setFormula('');
  };

  // Borrar el ultimo numero
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

  const toggleSing = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const buildNumber = (numberString: string) => {
    // eslint-disable-next-line curly
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      // Evaluar si hay otro 0 y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      // Evaluar si es diferente de 0 no hay . decimal y es el primer numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      // Evaluar para evitar el 0000... a menos que haya un . decimal
      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {

    calculateResult();

    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }

    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };
  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multuply;
  };
  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };
  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const calculateResult = () => {

    const result = calculateSubResult();
    setFormula(`${result}`);

    lastOperation.current = undefined;


    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {

    const [firstValue, operation, secondValue] = formula.split(' ');

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    // eslint-disable-next-line curly
    if ( isNaN(num2) ) return num1;

    switch ( operation ) {
      case Operator.add:
        return num1 + num2;

      case Operator.subtract:
        return num1 - num2;

      case Operator.multuply:
        return num1 * num2;

      case Operator.divide:
        return num1 / num2;

      default:
        throw new Error('Operation not implemented');
    }
  };

  return {
    // Properties
    number,
    formula,

    // Methods
    buildNumber,
    toggleSing,
    clean,
    prevNumber,
    deleteOperation,
    divideOperation,
    multiplyOperation,
    addOperation,
    subtractOperation,
    calculateResult,
    calculateSubResult,
  };
};

import React, { useReducer } from 'react';
import { MdContentCopy } from "react-icons/md";

import styles from './PasswordGenerator.module.scss';

type State = {
  password: string;
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

type Action =
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_LENGTH'; payload: number }
  | { type: 'TOGGLE_OPTION'; payload: keyof Omit<State, 'password' | 'length'> };

const initialState: State = {
  password: '',
  length: 10,
  includeLowercase: true,
  includeUppercase: false,
  includeNumbers: false,
  includeSymbols: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PASSWORD': {
      return { ...state, password: action.payload };
    }
    case 'SET_LENGTH': {
      return { ...state, length: action.payload };
    }
    case 'TOGGLE_OPTION': {
      const optionsCount = Object.values(state).filter(value => typeof value === 'boolean' && value).length;
      const isAttemptingToUncheckLastOption = optionsCount === 1 && state[action.payload];
      if (isAttemptingToUncheckLastOption) {
        return state;
      }
      return { ...state, [action.payload]: !state[action.payload] };
    }
    default:
      return state;
  }
};

const PasswordGenerator: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let characterPool = '';

    if (state.includeLowercase) characterPool += lowercaseChars;
    if (state.includeUppercase) characterPool += uppercaseChars;
    if (state.includeNumbers) characterPool += numberChars;
    if (state.includeSymbols) characterPool += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < state.length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    dispatch({ type: 'SET_PASSWORD', payload: generatedPassword });
  };

  return (
    <div className={styles['password-generator']}>
        <div className={styles['input-container']}>
            <input
                type="text"
                className={styles.passwordInput} 
                value={state.password}
                readOnly
                aria-label="Generated password"
            />
            {state.password && (
                <MdContentCopy 
                    className={styles['copy-button']}
                    onClick={() => navigator.clipboard.writeText(state.password)}
                />
            )}
        </div>
        <div className={styles['range-container']}>
            <label>
                Password Length: {state.length}
                <input
                    type="range"
                    className={styles.lengthInput}
                    min="4"
                    max="20"
                    value={state.length}
                    onChange={(e) => dispatch({ type: 'SET_LENGTH', payload: parseInt(e.target.value, 10) })}
                    aria-label="Select password length"
                />
            </label>
        </div>
        <div className={styles['checkbox-container']}>
            <label>
                <input
                    type="checkbox"
                    checked={state.includeLowercase}
                    onChange={() => dispatch({ type: 'TOGGLE_OPTION', payload: 'includeLowercase' })}
                /> Include Lowercase
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={state.includeUppercase}
                    onChange={() => dispatch({ type: 'TOGGLE_OPTION', payload: 'includeUppercase' })}
                /> Include Uppercase
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={state.includeNumbers}
                    onChange={() => dispatch({ type: 'TOGGLE_OPTION', payload: 'includeNumbers' })}
                /> Include Numbers
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={state.includeSymbols}
                    onChange={() => dispatch({ type: 'TOGGLE_OPTION', payload: 'includeSymbols' })}
                /> Include Symbols
            </label>
        </div>
        <button className={styles.generateButton} onClick={generatePassword}>
            Generate
        </button>
    </div>
);
};

export default PasswordGenerator;

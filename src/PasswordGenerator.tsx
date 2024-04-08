import React, { useState } from 'react';
import { MdContentCopy } from "react-icons/md";


import styles from './PasswordGenerator.module.scss';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [length, setLength] = useState<number>(10);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
    const checkboxesEmpty = !includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols;

    const handleCheckboxChange = (stateUpdater: React.Dispatch<React.SetStateAction<boolean>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            if (checkboxesEmpty && !e.target.checked) {
                return;
            }
            stateUpdater(e.target.checked);
        };
    };
    
    const generatePassword = () => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        let characterPool = '';
    
        if (includeLowercase) characterPool += lowercaseChars;
        if (includeUppercase) characterPool += uppercaseChars;
        if (includeNumbers) characterPool += numberChars;
        if (includeSymbols) characterPool += symbolChars;
    
        if (checkboxesEmpty) {
            alert('Please select at least one character type.');
            return;
        }
    
        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characterPool.length);
            generatedPassword += characterPool[randomIndex];
        }
    
        setPassword(generatedPassword);
    };

    return (
        <div className={styles['password-generator']}>
            <div className={styles['input-container']}>
                <input type="text" value={password} readOnly aria-label="Generated password" />
                {password && (
                    <MdContentCopy 
                        className={styles['copy-button']} 
                        onClick={() => navigator.clipboard.writeText(password)}
                        aria-label="Copy to clipboard"
                    />
                )}
            </div>
            <div className={styles['range-container']}>
                <label>
                    Character length {length}
                    <input 
                        type="range" 
                        min="4" 
                        max="20" 
                        value={length} 
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        aria-label="Password length"
                    />
                </label>
            </div>
            <div className={styles['checkbox-container']}>
                <label>
                    <input 
                        type="checkbox" 
                        checked={includeLowercase} 
                        onChange={handleCheckboxChange(setIncludeLowercase)}
                        aria-label="Include lowercase characters"
                    />
                    Include Lowercase
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        checked={includeUppercase} 
                        onChange={handleCheckboxChange(setIncludeUppercase)}
                        aria-label="Include uppercase characters"
                    />
                    Include Uppercase
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        checked={includeNumbers} 
                        onChange={handleCheckboxChange(setIncludeNumbers)}
                        aria-label="Include numbers"
                    />
                    Include Numbers
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        checked={includeSymbols} 
                        onChange={handleCheckboxChange(setIncludeSymbols)}
                        aria-label="Include symbols"
                    />
                    Include Symbols
                </label>
            </div>
            <button 
                onClick={generatePassword} 
                aria-label="Generate password"
            >
                Generate
            </button>
        </div>
    );
};

export default PasswordGenerator;

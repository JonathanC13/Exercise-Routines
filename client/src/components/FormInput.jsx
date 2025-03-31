import React from 'react'
import { FaCircleInfo } from 'react-icons/fa6'

const FormInput = ({
    required = false,
    labelId,
    labelText,
    inputType,
    inputId,
    onFocusCB,
    onBlurCB,
    inputRef = null,
    inputValueState,
    inputOnChangeCB,
    aria = false,
    ariaInvalidState = true,
    ariaDescribedby,
    ariaInfoCond = false,
    ariaInfoText = ''
}) => {
    const ariaAttr = aria ? { 'aria-invalid': ariaInvalidState ? "false" : "true", 'aria-describedby': ariaDescribedby } : {}
    const ariaInfo = aria && ariaDescribedby ? 
        <p id={ariaDescribedby} className={ariaInfoCond ? "instructions" : "offscreen"}>
            <FaCircleInfo /><br/>
            {ariaInfoText}
        </p> 
        :
        <></>

    const inputOnFocusHandler = (e) => {
        const label = document.getElementById(labelId)
                
        if (label) {
            label.classList.add('form-input__focus')
        }
    }

    const inputOnBlurHandler = (e) => {
        const inputElem = e.currentTarget
        const label = document.getElementById(labelId)
        
        if (label && inputElem.value === '') {
            label.classList.remove('form-input__focus')
        }
    }

  return (
    <div className="form-input_outer__div">
        <div className="form-input_inner__div">
            <label id={labelId} htmlFor={inputId} className="form__label">{labelText}</label>
            <input 
                {...(required ? {required} : {}) }
                id={inputId}
                className="form-input__input" 
                type={inputType} 
                onFocus={(e) => {
                    inputOnFocusHandler(e)
                    onFocusCB(e)
                }}
                onBlur={(e) => {
                    inputOnBlurHandler(e)    
                    onBlurCB(e)
                }}
                {...(inputRef ? {ref: inputRef} : {})}
                value={inputValueState}
                onChange={(e) => {inputOnChangeCB(e.target.value)}}
                {...ariaAttr}
            />
            {ariaInfo}
        </div>
    </div>
    
  )
}

export default FormInput
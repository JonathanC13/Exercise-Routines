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
    inputOptionComp = <></>,
    aria = false,
    ariaValidState = true,
    ariaDescribedby = '',
    ariaInfoCond = false,
    ariaInfoText = '',
}) => {
    const outerDivId = `form-input_outer__div_${labelId}`
    
    const ariaAttr = aria ? { 'aria-invalid': ariaValidState ? "false" : "true", 'aria-describedby': ariaDescribedby } : {}
    const ariaInfo = aria && ariaDescribedby ? 
        <p id={ariaDescribedby} className={ariaInfoCond ? "instructions" : "offscreen"}>
            <FaCircleInfo /><br/>
            {ariaInfoText}
        </p> 
        :
        <></>

    const label = document.getElementById(labelId)
    if (label ) {
        if (!ariaValidState && inputValueState.length > 0) {
            label.classList.add('form-input-incorrect-color')
        } else {
            label.classList.remove('form-input-incorrect-color')
        }
    }

    const outerDiv = document.getElementById(outerDivId)
    if (outerDiv) {
        if (!ariaValidState && inputValueState.length > 0) {
            outerDiv.classList.add('form-outer-div-incorrect-color')
        } else {
            outerDiv.classList.remove('form-outer-div-incorrect-color')
        }
    } 

    const inputOnFocusHandler = (e) => {
        const label = document.getElementById(labelId)
        const outerDiv = document.getElementById(outerDivId)
                
        if (label) {
            label.classList.add('form-input__focus-color')
            label.classList.add('form-input__focus')

            if (!ariaValidState) {
                label.classList.add('form-input-incorrect-color')
            }
        }

        if (outerDiv) {
            outerDiv.classList.add('form-outer-div__focus')

            if (!ariaValidState) {
                outerDiv.classList.add('form-outer-div-incorrect-color')
            }
        }

        
    }

    const inputOnBlurHandler = (e) => {
        const inputElem = e.currentTarget
        const label = document.getElementById(labelId)
        const outerDiv = document.getElementById(outerDivId)
        
        if (label) {
            label.classList.remove('form-input__focus-color')
            
            if (inputElem.value === '') {
                label.classList.remove('form-input__focus')
            }

            if (ariaValidState) {
                label.classList.remove('form-input-incorrect-color')
            }
        }

        if (outerDiv) {
            outerDiv.classList.remove('form-outer-div__focus')

            if (ariaValidState) {
                outerDiv.classList.remove('form-outer-div-incorrect-color')
            }
        }
    }

  return (
    <div id={outerDivId} className="form-input_outer__div">
        <div className="form-input_inner__div">
            <label id={labelId} htmlFor={inputId} className="form__label">{labelText}</label>
            <div className='form-input_input__div'>
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
                {inputOptionComp}
            </div>
            {ariaInfo}

        </div>
    </div>
    
  )
}

export default FormInput
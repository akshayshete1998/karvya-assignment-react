import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import './style.css'
export const valueRequired = (
    value,
    error = "Value is required",
) => {
    let result
    if (value) result = { success: true }
    else result = { success: false, error }
    return result
}

export const lengthMoreThanThree = (
    value,
    error = "Length More Than Three",
) => {
    let result
    // @ts-ignore
    if (value?.length > 3) result = { success: true }
    else result = { success: false, error }
    return result
}
export const maxLengthtwentyCharacter = (
    value,
    error = "max lenth 20 character",
) => {
    let result
    // @ts-ignore
    if (value?.length < 20) result = { success: true }
    else result = { success: false, error }
    return result
}
export const TextInput = forwardRef((props, ref) => {
    const {
        initialValue,
        isRequired,
        validationRules,
        errorStrings,
        inputType
    } = props
    const [value, setValue] = useState(initialValue)
    const inputRef = useRef(null)
    const [error, setError] = useState('')
    const getValue = () => {
        // @ts-ignore
        return inputRef?.current?.value || ''
    }
    const checkValue = (text) => {
        const errorString = []
        let checkResult
        const result = []
        if (validationRules) {
            for (let i = 0; i < validationRules.length; i += 1) {
                if (errorStrings) {
                    checkResult = validationRules[i](text, errorStrings[i])
                } else {
                    checkResult = validationRules[i](text, undefined)
                }
                if (!checkResult?.success) {
                    result.push(checkResult)
                    if (checkResult?.error) {
                        errorString.push([checkResult.error])
                    } else {
                        errorString.push(checkResult?.error || '')
                    }
                }
            }
        } else {
            checkResult = {
                success: true,
            }
            result.push(checkResult)
        }
        setError(errorString.toString())
        return { value: text, result, isValid: result.length === 0 }
    }
    const runValidations = () => {
        return checkValue(value)
    }

    useImperativeHandle(ref, () => ({ runValidations, getValue }))
    return (
        <div className="textInputWrapper">
            <div>
                {isRequired && <span className="manadatorySign">*</span>}
                </div>
            <span className="textWidth">{props.name}</span>
            <div className="inputAndError">
                <div>
                    <input type= {inputType ? inputType : "text"} ref={inputRef}
                        onChange={event => {
                            setValue(event.target.value)
                            checkValue(event.target.value)
                        }} />
                </div>
                <div className="errorStrings">
                    <span className="error-text">{error}</span>
                </div>
            </div>
        </div>
    )
})
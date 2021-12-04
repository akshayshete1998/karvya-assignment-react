import React, { useEffect, useRef, useState } from "react"
import { Dropdown } from "../../component/dropdown"
import { countries } from '../../data/data'
import { TextInput } from '../../component/text-input/index'
import './style.css'
import { UploadFile } from '../../component/upload-file/index'
import {valueRequired, lengthMoreThanThree, maxLengthtwentyCharacter} from '../../component/text-input/index'
export const ListOfCountry = () => {
    const [data, setData] = useState([])
    const [uploadImg, setUploadImg] = useState()
    const [selectedDropDownValue, setSelectedDropDownValue] = useState("")
    const countryRef = useRef(null)
    const rankRef = useRef(null)
    const continentRef = useRef(null)
    const selectedDropdownValue = (value) => {
        setSelectedDropDownValue(value.target.value)
    }
    const getData = () => {
        const sampleData = countries
        setData(sampleData)
    }
    const uploadFuntion = (uploadImgUrl) => {
        if(uploadImgUrl){
            setUploadImg(uploadImgUrl)
        }
    }
    useEffect(() => {
        getData()
    }, [data])
    const handleSubmit = (value) => {
        const name = countryRef?.current?.runValidations()
        const rank = rankRef?.current?.runValidations()
        const continent = continentRef?.current?.runValidations()
        if(name.isValid && rank.isValid && continent.isValid){

            const countryFormObj = {
                name: countryRef?.current?.getValue(),
                rank: rankRef?.current?.getValue(),
                continent: continentRef?.current?.getValue(),
                flag: uploadImg
            }
            if(uploadImg){
                countries.push(countryFormObj)
                setUploadImg(countries)
                alert('Form has been submited')
            }
        }
        value.preventDefault()
    }
    return (
        <div className="sectionWrapper">
            <div className="countryDropdown">
                <Dropdown data={countries} selectedValue={selectedDropdownValue} />
            </div>
            <div className="formDetailsWrapper">
                <div className="countryDetailsWrapper">
                    {data.map((value) => (
                        selectedDropDownValue === value.name ?
                            (
                                <div className="detailsWrapper" key={value.name}>
                                    <span className="countryName">Name:{value.name}</span>
                                    <img src={value.flag} alt=""/>
                                    <span className="countryName">Rank:{value.rank}</span>
                                </div>
                            ) : ""
                    ))
                    }
                </div>
                <div className="fromWrapper">
                    <form onSubmit={value => {
                        handleSubmit(value)
                    }}>
                        <span className="textCountries">Add Countries</span>
                        <TextInput 
                        ref={countryRef} 
                        name="Country Name"
                        isRequired={true}
                        validationRules={[valueRequired,lengthMoreThanThree,maxLengthtwentyCharacter]}
                         />
                        <TextInput ref={rankRef}
                         name="Rank"
                          isRequired={true}
                          inputType = "number"
                          validationRules={[valueRequired]}
                         />
                        <TextInput ref={continentRef} 
                        name="Continent"
                        isRequired={true}
                        validationRules={[valueRequired, lengthMoreThanThree]}
                         />
                        <UploadFile callBackFun={(uploadImgUrl) => uploadFuntion(uploadImgUrl)} />
                        <div className="buttonWrapper">
                        <button className="submitBtn" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
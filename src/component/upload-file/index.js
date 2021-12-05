import React, { useState, useRef, useEffect } from 'react'
import './style.css'

export const UploadFile = (props) => {
    const fileInputRef = useRef(null)
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
                props.callBackFun(preview)
            }
            reader.readAsDataURL(image)

        } else {
            setPreview(null)
        }
    }, [image, preview])
    const fileHandler = (event) => {
        let file = event.target.files[0]
        if (file && (file.type === "image/png" || file.type === "image/jpg")) {
            const fileSize = file.size / 1024 / 1024
            if (fileSize <= 4) {
                setImage(file)
            } else {
                alert(
                    "File too Big, please select a file less than 4mb")
            }

        } else {
            alert('Please select png or jpg img type')
            file = null
            // fileInputRef. = ''
            setImage(null)
        }
    }


    return (
        <div>
            <span>Upload Image</span>
            {/* <img src={preview}/> */}
            <button type="button" onClick={() => {
                fileInputRef.current.click()
            }}>Upload Img</button>
            <input type="file" name="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={(event) => fileHandler(event)} />

        </div>
    )
}
import { React, useEffect, useRef, useState } from 'react'
import Tesseract from 'tesseract.js'

const Home = () => {
    const [imagePath, setImagePath] = useState("")
    const [text, setText] = useState("")

    const handleChange = (event) => {
        setImagePath(URL.createObjectURL(event.target.files[0]))
    }

    const handleClick = () => {
        Tesseract.recognize(
            imagePath, 'eng',
            {
                logger: m => console.log(m)
            }
        )
        .catch (err => {
            console.log(err)
        })
        .then(result => {
            console.log(result.data)
            let confidence = result.data.confidence

            let text = result.data.text
            setText(text)
        })
    }
    return (
        <div>
            <h1>Actual Image uploaded</h1>
            <img src={imagePath} className='uploaded-image' alt="logo" />
            <h1>Extracted Text</h1>
            <div className="text-box">
                <p>{text}</p>
            </div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleClick}> convert to text</button>
        </div>
    )
}

export default Home
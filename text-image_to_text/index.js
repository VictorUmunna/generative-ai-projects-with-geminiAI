const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config()
const fs = require('fs')

const genAI = new GoogleGenerativeAI(process.env.API_KEY)


function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    }
}


async function run() {
    const model = genAI.getGenerativeModel({model: "gemini-pro-vision"})
    const prompt = "What is the difference between these pictures?"
    const imageParts = [
        fileToGenerativePart("cat.jpeg", "image/jpeg"),
        fileToGenerativePart("dog.jpeg", "image/jpeg")
    ]
    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    const text = response.text()
    console.log(text)
}

run()
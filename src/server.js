const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()

const passengers = [
    {
        name: 'Alana',
        flightNumber: 7859,
        time: "18h00"
    },
    {
        name: 'Alice',
        flightNumber: 7859,
        time: "18h00"
    },
    {
        name: 'Mhayk',
        flightNumber: 7859,
        time: "18h00"
    }
]

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'print.ejs')
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        if (err) {
            return res.send('Error')
        }
        const pdfOption = {
            format: 'A4',
        }
        pdf.create(html, pdfOption).toStream((err, stream) => {
            if (err) {
                return res.send('Error')
            }
            return stream.pipe(res)
        })
    })
})

app.listen(3000, () => { })
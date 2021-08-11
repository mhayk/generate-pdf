const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const moment = require('moment');

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

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
    const data = {
        invoice: {
            number: '104871',
            status: 1
        },
        passengers,
        moment
    }
    ejs.renderFile(filePath, data, (err, html) => {
        if (err) {
            return res.send('Error')
        }
        const pdfOption = {
            format: 'A4',
        }
        pdf.create(html, pdfOption).toFile("report.pdf", (err, data) => {
            if (err) {
                return res.send('Error')
            }
            return res.send(html)
        })
    })
})

app.listen(3000, () => { })
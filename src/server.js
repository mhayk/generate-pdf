const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const moment = require('moment');

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'print.ejs')
    const data = {
        invoice: {
            number: '104871',
            status: 1
        },
        advertiser: {
            advertiser_name: 'LHH',
            address_1: 'Blackbrook House, Dorking Business Park, Station Road',
            phone_1: '0207 460 7007',
            city: 'Maitland, FL',
            email: "shahid.bilal@lhh.com",
            country: 'United States',
            company_website: 'https://www.lhh.com/',
            postal_code: "32751-7020"
        },
        service: {
            service_name: 'PPC',
            setup_fee: 0.00,
            mnmg_fee: 0.00,
            budget: 0.00,
            subtotal: 0.00,
            vat: 0.00,
            total: 0.00
        },
        moment
    }
    ejs.renderFile(filePath, data, (err, html) => {
        if (err) {
            return res.send('Error')
        }
        const pdfOption = {
            format: 'A4',
            height: '11.7in',
            width: '8.27in',
            // header: {
            //     height: '8mm'
            // },
            // footer: {
            //     height: '20mm'
            // }

        }
        // pdf.create(html, pdfOption).toFile("report.pdf", (err, data) => {
        //     if (err) {
        //         return res.send('Error')
        //     }
        //     return res.send(html)
        // })

        pdf.create(html, pdfOption).toStream((err, pdfStream) => {
            if (err) {
                return res.send('Error')
            }
            
            pdfStream.on('end', () => {
                return res.end()
            })

            pdfStream.pipe(res)
        })
    })
})

app.listen(3000, () => { })
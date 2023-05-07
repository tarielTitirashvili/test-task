import fs from'node:fs/promises'
import express from 'express'
import bodyParser from 'body-parser'
async function readFile(path) {
    try{
        const data = await fs.readFile(path, 'utf8')
        return data
    }catch (err) {
        return err
    }
}

async function newUserInfo(path, text) {
    try{
        const data = await fs.writeFile(path, text, {flag: 'a'})
        return data
    }catch (err) {
        return err
    }
}

const app = express()
const port = 6000

app.use(bodyParser.json())

app.get('/userData', async (req, res, next)=>{
    try{
        const result = readFile('./data.json')
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err)
    }
})

app.post('/books', async (req, res, next)=>{
    try{
        const result = newUserInfo('./data.json', req.body)
        res.status(200).send(`used data was added: ${result}`)
    }catch(err){
        res.status(200).send(err)
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
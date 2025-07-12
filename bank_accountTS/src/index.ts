import express from 'express';
import account from './routes/accountRoute';
import bank from './routes/bankRoute';



const PORT:number = 4000
const app = express()

app.use(express.json())


app.use('/account', account)
app.use('/bank', bank)





function start(): void {
    try {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()










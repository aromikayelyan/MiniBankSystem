import express from 'express';
import router from './routes/bankRoute';


const PORT:number = 4000
const app = express()

app.use(express.json())


app.use('/bank', router)




function start(): void {
    try {
        app.listen(PORT, () => {
            console.log(`server runnin on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()










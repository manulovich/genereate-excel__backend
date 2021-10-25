import express from 'express';
import cors from 'cors';
import xlsx from 'node-xlsx';

const app = express();
const PORT = process.env.PORT || 3000;

// обрабатываем тела post и path запросы как json-объекты
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('work');
});

app.post('/excel', (req, res) => {
    try {
        const { excelData } = req.body;
        let buffer: ArrayBuffer = xlsx.build([{name: "mySheetName", data: excelData}]); // Returns a buffer
        
        res.set('Content-Type', 'multipart/form-data');
        return res.send(buffer);
    } catch (err) {
        res.set('Content-Type', 'application/json;charset=utf-8');
        return res.status(500).send(err);
    }
});

const start = () => {
    try {
        app.listen(
            PORT,
            () => console.log(`server started on port ${PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();

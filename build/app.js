"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var node_xlsx_1 = __importDefault(require("node-xlsx"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// обрабатываем тела post и path запросы как json-объекты
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('work');
});
app.post('/excel', function (req, res) {
    try {
        var excelData = req.body.excelData;
        var buffer = node_xlsx_1.default.build([{ name: "mySheetName", data: excelData }]); // Returns a buffer
        res.set('Content-Type', 'multipart/form-data');
        return res.send(buffer);
    }
    catch (err) {
        res.set('Content-Type', 'application/json;charset=utf-8');
        return res.status(500).send(err);
    }
});
var start = function () {
    try {
        app.listen(PORT, function () { return console.log("server started on port " + PORT); });
    }
    catch (err) {
        console.log(err);
    }
};
start();

const express = require('express');
const cors = require('cors');
const BankRoutes = require('../server/src/routes/ApnaBankRoutes');

const app = express();
app.use(cors());
app.use(express.json());
const port = 6969;

app.use('/api/users', BankRoutes);

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
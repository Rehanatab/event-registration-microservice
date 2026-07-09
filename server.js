const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

let registrations = [];
app.post('/register', (req, res) => {

    const { name, email, phone, event } = req.body;

    const newRegistration = {
        name,
        email,
        phone,
        event
    };

    fs.readFile('registrations.json', 'utf8', (err, data) => {

        let registrations = [];

        if (data) {
            registrations = JSON.parse(data);
        }

        registrations.push(newRegistration);

        fs.writeFile(
            'registrations.json',
            JSON.stringify(registrations, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).send('Error saving registration');
                }

                console.log("New Registration Saved:");
                console.log(newRegistration);

                res.send('Registration Successful');
            }
        );
    });
});
app.get('/registrations', (req, res) => {

    fs.readFile('registrations.json', 'utf8', (err, data) => {

        if (err) {
            return res.status(500).send('Error reading file');
        }

        res.json(JSON.parse(data));
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
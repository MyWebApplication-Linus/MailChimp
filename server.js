const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const port = 3000;
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname +"/signUp.html");
});

app.post("/", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailAddress;

    console.log(firstName, lastName, email);

    let data = {
        members : [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName

                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/dd922f597c";


    const options = {
        method: "POST",
        auth: "linus:3e2e3db3d20d406ba6df7677865cd714-us17"
    }

    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", (data) => {
                console.log(JSON.parse(data));

        });
    })
    request.write(jsonData);
    request.end();

});

app.post("/failure", (req, res) => {
    res.redirect("/")
});

app.listen(process.env.PORT || port, function (){
    //console.log(`listening at http://localhost:${port}`);
});

//api key
//3e2e3db3d20d406ba6df7677865cd714-us17

//LIST ID
//dd922f597c
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.use(express.static("public")); // use to collect all file of css and images
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
   });
app.post("/", function(req, res) {
    var FirstName = req.body.fname;
    var LastName = req.body.lname;
    var Email = req.body.email;
    // mailchimp work connection video 249
    var data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                }

            }
        ]
    };
const jsonData = JSON.stringify(data);
const url = "https://us12.api.mailchimp.com/3.0/lists/0fca1b9b70"
const options = {
    method: "POST",
    auth: "rider1: 7ebf3920e2180b567740b37faf0448ab-us12"
}
const request = https.request(url,options,function(response){
   if (response.statusCode === 200) {
    res.sendFile(__dirname + '/success.html');
   } else {
    res.sendFile(__dirname + '/failure.html');
   } 
response.on("data",function(data){
    console.log(JSON.parse(data));})
})
request.write(jsonData);
request.end();
});

app.post("/failure.html",function(req, res){
    res.redirect("/")});

    app.listen(5000, function (){
    console.log('listening on port 5000');
})

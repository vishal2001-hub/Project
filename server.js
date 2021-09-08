const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req , res){
   res.sendFile(__dirname + "/signup.html") 
})



app.post('/', (req, res) => {
    var fName = req.body.fname
    var lName = req.body.lname
    var email = req.body.email
    var userData = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }
    }],};
   mailchimp.setConfig({
     apiKey: "d3198a28a219430eb7ba658bcb12c4d3-us5",
     server: "us5",
   });

   const run = async () => {
     
    
    try {
      
      const response = await mailchimp.lists.batchListMembers("5f74b39c2f" , userData );
      console.log(response);

        res.sendFile(__dirname + "/success.html")
      } 
      catch (error) {
        console.log(error);
        res.sendFile(__dirname + "/fail.html")
      }


    };
    run();
  })


app.post("/fail" , function(req , res){
  res.redirect("/");
})

app.listen(process.env.POST || 5000, function(){
    console.log("YUP IT IS WORKING ON PORT : 5000");
})
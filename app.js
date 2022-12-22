const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const fd = mysql.createConnection({
    user: "fd50",
    host: "127.0.0.1",
    password: "Fd50@$$123",
    database: "fd50"
});
fd.connect((err) => {
   if(err) {
       console.log(err);
   } else {
       console.log("Connected");
   }
});


app.get("/install", function(req, res){

    const  proTable = "CREATE TABLE if not exists Customers (id int auto_increment, first_name varchar(255) not null, last_name varchar(255) not null, email varchar(255) not null, password varchar(255), PRIMARY KEY (id))";

    // const descTable = "CREATE TABLE if not exists Descriptions (description_id int auto_increment, product_id int(11) not null, brief_description TEXT not null, full_description TEXT not null, product_img varchar(255) not null, product_link varchar(255) not null, PRIMARY KEY (description_id), FOREIGN KEY (product_id) REFERENCES Products (product_id))";
    
    // const priTable = "CREATE TABLE if not exists Prices (price_id int auto_increment, product_id int(11) not null, starting_price varchar(255) not null, price_range varchar(255) not null, PRIMARY KEY (price_id), FOREIGN KEY (product_id) REFERENCES Products (product_id))";

    res.sendFile(__dirname + "/index.html");
    fd.query(proTable, (err, result) => {
        if(err) {
            console.log(err);
        }
    })
    // fd.query(descTable, (err, result) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // })
    // fd.query(priTable, (err, result) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // })
});


app.post("/sign", function(req, res){
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const Email = req.body.email;
   const Password = req.body.password;

  const proInsert = "INSERT INTO Customers (first_name, last_name, email, password) VALUES ('" + firstName + "', '" + lastName + "', '" + Email + "', '" + Password + "')";
  fd.query(proInsert, (err, result) => {
   if(err) {
       console.log(err);
   }
  });

//  let addedProductId = 0;

//   const dataSelect = "SELECT * FROM Products WHERE product_url = '" + Id + "' ";

//   fd.query(dataSelect, (err, rows, fields) => {
      
//     addedProductId = rows[0].product_id;
      
//     if(err) console.log(err);

//     if(addedProductId != 0) {

//         const descriptionData = "INSERT INTO Descriptions (product_id, brief_description, full_description, product_img, product_link) VALUES ('" + addedProductId + "', '" + Brief + "', '" + full + "', '" + imgUrl + "', '" + Ulr + "')";
       
//         const priceData = "INSERT INTO Prices (product_id, starting_price, price_range) VALUES ('" + addedProductId + "', '" + startPr + "', '" + Range + "')";
       
       
       
//         fd.query(descriptionData, (err, result) => {
//             if(err) {
//                 console.log(err)
//             } else {
//                 console.log("Description Inserted");
//             };
//         });
       
//         fd.query(priceData, (err, result) => {
//             if(err) {
//                 console.log(err)
//             } else {
//                 console.log("Price Inserted");
//             };
//         });
        
//     };

//   });

   
    res.sendFile(__dirname + "/success.html");
});

app.post("/failure", function(req, res) {
    res.redirect("/install");
});
app.post("/success", function(req, res) {
    res.redirect("/install");
});
app.listen(process.env.POST || 4000, function(){
    console.log("Server is on port 4000.");
});
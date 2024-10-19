const mysql = require("mysql2")
const express = require("express") // Correctly import express
const app = express() // Create an instance of express
const cors = require("cors")
const bodyparser = require("body-parser")

app.use(cors());


require("dotenv").config();
// Use  body parser as middle ware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"apple-clone",
    password:"apple-clone",
    database:"apple-clone"
})



//Incase Error happens

mysqlConnection.on("error", function (err) {
	console.log("caught this error: " + err.toString());
});

//Install: Create the tables necessary
app.get("/install", (req, res) => {
	let message = "Tables Created";
	let createProducts = `CREATE TABLE if not exists Products(
      product_id int auto_increment,
      product_url varchar(255) not null,
      product_name varchar(255) not null,
      PRIMARY KEY (product_id)
  )`;
	let createProductDescription = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
	let createProductPrice = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,    
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
	mysqlConnection.query(createProducts, (err, results, fields) => {
		if (err) console.log(err);
	});
	mysqlConnection.query(createProductDescription, (err, results, fields) => {
		if (err) console.log(err);
	});
	mysqlConnection.query(createProductPrice, (err, results, fields) => {
		if (err) console.log(err);
	});

	res.end(message);
});

// Insert a new iPhone
app.post("/addiphones", (req, res) => {
	// console.log(bodyparser.json);
	console.log(req.body.iphoneId);
	let Id = req.body.iphoneId;
	let img = req.body.imgPath;
	let Url = req.body.iphoneLink;
	let Title = req.body.iphoneTitle;
	let Brief = req.body.briefDescription;
	let StartPrice = req.body.StartPrice;
	let PriceRange = req.body.priceRange;
	let Description = req.body.fullDescription;

	// To use it as a foreign key
	let addedProductId = 0;

	let sqlAddToProducts = "INSERT INTO Products (product_url, product_name) VALUES (?, ?)";
	mysqlConnection.query(sqlAddToProducts, [Id, Title], function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	mysqlConnection.query(
		"SELECT * FROM Products WHERE product_url = ?",
		[Id],
		(err, rows, fields) => {
			if (err) console.log(err);
			addedProductId = rows[0].product_id;
			console.log(addedProductId);

			if (addedProductId != 0) {
				let sqlAddToProductDescription = 
					"INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)";
				
				mysqlConnection.query(
					sqlAddToProductDescription,
					[addedProductId, Brief, Description, img, Url],
					function (err, result) {
						if (err) throw err;
						console.log("Product description inserted");
					}
				);

				let sqlAddToProductPrice =
					"INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?,?,?)";

				mysqlConnection.query(sqlAddToProductPrice,[addedProductId,StartPrice,PriceRange] ,function (err, result) {
					if (err) throw err;
					console.log("Product price inserted");
				});
			}
		}
	);
	res.end("Product added");
});

app.get("/iphones",(req,res)=>{
	mysqlConnection.query(
		"SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
		(err,rows,fields)=>{
			let iphones = {products: []}
			iphones.products = rows
			var stringIphones = JSON.stringify(iphones)
			if(!err) res.end(stringIphones)
				else console.log(err)
		}
	)
})

// connection.connect((err)=>{
//     if(err) console.log(err)
//         else console.log("the database is working")
// })

app.get("/man",(req,res)=>{
	res.end("It's Working")
})



const port = 3000
app.listen(port,()=>{
    console.log(`server is running on this ${port} number`)
})

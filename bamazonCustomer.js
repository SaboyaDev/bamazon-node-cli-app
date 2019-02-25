var inquirer = require("inquirer");
var Table = require("cli-table");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Muzika300$",
  database: "bamazon_db"
});

function buyOrNOt() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["BUY", "EXIT"],
      name: "choice"
    }
  ])
  .then(function(answers) {
    switch(answers.choice) {
      case "BUY":
        buy();
        break;
      default:
        console.log("\n\n")
        connection.end();
        break;
    }
  });
}

function showProducts() {
  console.log("                     ----- Bamazon.com -----");
  connection.query("SELECT * FROM products", function(err, result) {
    if(err) throw err;
    var products = result;
    // Generates a table to display all of the products in the database
    var table = new Table({
      head: ["SKU", "Procuct Name", "Category", "$ US", "QTY"]
    , colWidths: [6, 40, 15, 9, 9]
    });
    
    for (var i = 0; i < products.length; i++) {
      table.push(
        [products[i].id, products[i].product_name, products[i].department_name, products[i].price, products[i].stock_quantity]
      );
    }
    console.log(table.toString()+"\n\n");
    buyOrNOt();
  });
}

function buy() {
  // Prompts user to choose a product to buy...
  inquirer.prompt([
    {
      type: "input",
      message: "\nWhich Item Would You Like to Buy?\nEnter the SKU Number: ",
      name: "item"
    },
    {
      type: "input",
      message: "How Many Units Would You Like To Purchase: ",
      name: "amount" 
    }
  ])
  .then(function(answers) {
    connection.query("SELECT * FROM products", function(err, result) {
      var products = result;
      if (err) throw err;
      // console.log(products[answers.item - 1].stock_quantity);
      if(answers.amount <= products[answers.item - 1].stock_quantity) {
        updateProduct(answers.item, products[answers.item - 1].stock_quantity, answers.amount);
        console.log("\n\nProcessing Your Order...");
      } 
      else if(products[answers.item - 1].stock_quantity === 0) {
        console.log("\n\nProduct Out Of Stock, More Coming Soon...\n\n");
        buyOrNOt();
      }
      else {
        console.log("\n\nNot Enough Units, Try Again...\n\n");
        buyOrNOt();
      }
    })
  });
}

function updateProduct(selection, quantity, amount) {
  connection.query("UPDATE products SET ? WHERE ?",
    [
      { stock_quantity: (quantity - amount) },
      { id: selection }
    ],
    function(err, result) {
      if(err) throw err;
      console.log("\nUpdating Our Database...\n\n");
      showProducts();
    }
  );
}

connection.connect(function(err) {
  if(err) throw err;
  console.log("Connected as id: " + connection.threadId);
  console.log("\n\n******************  Welcome To The Best eCommerce Store ******************\n\n");
  showProducts();
});
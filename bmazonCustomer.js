var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "bmazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayProducts();
});

function displayProducts() {
    console.log("Welcome to Bmazon\n Below are the items in stock");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // for (var i = 0; i < res.length; i++) {
        //     if (res[i].stock_quantity > 0) {
        //         //show the product name for customer to choose 
        //         console.log("item #: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nPrice: $" + res[i].price + " from " + res[i].department_name + " department");

        //     }
        // }
        inquirer
            .prompt([{
                name: "itemChoice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    //var options = {};
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].stock_quantity > 0) {
                            choiceArray.push(res[i].product_name);
                            // options.push(res[i].product_name);
                            // options.push(res[i].item_id);
                        }
                    }
                    //return options;
                    return choiceArray;
                },
                message: "Which item would you like to buy?"
            },
            {
                name: "quantChoice",
                type: "number",
                message: "Please enter Quanity"
            }

            ])
            .then(function (answer) {
                var chosenItem;

                //looping throught the option to see if the chose item is in the DB 
                for (var i = 0; i < res.length; i++) {
                    //  console.log(res.length);
                    if (res[i].product_name === answer.itemChoice) {
                        //chosenItemQuant = res[i].stock_quantity;
                        InvCheck(answer.quantChoice, res[i].stock_quantity, res[i].item_id, res[i].price);
                        //  console.log(res[i]);
                    }

                    //  console.log("============");
                }

                //   console.log(res[i].stock_quantity);

                //check for invetory 
                //if invetory is avilable deplete and update invetory 
                //if invetory is not available insuffience and restart 

            });
        //console.table(res);


    });
}

function InvCheck(custQuant, stockQuant, prod_id, price) {
    //if quantChoice is more than res[i].stock_quanity show Insufficient quantity! message 
    console.log("Inventory function called");
    if (custQuant > stockQuant) {
        console.log("Insuffienct Quantity.");
        // displayProducts();

    }
    else {
        var newstockQuant = stockQuant - custQuant;
        //update stock Quantity to newStockQuant = custQuant where id = id 
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: newstockQuant
                },
                {
                    item_id: prod_id
                }
            ],
            function (error) {
                if (error) throw err;
                console.log("Order placed successfully");
                var totalCost = custQuant * price;
                console.log("Total Cost: " + totalCost);

            }
        );


    }

    //   console.log(custQuant);
    //  console.log(stockQuant);
    connection.end();
}

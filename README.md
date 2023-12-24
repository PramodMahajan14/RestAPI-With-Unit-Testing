# Restapi - Unit test
This is simple Product CRUD operation backend and applied Unit test 
 Download and install Node.js

# Run Locally
 ```
    git clone https://github.com/PramodMahajan14/RestAPI-With-Unit-Testing
```
Go to directory where cloned code and run following command 
```
   npm install
```

# Start the server
```
   node index.js or nodemon
```
Go to http://localhost:8080/api/ in any browser to see the application running.

# EndPoints
Insert New Product : /products
```
 POST:http://localhost:8080/api/products
```
Getting All product Data : /products
```
GET:http://localhost:8080/api/products
```
Get Specific product: /product/:id
```
GET:http://localhost:8080/api/product/6
```
Update the products Data : /product/:id
```
  POST:http://localhost:8080/api/products/4
```
Remove the product Data : /product/:id
```
DELETE:http://localhost:8080/api/product/8

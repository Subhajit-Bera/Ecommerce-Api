# Ecommerce-Api
This is a Ecommerce-Api developed using Node.js,express and mongoDB. Testing is done using Jest.
## Features:
* Create Product
* Retrieve All Products
* Retrieve Single Products
* Update Product
* Delete Product

## Prerequisites 
* Node.js installed on your system
## Getting Started
Clone or download this repository</br>
Navigate to the root folder of the project</br>
Open a terminal and run npm i to install the dependencies</br>
Run node app.js to start the server</br>
For testing run npx jest </br>
## How to Setup
Create .env file inside root folder</br>
Inside define MONGO_URL= : can use MongodbAtlas or MongodbCompass in loacal host</br>
And also mention the PORT=  (in which port the server will run)</br>
I used: http://localhost:8000/api/v1 </br>
After that go to postman and create endpoint and test</br>
Refer this postman documentaion : [link](https://documenter.getpostman.com/view/20449455/2s9YsNdq3K)



## Folder Structure:
project-root/</br>
|-- controllers/</br>
| |-- brandCtrl.js</br>
| |-- categoriesCtrl.js</br>
| |-- colorsCtrl.js</br>
| |-- productsCtrl.js</br>
|-- models/</br>
| |-- Brand.js</br>
| |-- Category.js</br>
| |-- Color.js</br>
| |-- Product.js</br>
|-- routes/</br>
| |-- brandRoutes.js</br>
| |-- categoryRoute.js</br>
| |-- colorRoute.js</br>
| |-- productRoute.js</br>
|-- app.js </br>
|-- tests/</br>
| |-- controllers/</br>
| | |-- brandController.test.js</br>
| | |-- categoriesCtrl.test.js</br>
| | |-- colorsCtrl.test.js</br>
| | |-- productsCtrl.test.js</br>
| |-- models/
| | |-- brandModel.test.js</br>
| | |-- categoryModel.test.js</br>
| | |-- colorModel.test.js</br>
| | |-- productModel.test.js</br>
|-- .env</br>
|-- node_modules/</br>
|-- package.json</br>
|-- jest.config.js</br>
|-- .gitignore</br>
 

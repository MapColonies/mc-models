# mc-models
this project is used to serve json schemas for input validation and generate matching types to use in typescript projects.

## Build
build and deploy commands:
* build the schema server continer run:
    ```
    docker build -t mc-models .
    ```
* build and deploy local development container with on localhost:80:
    ```
    npm run dockerLocal
    ```
* remove deployed container
    ```
    npm run dockerRemove
    ```  
*   install typescript dependencies (must run before code generation,building or packaging):
    ```
    npm install
    ```
*  create npm tgz packge run:
    ```
    npm pack
    ```
*   run code generation: 
    ```
    npm run generate
    ```
*   build typescript code:
    ```
    npm run build
    ```
*   delete all generted file
    ```
    npm run clean
    ``` 
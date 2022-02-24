# jsvanillawebcomponentcli

## ***Web Components Javascript Vanilla***


This is a PERSONAL project made to create the Web component and the folder structure that I normally use.

```cmd
 src
  |__cmponents
        |__webComponentUno
        |        |--webComponentUno.js
        |        |--webComponentUno.css
        |__webComponentDos
        |        |--webComponentDos.js
        |        |--webComponentDos.css
        |--component.js
        
```

## Dependencies

I Try to make this Project with as few dependencies as possible.

[ESM](https://github.com/standard-things/esm): The brilliantly simple, babel-less, bundle-less ECMAScript module loader.

[COMANDER.JS](https://github.com/tj/commander.js#command-arguments): The complete solution for node.js command-line interfaces.

## Install

  ```cmd
  $ npm install -g jsvanillawebcomponentcli
  ```

## Usage
  
  >Be sure to include in your Html5 a meta tag that links to the components.js module
  
  Ej:
  
  
``` Html 5
<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        
        *** Your html code Here ***

        <script type="module" src="./src/components/components.js"></script>
      </body>
    </html>
```
>now run it in your console

  ```cmd
  $ webc component componentName
  ```
  or

  ```cmd
  $ webc c componentName
  ```
  <div style="background-color: #792323;
            padding: 1rem;
            height: fit-content;
            width: fit-content;
            border-radius: 15px;
            text-align: center;
            box-shadow: 5px 5px 2px #2b1515;
  ">
    <span style="color: #ffffff; font-style: italic">Make sure your component name is written in CamellCase format</span>
  </div>

______________________________________________________________________________________________________

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)




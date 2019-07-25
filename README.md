
# Work with eslint, prettier and airbnb style suggestions!
## Instructions

1. Execute
```bash
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
```
 
2. Ensure that you have npm 5+ and execute:
```bash
npx install-peerdeps --dev eslint-config-airbnb
```
3. Make a config file with
```bash
touch .prettierrc
```

4. Inside you can put all kind of rules like
```json
{
"singleQuote": true
}
```
(NB: The configurations persist locally)

5. Make sure you have installed (globally preferably)
```bash
sudo npm i -g eslint
```

6. Generate an eslint config file by:
```bash
eslint --init
```
This will have the most basic settings, the airbnb style is not yet implemented

Delete everything in the eslint config files except `"extends"` and `"rules"`
Change the `"extends": "eslint:recommended"` to  `"extends": ["airbnb","prettier","plugin:node/recommended"], "plugins":["prettier"]`

You can also overwrite rules to be either `"error"`, `"warn"` or `"off"`
like: 
```json
"no-process-exit":"off"
"object-shortcut:":"off"
```

7. About single/double quotes: according to Prettier module the rule is to include always single quotes.
To enforce this you need to add to the rules 
```json
"prettier/prettier":"error"
``` 

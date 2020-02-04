# ScreepsAI
My AI for [screeps](http://screeps.com)

## Usage
1. Create your private config file : private.js
```javascript
module.exports = {
    email: 'YOUR_EMAIL',
    password: 'YOUR_PASSWORD',
    localPath: 'C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Screeps\\scripts\\127_0_0_1___21025\\default',
    serverPath: 'C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Screeps\\scripts\\YOU_SERVER\\default'
}
```
2. Start game
3. Start grunt & enjoy coding
```shell
# Play in official server
grunt watch
# Play in local server
grunt watch:local
# Play in private server
grunt watch:private
```
# Quiss

AI for [screeps](http://screeps.com)

## Usage

1. Create your private config file : screeps.js

```json
{
  "main": {
    "token": "YOUR_TOKEN",
    "protocol": "https",
    "hostname": "screeps.com",
    "port": 443,
    "path": "/",
    "branch": "main"
  },
  "local": {
    "copyPath: "${folder}"
  }

}

```

2. Start game
3. Start watch & enjoy coding

```shell
pnpm install

pnpm run local

pnpm run watch-main

pnpm run push-main
```

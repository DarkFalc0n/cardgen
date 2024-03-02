# Cardgen
![](https://img.shields.io/badge/typescript-yellow?logo=typescript&style=for-the-badge)
![](https://img.shields.io/badge/discord.js-white?logo=discord&style=for-the-badge)
![](https://img.shields.io/badge/open_source-green?style=for-the-badge&logo=github)

A widget utility to generate live discord cards for portfolios or github README.
## 🤔 How to use
- The utility can be self hosted and run like any other typescript application. It requires a discord application token and a running redis instance to operate. <br>
- Use the [.env.example](https://github.com/DarkFalc0n/cardgen/blob/master/.env.example) file to generate your own .env file in the environment
> To unlock full functionality, that is, to enable rich presence display in the cards, the discord application/bot needs to share a discord server/guild with the user.

## 🖇 Endpoints
  ```
  /api/discord/<DISCORD_USER_ID>
  ```
The output is as follows: <br>
<img src="https://github.com/DarkFalc0n/cardgen/assets/59203815/5431d658-5b09-46d1-8404-cf46fb30c4af" width=400> <br><br>
Passing the style parameter will give the following result:
  ```
  /api/discord/<DISCORD_USER_ID>?style=full
  ```
<img src="https://github.com/DarkFalc0n/cardgen/assets/59203815/116b9719-8b98-4333-b6e1-a098dd8e7290" width=400> <br>





<div align="center">
  <img height="150" src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif"  />
</div>

###

<div align="center">
  <a href="https://www.linkedin.com/in/chaiyasit-ruengdist" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=chaiyasit.ruengdist&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="linkedin logo"  />
  </a>
</div>



<h1 align="left">Text To Speech Bot Discord 👋</h1>

###

## 👩‍💻  About Project

บอทที่จะอ่านข้อความใน Voice Channel ของ Discord โดยใช้เสียงจาก OpenAI API
สิ่งที่ต้องใช้ใน Project
- Discord Bot AppId (จะต้องทำการสร้าง Application ที่ Discord Developer Portal)
- Discord Bot Token (จะต้องทำการสร้าง Application ที่ Discord Developer Portal)
- OpenAI Secret Key (ได้จากการสร้าง Secret Key ที่ OpenAI Platform)

## 👩‍💻  Run Locally

Clone project มาที่เครื่อง

```bash
  git clone https://github.com/chaiyasit96/bot-pao-tts-discord.git
```

เข้าไปยัง Folder ของ Project

```bash
  cd bot-pao-tts-discord
```
สร้างไฟล์ .env และใส่ค่า

```bash
  BOT_PAO_TTS_DISCORD_DISCORD_TOKEN={Discord Bot Token ของคุณ}
  BOT_PAO_TTS_DISCORD_OPENAI_API_KEY={OpenAI Secret Key ของคุณ}
```
ติดตั้ง dependencies

```bash
  npm install
```

Start server

```bash
  npm run start:dev
```
## 👩‍💻  Register Commands
ก่อนที่จะใช้ Slash Command ของ Discord ได้จะต้องลงทะเบียนก่อน
สามารถลงทะเบียนได้โดย Run Script นี้
```bash
    import { REST, Routes } from "discord.js";
    const commands = [
        {
            name: 'join',
            description: 'เรียกบอทเข้า Voice Channel',
        },
        {
            name: 'leave',
            description: 'ให้บอทออกจาก Voice Channel',
        }
    ];
    
    const rest = new REST().setToken({Discord Bot Token ของคุณ});
    rest.put(
        Routes.applicationCommands({Discord Bot AppId ของคุณ}),
        { body: commands }
    ).then(() => console.log("✅ Slash commands registered."));
```

###

<h3 align="left">🛠 Language and tools</h3>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" height="40" alt="nestjs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg" height="40" alt="discordjs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" height="40" alt="googlecloud logo"  />
</div>

###

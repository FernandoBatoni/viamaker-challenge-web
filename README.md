# ViaMaker Challenge - Front-End

```batch
bun install | yarn install
```

## 🧞 Commands

To execute command terminals, I highly suggest using Bun, however it requires WSL or Linux, so if you don't want to install a Linux subsystem, use Yarn instead.
All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :---------------------| :----------------------------------------------- |
| `bun install`         | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:300`      |
| `bun build`           | Build your production site to `./build/`          |
| `bun preview`         | Preview your build locally, before deploying     |

## 💻 Enviroment

In the e-mail I sent, there will be the .env variables needed to run the front-end and back-end,
and they are not built in for security reasons.

Refer to the .env.example for use, and create a .env file on the root of the project.
It should look something like this:

```env
REACT_APP_ENV=development (anything but I recommend development)
REACT_APP_SERVER=http://YOUR.IP.ADDRESS:PORT
```

For the IP, run ipconfig on Windows or ifconfig in Linux, and paste your ip here or from a collegue running the back-end on their machine, and the port set on the back-end

## 🧑‍💻 Technologies

Technologies used include:

- Vite (Framework)
- React + Typescript
- Tailwind for classes, with PostCSS and Less
- Bun / Yarn for package management

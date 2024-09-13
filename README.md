# SSH Man

> This project is in development.

It is built using [Wails](https://wails.io/) (`electronjs`, but with `GoLang` backend).

### Other tools used
- Wails
- React
- Shadcn
- Zustand (State management)

## Preview
![image](https://github.com/user-attachments/assets/2c7a0d68-60fb-45f4-ac22-f8c66bd32d94)


## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.

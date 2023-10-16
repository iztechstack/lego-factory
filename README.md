## Factory Monitor

### Tech

**Factory Monitor** is a [Next.js](https://nextjs.org/) app, written in [Typescript](https://www.typescriptlang.org/) using [Tailwind CSS](https://tailwindcss.com/).
It was bootstrap using `npx create-next-app` and was developed for `Node.js v20.8.0`.
Core components are using the [Antd](https://ant.design/docs/react/introduce) library.

### Run

To fully configure and run the application (running on port `:3000`) execute:

- `npm i`
- `npm run build`
- `npm start`

### Content

- Landing page with single link to `/monitor`
- `/monitor` displays a table of devices fetched from `[GET] /api/devices`
- Selecting a device shows a _"detailed"_ view on the side with current telemetry (`[GET] /api/device/:uuid`) and has a dropdown to change state (`[PUT] /api/device/:uuid`)

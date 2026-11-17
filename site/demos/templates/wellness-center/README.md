# Wellness Center

Demo website served at `/demos/wellness-center`.

## Run

From the `site` folder:

```bash
npm install
npm run dev   # then open http://localhost:3000/demos/wellness-center
```

## Where things are

- `WellnessCenterTemplate.tsx`: the page. It lists the sections in order and holds all copy and image paths as props.
- `theme.css`: this site's colours, corner radius, fonts and button and card styles, scoped to `[data-template="wellness-center"]`.
- `public/images/wellness-center/`: its images and video. Shared media is in `public/images/shared/`.
- Shared sections come from `demos/components/sections/`.

## Deployment

Part of the Khariz Digital site. Its project page is `/work/<slug>`, which links here.

## Limitations

- Forms have no server behind them: they validate and show their result on the page, and nothing is sent.
- All names, prices, figures and quotes are demonstration content.

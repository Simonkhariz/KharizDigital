# Luxury Real Estate

Demo website served at `/demos/luxury-real-estate`.

## Run

From the `site` folder:

```bash
npm install
npm run dev   # then open http://localhost:3000/demos/luxury-real-estate
```

## Where things are

- `LuxuryRealEstateTemplate.tsx`: the page. It lists the sections in order and holds all copy and image paths as props.
- `theme.css`: this site's colours, corner radius, fonts and button and card styles, scoped to `[data-template="luxury-real-estate"]`.
- `components/`: sections used only by this site.
- `public/images/luxury-real-estate/`: its images and video. Shared media is in `public/images/shared/`.
- Shared sections come from `demos/components/sections/`.

## Deployment

Part of the Khariz Digital site. Its project page is `/work/<slug>`, which links here.

## Limitations

- Forms have no server behind them: they validate and show their result on the page, and nothing is sent.
- All names, prices, figures and quotes are demonstration content.
- The opening film is tied to the scroll position; it needs the browser to be able to seek within the video file.

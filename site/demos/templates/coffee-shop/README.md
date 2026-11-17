# Coffee Shop

Demo website served at `/demos/coffee-shop`.

## Run

From the `site` folder:

```bash
npm install
npm run dev   # then open http://localhost:3000/demos/coffee-shop
```

## Where things are

- `CoffeeShopTemplate.tsx`: the page. It lists the sections in order and holds all copy and image paths as props.
- `theme.css`: this site's colours, corner radius, fonts and button and card styles, scoped to `[data-template="coffee-shop"]`.
- `components/`: sections used only by this site.
- `public/images/coffee-shop/`: its images and video. Shared media is in `public/images/shared/`.
- Shared sections come from `demos/components/sections/`.

## Deployment

Part of the Khariz Digital site. Its project page is `/work/<slug>`, which links here.

## Limitations

- Forms have no server behind them: they validate and show their result on the page, and nothing is sent.
- All names, prices, figures and quotes are demonstration content.
- The hand-lettered title is sized to fit its container, so its exact size depends on when the handwriting font finishes loading.

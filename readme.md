This repo reproduces an issue with Memoizee and Rollup.

It looks like rollup will freeze (by default) some objects in the memoizee package,
resulting in runtime errors in the browser


- npm install
- npm run build
- npm run serve

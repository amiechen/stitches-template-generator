# Stitches


test
A simple, fast web app to generate html based on a collection of commonly used user interface patterns.

![app-screen-shot](./screenshot.png)

## Running it locally

For Site:
```
jekyll serve
```

For Js:

```

/*in one terminal window*/
watchify app.js -o bundle.js -v

/*in another terminal window*/
beefy app.js --live
```


To compile css:

```
npm install
npm start
```
this will watch stitches.css changes and compile it to public/stitches.css
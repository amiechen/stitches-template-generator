#Stitches
A simple, fast web app to generate html based on a collection of commonly used user interface patterns.

![app-screen-shot](./screenshot.png)

To run js locally:

```
npm install

/*in one terminal window*/
watchify main.js -o bundle.js -v

/*in another terminal window*/
beefy main.js --live
```

To run css locally:

```
sass --watch scss/stitches.scss:stitches.css
```

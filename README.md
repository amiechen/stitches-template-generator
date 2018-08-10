# Stitches


A simple, fast web app to generate html based on a collection of commonly used user interface patterns.
## 🎏 Live Site: [stitches.hyperyolo.com](https://stitches.hyperyolo.com)
![app-screen-shot](https://cdn-images-1.medium.com/max/2000/1*DqVCpGnXJefwLXFneEHPZg.png)

## Running it locally

cd into `stitches-template-generator` and run:
```
npm install
npm start
```
This will compile the JS, CSS and start a node server on port 3000.

Head to `localhost:3000`. You should see stitches now!

### Docker
You can also run it in Docker.
```
# Build the container
make build

# Run the node server
make run
```


## Make your own templates

Feel free to take this project and re-factor to your need! Not everyone wants these templates for their projects. Here are the steps:
1. Run the project locally (see the section above)
2. Head to `localhost:3000`
3. Add your own HTML template (with tailwind.css classes) into the `templates` folder
4. Add a filter button for it in the `index.html`. (i.e. add `<button class="text-black font-semibold hover:text-green px-2 py-1 transition-normal" data-filter="st-<your template name>">Tabs</button>`) 
5. Done! refresh to check out your own templates.
# What is react?

- React is open source library that came out of Facebook
- It is a view layer that allows you to create components that are in turn composed of other components
- Its greatest contribution to the JS landscape is the solidifying and popularizing the concept of the one-way data flows as applied JS user interface construction
- It does use a virtual DOM to achieve great performance in the browser. while a really great feature and well implemented, this only makes using React feasible, not desirable

> - The Virtual DOM is an abstraction of the HTML DOM. It is lightweight and detached from the browser-specific implementation details. Since the DOM itself was already an abstraction, the virtual DOM is, in fact, an abstraction of an abstraction.
> - Perhaps it’s better to think of the virtual DOM as React’s local and simplified copy of the HTML DOM. It allows React to do its computations within this abstract world and skip the “real” DOM operations, often slow and browser-specific.

# Setup environment
For this simple app, you want to keep it as minimal as possible. you are going to use Babel to transpile ES6 into good ol’ ES5 for the browser, budo/browserify to serve it locally, and tape to test

You will need NodeJS so if you don't have it installed, check the link below:
```
http://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm
```

###Step 1 - Install Global Packages
You will need to install several packages for this setup. you will need some of the babel plugins so let's first install babel by running the following code in command prompt window.
```
npm install -g babel
```
```
npm install -g babel-cli
```

###Step 2 - Create Root Folder
The root folder will be named `react_demo` and you will place it on Desktop. After the folder is created you need to open it and create empty `package.json` file inside by running `npm init` from the command prompt and follow the instructions
```
mkdir react_demo
```
```
cd react_demo
```
```
npm init
```

###Step 3 - Add Dependencies and plugins
You will use `bundo` in these tutorials so let's install it
```
npm install budo -g
```
> Please look at the site for information about `budo`: https://github.com/mattdesl/budo

Since you want to use React, you need to install it first. The `--save` command will add these packages to `package.json` file
```
npm install react --save
```
```
npm install react-dom --save
```
You already mentioned that you will need some babel plugins so let's install it too.
```
npm install babel-core
```
```
npm install babel-loader
```
```
npm install babel-preset-react
```
```
npm install babel-preset-es2015
```
Open the package.json and delete `"test" "echo \"Error: no test specified\" && exit 1" inside "scripts"` object. You are deleting this line since you will not do any testing in this tutorials. Let's add the start command instead.
```
"test": "babel-node ./src/saga.spec.js | tap-spec",
"start": "budo ./src/main.js:build.js --dir ./src --verbose  --live -- -t babelify"
```

> Option: You can create a file called `package.json` in a project folder and add the following contents to it and just run `npm install` in the project folder and install all of the dependencies that you will need:

```
{
  "name": "redux_demo",
  "version": "1.0.0",
  "description": "Redux demo",
  "main": "src/main.js",
  "scripts": {
    "test": "babel-node ./src/saga.spec.js | tap-spec",
    "start": "budo ./src/main.js:build.js --dir ./src --verbose  --live -- -t babelify"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tony-quoctuan/redux_demo.git"
  },
  "author": "Tony <tony_quoctuan@yahoo.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/tony-quoctuan/redux_demo/issues"
  },
  "homepage": "https://github.com/tony-quoctuan/redux_demo#readme",
  "dependencies": {
    "babel-polyfill": "6.3.14",
    "react": "^0.14.3",
    "react-dom": "^0.14.3",
    "react-redux": "^4.4.1",
    "redux": "^3.3.1",
    "redux-saga": "^0.8.0"
  },
  "devDependencies": {
    "babel-cli": "^6.1.18",
    "babel-core": "6.4.0",
    "babel-preset-es2015": "^6.1.18",
    "babel-preset-react": "^6.1.18",
    "babel-preset-stage-2": "^6.1.18",
    "babelify": "^7.2.0",
    "browserify": "^13.0.0",
    "budo": "^8.0.4",
    "tap-spec": "^4.1.1",
    "tape": "^4.2.2"
  }
}
```

You’re also going to need to configure Babel with a `.babelrc` file in the project folder that contains the Babel presets that you want to use:
```
{
  "presets": ["es2015", "react", "stage-2"]
}
```
This file tells babel that you will be using ES2015 (ES6), React, and stage-2 features of the emerging ECMAScript standard (ES2016).


###Step 4 - Create files
The `package.json` has two standard scripts configured called `start` and `test`. For right now, you want to get start working so you can load the application. The `start` script is currently configured to look inside of a folder called src so create a folder called `src` in the project directory.

Let's create several files in `src` folder that you need. You can add it manually or you can use command prompt.
```
touch index.html
```
```
touch main.js
```
Create `styles.css` in `styles` folder by:
```
mkdir styles
cd styles
touch styles.css
```
Add contents to all file which you created follow

<b>index.html</b>
```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Redux Image Gallery</title>
  <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
  
<div id="root"></div>

<script type="text/javascript" src="build.js"></script>
</body>
</html>
```
<b>main.js</b>
```
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello React!</h1>,
  document.getElementById('root')
);
```
<b>styles.css</b>
```
body {
    font-family: Helvetica, Arial, Sans-Serif, sans-serif;
    background: white;
}

.title {
    display: flex;
    padding: 2px;
}

.egghead {
    width: 30px;
    padding: 5px;
}

.image-gallery {
    width: 600px;
    display: flex;
    flex-direction: column;
    border: 1px solid darkgray;
    margin: 0 auto;
}

.gallery-image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-image img {
    width: 100%;
    max-height: 250px;
}

.image-scroller {
    display: flex;
    justify-content: space-around;
    overflow: auto;
    overflow-y: hidden;
}

.image-scroller img {
    width: 100px;
    height: 100px;
    padding: 1px;
    border: 1px solid black;
}
```
The `index.html` loads the `styles.css` to give us some basic `styling/layout`. It also loads the script `build.js`, which is a generated file. Our `main.js` is a very basic React application that renders an `h1` into the `#root` element inside of `index.html`. With these files in place, you should now be able to run `npm start`

#State vs Props

React has two concepts of data access in a component: `state` and `props`

- `Props` are "things" passed down from the parent to the child. Try to use props as much as possible and keep as little state as possible. Props are immutable
- `State` are kept in a component and can only be modified in that component. State is mutable. Using state should avoided where possible, opting to use as little state as possible

# One way data flow

- React views are made of a component, which is in turn made of components. Turtles all the way down
- Data only flows from the parents to the children
- Children thus only have the logic to display the data, not modify it
- Children also handle events and then inform parents via callback or events. Parents then modify their own state
- Thus when you unexpected behavior it can only live in a select few places. This comes at the cost of being a bit verbose

# Demo react

Now you will build the base `Gallery` React component.
You will create a `Gallery` component that will display images. In the `src` folder, create a `components` and a file called `Gallery.js` with the following contents.
```
import React, {Component} from 'react'

const flickrImages = [
  "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
  "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
  "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
  "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
  "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
];

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: flickrImages,
      selectedImage: flickrImages[0]
    }
  }
  render() {
    const {images, selectedImage} = this.state;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            <div key={index}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
```
The `Gallery` extends `Component`, and in its constructor you set the `initial state` of the component.

The `image-scroller` element uses the images array to produce multiple elements using `map`

With the `Gallery` created, you can update `main.js` to load the gallery
```
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'

ReactDOM.render(
  <Gallery />,
  document.getElementById('root')
);
```

For now, you are using the hard-coded image URLs (via the `flickrImages` array), and displaying the first image url as the `selectedImage`.
You’re accessing these properties by setting a default initial state within the `Gallery` component class constructor.

You can add interactivity to the gallery with an event handler that calls the `setState` method on the `Gallery` component
```
import React, {Component} from 'react'

const flickrImages = [
  "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
  "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
  "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
  "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
  "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
];

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImage: null
    }
  }
  handleThumbClick(selectedImage) {
    this.setState({
      selectedImage
    })
  }
  render() {
    const {images, selectedImage} = this.state;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            <div key={index} onClick={this.handleThumbClick.bind(this, image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
```

By adding `handleThumbClick` to the `Gallery` component class, you can access it in any elements `onClick` method.
Note that you are using `bind(this,image)` in the `onClick`.
By passing image as the second argument, it is sent as the first argument to `handleThumbClick`.
This use of `bind` is an extremely handy way to pass context to an event handler.

Now that you’ve dealt with getting the application running and displaying data

# Component Life Cycle

- `componentWillMount` is executed before rendering, on both server and client side
- `componentDidMount` is executed after first render only on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution like `setTimeout` or `setInterval`. You are using it to update the state so you can trigger the other lifecycle methods.
- `componentWillReceiveProps` is invoked as soon as the props are updated before another render is called. You triggered it from setNewNumber when you updated the state.
- `shouldComponentUpdate` should return true or false value. This will determine if component will be updated or not. This is set to true by default. If you are sure that component doesn't need to render after state or props are updated, you can return false value.
- `componentWillUpdate` is called just before rendering.
- `componentDidUpdate` is called just after rendering.
- `componentWillUnmount` is called after the component is unmounted from the dom. You are unmounting our component in main.js.'

Now, please come back to your project, you can consider loading some remote data. The most obvious place to do that is one of the React component lifecycle methods. You will use `componentDidMount` and make a call to the Flickr API and load some images
Please change your source follow this content:
```
import React, {Component} from 'react'

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImage: null
    }
  }
  handleThumbClick(selectedImage) {
    this.setState({
      selectedImage
    })
  }
  componentDidMount() {
    const API_KEY = '5a19c6f1753127bc68c0f69e48c35215';
    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;
    fetch(API_ENDPOINT).then((response) => {
      return response.json().then((json) => {
        const images = json.photos.photo.map(({farm, server, id, secret}) => {
          return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        });
        let numberRandom = Math.floor((Math.random() * 5)); console.log(numberRandom);
        this.setState({images, selectedImage: images[numberRandom]});
      })
    })
  }
  render() {
    const {images, selectedImage} = this.state;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            <div key={index} onClick={this.handleThumbClick.bind(this, image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
```
You’ve added a new method to the Gallery class. You are using React’s `componentDidMount` lifecycle method to trigger the loading of data from Flickr. Lifecycle methods are called by React at specific times in a component’s lifecycle. In this case, the method will be called whenever the component is added to the DOM. Note that the Gallery component is only added to the DOM once, so this will give you your initial load of images. For a more dynamic component that is loaded and unloaded over an application’s lifecycle, this might cause excessive service calls or other unforeseen results.

You are using the `fetch` browser API to make a request to Flickr. Fetch returns a promise that resolves with `response` object. Calling `response.json()` gives us another promise, which is the actual JSON result you are looking for. You’ll map over the photos to create an array of Flickr image urls.

So now that you have a working image gallery using React.
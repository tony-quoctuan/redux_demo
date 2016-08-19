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

## What is wrong with React state

Using `state` built in React components is very tempting, but when application gets more complex and lots of parts have to communicate with each other debugging it becomes really hard task. It’s difficult to see the data flow and how various components communicate.
In React, components can easily communicate with their children by passing them props, and children can talk back by callback functions, but what if we need to notify neighbour or some faraway component?

## What is Redux?

- Redux is a framework that controls states in a JavaScript app. According to the official site: `Redux is a predictable state container for JavaScript apps.`
- There are many states in an app that will change depending on time, user behavior, or a plethora of different reasons. `Thus, if we consider an app as the process to change its own state, the view a user sees is how the states are presented.`
- We can use Redux to manage any kind of application state, providing we stick to the following guidelines:
    + Our state is kept in a single store.
    + Changes come from actions not mutations
For example, in a TODO list app, when we create a new todo item, we actually changed the state of an app from one without that TODO item to one with the TODO item. In addition, because the app’s state has changed, and the view is how a state is presented, we will see the new TODO item in our view.
- At the core of a Redux store is a function that takes the current application state and an action and combines them to create a new application state. We call this function a reducer.


## Stores

A store is simply a state container. This is the place where your state lives and where actions are dispatched and handled. When you start out building a Redux application, you’ll have to think about how you want to model your application and how the state should be stored. This is important because in Redux it’s recommended to only have one store, and since state is shared it’s a good idea to think of that before you get started.

## Actions

Actions are objects that describe how we want to mutate our state. You can think of actions as the API to your state tree. To illustrate, an action for adding a new user could be:
```
{
  type: 'ADD_USER',
  data: {
    name: 'Foo',
    email: 'foo@bar.com',
    password: 'Foobar123_'
  }
}
```
To make things clearer and easier to reuse, convention is to use a builder to build the action object. I.e. in the case above, you would create a function such as `addUser(name, email, password)` and have that build the object. As you can see, actions themselves doesn’t call anything. An action is simply just an object that describes how we want to change the state.

## Reducers

Actions are cool, but they don’t make much sense by themselves. This is where reducers come in. Reducers are action handlers that act upon dispatched actions in your store and reduce these actions into state changes. If we were to dispatch an action such as `ADD_USER` in our store, we could have a reducer that would pick that action up and add a new user entry to our state.

## How does Redux work?

Redux is astonishingly simple. It uses a function called a reducer (a name derived from the JavaScript reduce method) that takes two parameters: An action, and a next state.

The reducer has access to the current (soon to be previous) state, applies the given action to that state, and returns the desired next state.

Reducers are designed to be pure functions; meaning, they produce no side effects. If you pass the same input values to a reducer 100 times, you will get the exact same output value 100 times. Nothing weird happens. They are completely predictable. As someone with a prominent "NO SURPRISES" sticky note on my monitor, this is a wonderful idea to contemplate.

Reducers do not store state, and they do NOT mutate state. They are passed state, and they return state. This is what reducers look like in action.

Note that the reducer is passed only the slice of state that requires updating and it returns a new state after each action is dispatched.

## Demo Redux

**The reducer function is the brain of Redux**. When an action is dispatched by the application, the reducer receives the action and creates the piece of application state that the reducer owns. Since **reducers are pure functions**, they can be composed together to create the complete state of the application. Let’s create a simple reducer in the `src` folder:

**reducer.js**

We’ve created a `defaultState` object that has an empty array as its `images` property. We will set the `state` to default in the `images` function parameters. The reducer needs to return the current state of the application. This is important! Right now, we aren’t making any changes, so we can just return the state. The reducer should always return an object representing the state.

```
const defaultState = {
     images: [
       "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
       "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
       "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
       "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
       "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
     ],
     selectedImage: "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg"
   }
   export default function images(state = defaultState, action) {
     switch(action.type) {
       case 'IMAGE_SELECTED':
         return {...state, selectedImage: action.image};
       default:
         return state;
     }
   }
```
A reducer function is a function that takes two arguments.

+ `state` – this is the data that represents the state of the application. The reducer function will use this state to construct the new state. If no state has changed as result of the action, the reducer will simply return the state input.
+ `action` – the event that has triggered the reducer. Actions are dispatched by the store, and handled by reducers. The action is required to have a type property that the reducer uses to apply changes to the new application state.

For right now, the `images` reducer will log to the console to prove that it is connected and ready for work. To use the reducer we need to configure redux in `main.js`:

**main.js**

```
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer);
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
```
We are going to import the `createStore` function from the Redux library. `createStore` is used to create the Redux store. For the most part, we don’t interact directly with the store, it is something that Redux manages for us behind the scenes.

We also need to import the reducer function that we’ve just created so that it can be delivered to the store.

We will use `createStore(reducer)` to configure the store with our application’s reducer. This example only has a single reducer, but `createStore` can take multiple reducers arguments. More on that a bit later!

Finally we import the higher-order `Provider` component from `react-Redux`. This will wrap our  Gallery  so that we can make easy use of `Redux`. We need to pass the store we just created to the `Provider` so that it can use it for us. You could use Redux without `Provider`, and in fact, React isn’t required to use Redux at all! That’s wonderful, but we are going to use `Provider` because it is very convenient.

Note: All reducers `receive` all actions that are dispatched in the application. In this case we are seeing an action that Redux itself dispatches.

**Connecting the gallery component**

With Redux, we will use the concept of “connected” and “un-connected” components. A connected component is wired into the store, and coordinates and controls action events and the store. Usually a connected component will have children that are “pure components” that take data as input, and render when that data is updated. These children are unconnected components.

react-redux provides a convenient wrapper for React components that does most of the heavy lifting required to connect a React component to a Redux store. We will add that to Gallery and make it our primary connected component:

```
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  * as GalleryActions from './../actions.js';

// const flickrImages = [
//   "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
//   "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
//   "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
//   "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
//   "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
// ];

export class Gallery extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   images: [],
    //   selectedImage: null
    // }
  }
  handleThumbClick(selectedImage) {
    this.setState({
      selectedImage
    })
  }
  // componentDidMount() {
  //   const API_KEY = '64de6b3bfce0fdff964ed9f22608156c';
  //   const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;
  //   fetch(API_ENDPOINT).then((response) => {
  //     return response.json().then((json) => {
  //       const images = json.photos.photo.map(({farm, server, id, secret}) => {
  //         return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
  //       });
  //       let numberRandom = Math.floor((Math.random() * 5));
  //       this.setState({images, selectedImage: images[numberRandom]});
  //     })
  //   })
  // }
  render() {
    const {images, selectedImage, selectImage} = this.props;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            // <div key={index} onClick={this.handleThumbClick.bind(this, image)}>
            <div key={index} onClick={() => selectImage(image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    images: state.images,
    selectedImage: state.selectedImage
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(GalleryActions, dispatch);
}
export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)
```
Importing the `connect` function from react-redux lets us export `Gallery` by wrapping it in the connect component. Notice that `connect()(Gallery)` puts Gallery in a second set of parentheses. This is because `connect()` returns a function that expects a React component as an argument. The call to `connect()` configures that function. Soon we’ll pass in arguments to connect to configure it for our applications specific actions and `state` structure.
We are also exporting the connect call as the default for this module.
 
If you look towards the bottom of `Gallery` you will notice that we created a function called `mapStateToProps` that takes a state argument and returns an object that puts `state.images` into a property called `images. mapStateToProps` is then passed as an argument to `connect`: 

As the name suggests `mapStateToProps` is a function that takes the current state, and assigns it to properties of the component. 
We’ve added a `mapActionCreatorsToProps` function that takes the dispatch function as an argument.

**Updating the state**

We’re going to configure the reducer to listen for an `IMAGE_SELECTED` action, and update the state with the action’s payload.

In the `Gallery`, we will use the `dispatch` function in the component props by calling it inside of the body of the `onClick` handler function. For now we are just writing it inline for convenience, but once we make that change, we can now click a thumbnail, and it will update the selected image via the reducer!
Using dispatch can be convenient way to quickly create generic actions, but soon we will want to make reusable actions that are well named. To do this, we will make use of “action creators”.

**Action Creators**

- Action creators are functions that return configured action objects. We will add our first action creator to an new file called `actions.js`

**actions.js**

```
export const IMAGE_SELECTED = 'IMAGE_SELECTED';

export function selectImage(image) {
  return {
    type: IMAGE_SELECTED,
    image
  }
}
```
This could now be imported directly into any file that needed to create a `selectImage` action! `selectImage` is a pure function that only returns data. It takes an image as an argument, and adds that to the action object it creates and returns.

This isn’t much nicer than just using dispatch though.

To review, we’ve done several things:
- created a reducer that contains the initial (default) state of our application and listens for actions
- created a store that consumes the reducer and provides a dispatcher that we can use to dispatch actions
- connected our Gallery component to the store
- mapped the store’s state to props that are passed to the Gallery
- mapped an action creator function so that the Gallery can simply call `selectImage(image)' and the application state will update.

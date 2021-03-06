import React, {Component} from 'react'

// const flickrImages = [
//   "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
//   "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
//   "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
//   "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
//   "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
// ];

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
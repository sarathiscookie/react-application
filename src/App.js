import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://restapiproject.test/api/lists')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    });
  }

  render() {

    let { isLoaded, items } = this.state;
    
    if(!isLoaded) {
      return <div>Loading....</div>
    }
    else {
      return (
        <div className="App">
          <ul>
              {items.recipes.map(item => (
                <li key={item.recipe_id}> {item.title} </li>
              ))}
          </ul>
        </div>
      );
    }

  }
}

export default App;

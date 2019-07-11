import axios from 'axios';
import React from 'react';

class List extends React.Component {
  constructor() {
    super();
    this.state = { projects: [] }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/projects')
      .then(res => { this.setState({ projects: res.data }) })
      .catch(err => console.log(err));
  }

  render() {
    return (
      this.state.projects.map((e, index) => {
        return (
          <div key={index}>
            <h1>{e.name}</h1>
            <h2>{e.description}</h2>
            <h3>{e.completed}</h3>
          </div>

        )
      })
    )
  }

}

export default List;
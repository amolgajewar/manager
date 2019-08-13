import React from 'react';
import Projects from './Projects.jsx';
import NewProject from './NewProject.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projectArray: [],
      newProjectClicked: false
    };
    this.onNewProjectClick = this.onNewProjectClick.bind(this);
    this.projectHandler = this.projectHandler.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/projects',
      method: 'get',
      contentType: 'application/json',
      success: (data)=>{
        console.log(data);
        this.setState({
          projectArray: data
        });
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  onNewProjectClick(event) {
    this.setState({
      newProjectClicked: true
    });
  }

  projectHandler() {
    $.ajax({
      url: '/api/projects',
      method: 'get',
      contentType: 'application/json',
      success: (data)=>{
        console.log(data);
        this.setState({
          projectArray: data,
          newProjectClicked: false
        });
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  render() {
    const {
      newProjectClicked
    } = this.state;
    return (
      <div>
        <button onClick={this.onNewProjectClick}>Add New Project</button>
          <div>
          {
            newProjectClicked
            ?
            <NewProject projectHandler={this.projectHandler}/>
            :
            <div></div>
          }
          </div>

      <table id="managers">
            <tr>
              <th>Project Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
            {
              this.state.projectArray.map((project)=> {
                return (<Projects projectHandler={this.projectHandler} project={project}/>)
              })
            }
      </table>
      </div>
    );
  }
}

export default App;
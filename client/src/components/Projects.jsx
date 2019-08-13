import React from 'react';
import $ from 'jquery';
const date = require('../dateHelper.js');

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectClicked: false,
      currentYear: '',
      currentMonth: '',
      currentDay:''
    };
    this.onProjectClick = this.onProjectClick.bind(this);
    this.onYearSelect = this.onYearSelect.bind(this);
    this.onMonthSelect = this.onMonthSelect.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);

    this.onUpdateProject = this.onUpdateProject.bind(this);
    this.onDeleteProject = this.onDeleteProject.bind(this);
  };

  onProjectClick(event) {
    console.log(event.target.value);
    const value = !this.state.projectClicked;
    this.setState({
      projectClicked: value
    });
  }

  onYearSelect(event) {
    console.log(event.target.value);
    this.setState({
      currentYear: event.target.value
    });
  }

  onMonthSelect(event) {
    console.log(event.target.value);
    this.setState({
      currentMonth: event.target.value
    });
  }

  onDaySelect(event) {
    console.log(event.target.value);
    this.setState({
      currentDay: event.target.value
    });
  }

  onUpdateProject(event){
    $.ajax({
      url: '/api/projects',
      method:'put',
      contentType:'application/json',
      data: JSON.stringify({
        'id': this.props.project.id,
        'name': this.props.project.name,
        'startdate': this.props.project.startdate,
        'enddate': `${this.state.currentMonth}/${this.state.currentDay}/${this.state.currentYear}`
      }),
      success: (row)=>{
        console.log('number of rows update : ' + row);
        this.setState({
          projectClicked: false
        });
        this.props.projectHandler();
      },
      error: (err)=>{
        console.log('Put request failed : ' + err);
      }
    });
  }

  onDeleteProject(){
    $.ajax({
      url: `/api/projects/?id=${this.props.project.id}`,
      method:'delete',
      success: (row)=>{
        console.log('Rows deleted : ' + row);
        this.setState({
          projectClicked: false
        });
        this.props.projectHandler();
      },
      error: (err)=>{
        console.log('Delete request failed : ' + err);
      }
    });
  }

  render() {
    return (

      !this.state.projectClicked

      ?

      <tr onClick={this.onProjectClick}>
          <td>{this.props.project.name}</td>
          <td>{this.props.project.startdate}</td>
          <td>{this.props.project.enddate}</td>
      </tr>
      :
      <table id="manager">

        <h2 onClick={this.onProjectClick}>{this.props.project.name}</h2>
        <h4>Start Date : {this.props.project.startdate}<span>&nbsp;&nbsp;&nbsp;</span>
        End Date : {this.props.project.enddate}</h4>

        <div>
          <label>Year:
            <span>&nbsp;</span>
            <select onChange={this.onYearSelect} name="Year:">
              <option value="none" selected="true" disabled={true}>none</option>
              {
                date.year.map((item)=>
                  <option value={item}>{item}</option>
                )
              }
            </select>
            <span>&nbsp;</span>
          </label>
          <label>Month:
            <span>&nbsp;</span>
            <select onChange={this.onMonthSelect} name="Month:">
              <option value="none" selected="true" disabled={true}>none</option>
              {

                date.month.map((item)=>{
                  if(this.state.currentYear === '2019'){
                    if(item >= 8) {
                      return (<option value={item}>{item}</option>);
                    }
                  } else {
                    return (<option value={item}>{item}</option>);
                  }
                })
              }
            </select>
            <span>&nbsp;</span>
          </label>
          <label>Day:
            <span>&nbsp;</span>
            <select onChange={this.onDaySelect} name="Day:">
              <option value="none" selected="true" disabled={true}>none</option>
              {
                date.days.map((item)=> {
                  if(item <= date.getDaysInMonth(parseInt(this.state.currentMonth), parseInt(this.state.currentYear))) {
                    return (<option value={item}>{item}</option>);
                  }
                })
              }
            </select>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </label>
          <button onClick={this.onUpdateProject}>Update End Date</button>
          <span>&nbsp;</span>
          <button onClick={this.onDeleteProject}>Delete Project</button>
        </div>
      </table>
    );
  }
};

export default Projects;
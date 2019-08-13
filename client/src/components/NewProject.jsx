import React from 'react';
import $ from 'jquery';
const date = require('../dateHelper.js');

class NewProject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentStartYear: '',
      currentStartMonth: '',
      currentStartDay: '',

      currentEndYear: '',
      currentEndtMonth: '',
      currentEndtDay: '',

      currentName: ''
    };

    this.onNameEnter = this.onNameEnter.bind(this);

    this.onStartYearSelect = this.onStartYearSelect.bind(this);
    this.onStartMonthSelect = this.onStartMonthSelect.bind(this);
    this.onStartDaySelect = this.onStartDaySelect.bind(this);

    this.onEndYearSelect = this.onEndYearSelect.bind(this);
    this.onEndMonthSelect = this.onEndMonthSelect.bind(this);
    this.onEndDaySelect = this.onEndDaySelect.bind(this);

    this.onCreateProject = this.onCreateProject.bind(this);
  }

  onNameEnter(event) {
    console.log(event.target.value);
    this.setState({
      currentName: event.target.value
    });
  }
  onStartYearSelect(event) {
    console.log(event.target.value);
    this.setState({
      currentStartYear: event.target.value
    });
  }

  onStartMonthSelect(event) {
    console.log(event.target.value);
    this.setState({
      currentStartMonth: event.target.value
    });
  }

  onStartDaySelect(event) {
    console.log(event.target.value);
    this.setState({
      currentStartDay: event.target.value
    });
  }

  onEndYearSelect(event) {
    console.log(event.target.value);
    this.setState({
      currentEndYear: event.target.value
    });
  }

  onEndMonthSelect(event) {
    console.log(event.target.value);
    this.setState({
      currentEndMonth: event.target.value
    });
  }

  onEndDaySelect(event) {
    console.log(event.target.value);
    this.setState({
      currentEndDay: event.target.value
    });
  }

  onCreateProject(event){
    $.ajax({
      url: '/api/projects',
      method:'post',
      contentType:'application/json',
      data: JSON.stringify({
        'name': this.state.currentName,
        'startdate': `${this.state.currentStartMonth}/${this.state.currentStartDay}/${this.state.currentStartYear}`,
        'enddate': `${this.state.currentEndMonth}/${this.state.currentEndDay}/${this.state.currentEndYear}`
      }),
      success: (row)=>{
        console.log('number of rows created : ' + row);
        this.props.projectHandler();
      },
      error: (err)=>{
        console.log('Post request failed : ' + err);
      }
    });
  }

  render() {
    return (
    <div>
      <div style={{'padding-top': 20, 'padding-bottom': 10}}>
      <form>
        <label> Project Name :
          <input onChange={this.onNameEnter}type="text"></input>
        </label>
      </form>
      </div>
      <div style={{'padding-top': 10, 'padding-bottom': 10}}>
        <label>Enter Start Date :</label>
        <span>&nbsp;&nbsp;</span>
        <label>Year:
          <span>&nbsp;&nbsp;</span>
          <select onChange={this.onStartYearSelect} name="Year:">
            <option value="none" selected="true" disabled={true}>none</option>
            {
              date.year.map((item)=>
                <option value={item}>{item}</option>
              )
            }
          </select>
          <span>&nbsp;&nbsp;</span>
        </label>

        <label>Month:
          <span>&nbsp;&nbsp;</span>
          <select onChange={this.onStartMonthSelect} name="Month:">
            <option value="none" selected="true" disabled={true}>none</option>
            {

              date.month.map((item)=>{
                if(this.state.currentStartYear === '2019'){
                  if(item >= 8) {
                    return (<option value={item}>{item}</option>);
                  }
                } else {
                  return (<option value={item}>{item}</option>);
                }
              })
            }
          </select>
          <span>&nbsp;&nbsp;</span>
        </label>

        <label>Day:
          <span>&nbsp;&nbsp;</span>
          <select onChange={this.onStartDaySelect} name="Day:">
            <option value="none" selected="true" disabled={true}>none</option>
            {
              date.days.map((item)=> {
                console.log();
                if(item <= date.getDaysInMonth(parseInt(this.state.currentStartMonth), parseInt(this.state.currentStartYear))) {
                  return (<option value={item}>{item}</option>);
                }
              })
            }
          </select>
          <span>&nbsp;&nbsp;</span>
          <span>&nbsp;</span>
        </label>

      </div>

      <div style={{'padding-top': 10, 'padding-bottom': 10}}>
        <label>Enter End Date :</label>
        <span>&nbsp;&nbsp;</span>
        <label>Year:
          <span>&nbsp;&nbsp;</span>
          <select onChange={this.onEndYearSelect} name="Year:">
            <option value="none" selected="true" disabled={true}>none</option>
            {
              date.year.map((item)=>
                <option value={item}>{item}</option>
              )
            }
          </select>
          <span>&nbsp;&nbsp;</span>
        </label>

        <label>Month:
          <span>&nbsp;&nbsp;</span>
          <select onChange={this.onEndMonthSelect} name="Month:">
            <option value="none" selected="true" disabled={true}>none</option>
            {

              date.month.map((item)=>{
                if(this.state.currentEndYear === '2019'){
                  if(item >= 8) {
                    return (<option value={item}>{item}</option>);
                  }
                } else {
                  return (<option value={item}>{item}</option>);
                }
              })
            }
          </select>
          <span>&nbsp;&nbsp;</span>
        </label>

        <label>Day:
          <span>&nbsp;&nbsp;</span>
          <select onChange={this.onEndDaySelect} name="Day:">
            <option value="none" selected="true" disabled={true}>none</option>
            {
              date.days.map((item)=> {
                if(item <= date.getDaysInMonth(this.state.currentEndMonth, this.state.currentEndYear)) {
                  return (<option value={item}>{item}</option>);
                }
              })
            }
          </select>
          <span>&nbsp;&nbsp;</span>
          <span>&nbsp;</span>
        </label>
        <button onClick={this.onCreateProject}>Create Project</button>
      </div>
  </div>
  );
  }
}

export default NewProject;
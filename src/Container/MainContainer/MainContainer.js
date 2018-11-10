import React, { Component } from 'react'
import { Navbar, LandingPage, ResultsGrid } from "../../Utils/ImportsPresentation";
import { StreamPage } from "../StreamPage/StreamPage";
import { debounce } from '../../Utils/AuxiliarFunctions';
import * as TwitchAPI from '../../Utils/TwitchAPI';
import { Route, Switch } from 'react-router-dom';

export class MainContainer extends Component {
  state = {
    query: '',
    settingsNumber: 25,
    results : {
      _total: 0,
      streams: []
    }
  }

  handleSearchInput = (e) => {
    this.setState({query:e.target.value});
  }

  handleSettingsInput = (e) => {
    this.setState( {settingsNumber: e.target.value} );
  }
  handleClickedStream = (e) => {
    this.props.history.push(`/channel?name=${e.target.dataset.name}`);
  }
  fetchStreams = debounce(() => {
    const {query, settingsNumber} = this.state;
    if(this.state.query !== '') {
      this.props.history.push(`/search?query=${this.state.query}`);
      TwitchAPI.searchStreams(query, settingsNumber)
      .then(
          res => {
            this.setState({results: res});
          }
      )
      .catch(
        err => {
          console.log(err);
        }
      )
    }
  } ,1000)

  componentDidUpdate = (prevProps, prevState) => {
    if((prevState.query !== this.state.query || prevState.settingsNumber !== this.state.settingsNumber)) {
      this.fetchStreams();
    }
  }

  componentDidMount = () => {

  }
  render() {
    const {handleSearchInput, handleSettingsInput, state, handleClickedStream} = this;
    const {query, settingsNumber, results} = state;
    const navbarProps = {
      query: query,
      settingsNumber: settingsNumber,
      handleSearchInput: handleSearchInput,
      handleSettingsInput:handleSettingsInput
    };
    const resultsProps = {
      results:results,
      handleClickedStream: handleClickedStream
    }

    return (
      <div>
        <Navbar {...navbarProps}/>
        <Switch>
          <Route exact path ="/" render={()=> (<LandingPage/>)}></Route>
          <Route path= "/search" render={() => ( <ResultsGrid {...resultsProps}/>)}></Route>
          <Route path= "/channel" render={() => ( <StreamPage />)}></Route>
        </Switch>
        
      </div>
    )
  }
}

export default MainContainer

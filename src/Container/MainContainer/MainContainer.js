import React, { Component } from 'react'
import { Navbar, LandingPage, ResultsGrid, LoadingAnimation } from "../../Utils/ImportsPresentation";
import { StreamPageContainer } from "../StreamPageContainer/StreamPageContainer";
import { debounce } from '../../Utils/AuxiliarFunctions';
import * as TwitchAPI from '../../Utils/TwitchAPI';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

export class MainContainer extends Component {
	state = {
		loading: false,
		query: '',
		settingsNumber: 25,
		settingsDummy:25,
		settingsShow: false,
		results : {
			_total: 0,
			streams: []
		},
		channelId: '',
		stream : {
			channel:{

			}
		},
	}

	handleSearchInput = (e) => {
		this.setState({query:e.target.value});
	}

	handleSettingsInput = (e) => {
		if( e.target.value > 0 && e.target.value <= 100){
			this.setState( {settingsDummy: e.target.value} );
			return true;
		} else {
			return false;
		}
	}

	returnHome = () => {
		this.setState ( {
			query: '',
			results : {
				_total: 0,
				streams: []
			},
			channelId: '',
			stream : {
				channel:{
				}
			},
			loading : false,
		});
		this.props.history.push(`/`);
	}
	
	handleSettingsSave = (e) => {
		if(e.target.dataset.type === 'cancel') {	
			this.toggleSettingsShow();
			this.setState( {settingsDummy: this.state.settingsNumber});
		} else if (e.target.dataset.type === 'save') {
			this.toggleSettingsShow();
			this.setState ( {settingsNumber: this.state.settingsDummy},() => {
				localStorage.setItem('settingsNumber', this.state.settingsDummy);
				this.fetchStreams();
			});
		}
		
	}

	handleClickedStream = (stream, e) => {
		this.setState({
			channelId: e.target.dataset.id,
			stream: stream});
		this.props.history.push(`/channel?id=${e.target.dataset.id}`);
	}

	toggleSettingsShow = () => {
		this.setState((prevState)=> {
			return {
				settingsShow: !prevState.settingsShow
			}
		})
	}

	fetchStreams = debounce(() => {
		const {query, settingsNumber} = this.state;
		if(this.state.query !== '') {
			this.props.history.push(`/search?query=${this.state.query}`);
			TwitchAPI.searchStreams(query, settingsNumber)
			.then(
					res => {
						this.setState({results: res, loading:false});
					}
			)
			.catch(
				err => {
					console.log(err);
				}
			)
		}
	} ,1000)

	fetchSpecifStream = (channelId) => {
		TwitchAPI.getStreamById(channelId)
			.then(
				res => {
					this.setState({
						stream:res.stream, 
						channelId:channelId});
				}
			)
			.catch(
				err => {
					console.log(err);
				}
			)
	}

	componentDidUpdate = (prevProps, prevState) => {
		if((prevState.query !== this.state.query || prevState.settingsNumber !== this.state.settingsNumber)) {
			if(this.state.query === '') {
				//this.returnHome();
			} else {
				this.setState({loading:true}, ()=>{
					this.fetchStreams();
				})
			}
		}
	}

	componentDidMount = () => {
		let localSettingsFetch = localStorage.getItem('settingsNumber') || 25;
		localSettingsFetch = {
			settingsNumber:localSettingsFetch,
			settingsDummy:localSettingsFetch
		}
		const parsed = queryString.parse(this.props.location.search);
		if(parsed.id) {
			this.setState(
				{...localSettingsFetch }, () => {
				this.fetchSpecifStream(parsed.id);
			});
		} else if(parsed.query) {
			this.setState({ ...localSettingsFetch,
				query: parsed.query});
		} else {
			this.setState({
				...localSettingsFetch
			})
		}
	}
	render() {
		const { handleSearchInput, handleSettingsInput,
				state, handleClickedStream, fetchSpecifStream,
				handleSettingsSave, toggleSettingsShow, returnHome} = this;
		const { settingsShow, query, results, channelId, stream, settingsDummy} = state;
		const navbarProps = {
			query: query,
			settingsDummy: settingsDummy,
			settingsShow: settingsShow,
			handleSearchInput: handleSearchInput,
			handleSettingsInput:handleSettingsInput,
			handleSettingsSave: handleSettingsSave,
			toggleSettingsShow: toggleSettingsShow,
			returnHome:returnHome,
		};
		const resultsProps = {
			results:results,
			handleClickedStream: handleClickedStream,
			
		}
		const streamProps = {
			channelId: channelId,
			stream: stream,
			fetchSpecifStream: fetchSpecifStream
		}

		return (
			<div>
				<Navbar {...navbarProps}/>
				{this.state.loading && <LoadingAnimation></LoadingAnimation>}
				<Switch>
					<Route exact path ="/" render={()=> (<LandingPage/>)}></Route>
					<Route path= "/search" render={() => ( <ResultsGrid {...resultsProps}/>)}></Route>
					<Route path= "/channel" render={() => ( <StreamPageContainer {...streamProps}/>)}></Route>
				</Switch>
			</div>
		)
	}
}

export default MainContainer

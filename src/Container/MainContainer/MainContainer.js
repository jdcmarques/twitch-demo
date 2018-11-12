import React, { Component } from 'react'
import { Navbar, LandingPage, ResultsGrid, LoadingAnimation } from "../../Utils/ImportsPresentation";
import { StreamPageContainer } from "../StreamPageContainer/StreamPageContainer";
import { debounce } from '../../Utils/AuxiliarFunctions';
import * as TwitchAPI from '../../Utils/TwitchAPI';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from 'react-toastify';


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

	// Search Input Handler -> Passes down as props to the Search Input Component
	handleSearchInput = (e) => {
		this.setState({query:e.target.value});
	}

	// Number of streams Settings Handler -> Passes down as props to the Settings Input Component
	// If the value is not between 0 and 100 it doesn't allow the user to change <- Twitch API Limit Input
	handleSettingsInput = (e) => {
		if( e.target.value > 0 && e.target.value <= 100){
			this.setState( {settingsDummy: e.target.value} );
			return true;
		} else {
			return false;
		}
	}

	// Handles Settings Modal Close / Save -> Passed down as props to Settings Input Component
	handleSettingsSave = (e) => {
		if(e.target.dataset.type === 'cancel') {	
			this.toggleSettingsShow();
			this.setState( {settingsDummy: this.state.settingsNumber});
		} else if (e.target.dataset.type === 'save') {
			toast.info(`Settings saved successfully`,{
				autoClose: 1500,
			});
			this.toggleSettingsShow();
			this.setState ( {settingsNumber: this.state.settingsDummy},() => {
				localStorage.setItem('settingsNumber', this.state.settingsDummy);
				this.fetchStreams();
			});
		}
	}

	// Toggles Settings Visibility State -> Passes down as props
	toggleSettingsShow = () => {
		this.setState((prevState)=> {
			return {
				settingsShow: !prevState.settingsShow
			}
		})
	}

	// Handles Stream selection by the user -> Updates URL also -> Passed down as props to stream results page
	handleClickedStream = (stream, e) => {
		this.setState({
			channelId: e.target.dataset.id,
			stream: stream});
		this.props.history.push(`/channel?id=${e.target.dataset.id}`);
	}

	// Resets everything -> query = empty, results object becomes empty -> stream object becomes empty -> updates Path no Home
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

	// Fetches Stream Search Results debounced -> In order to not overload the Twitch API with incremental Search
	fetchStreams = debounce(() => {
		const {query, settingsNumber} = this.state;
		if(this.state.query !== '') {
			this.props.history.push(`/search?query=${this.state.query}`);
			TwitchAPI.searchStreams(query, settingsNumber)
			.then(res => 
				{
					this.setState({results: res.data, loading:false});
				}
			)
			.catch(
				err => {
					toast.error(`Error ${err.response.data.status} - ${err.response.data.error}`);
				}
			)
		}
	} ,1000)

	// Fetches Stream Information based on Channel ID -> Accessing Streams by shared link
	fetchSpecifStream = (channelId) => {
		TwitchAPI.getStreamById(channelId)
			.then(
				res => {
					if (res.data.stream === null) {
						toast.error(`Channel doesn't exist`);
						this.returnHome();
					} else {
						this.setState({
							stream:res.data.stream, 
							channelId:channelId,
							loading:false});
					}
				}
			)
			.catch(
				err => {
					toast.error(`Error ${err.response.data.status} - ${err.response.data.error}`);
				}
			)
	}

	// If the Search input is empty, the APP is restored to home status
	// Else Triggers the loading animation and fetches streams
	componentDidUpdate = (prevProps, prevState) => {
		if((prevState.query !== this.state.query || prevState.settingsNumber !== this.state.settingsNumber)) {
			if(this.state.query === '' && this.state.channelId === '') {
				this.returnHome();
			} else {
				this.setState({loading:true}, ()=>{
					this.fetchStreams();
				})
			}
		}
	}

	/*
		Fetches Local Storage Number of streams to watch. If it doesn't exists set's to twitch default - 25
		Parses the URL ->
			If it's a stream URL -> fetches specific stream information after setting the Number of Streams Setting
			If it's a search URL -> fetches streams based on query after setting the Number of Streams Setting
			If / -> sets Number of Streams Setting
	*/
	componentDidMount = () => {
		let localSettingsFetch = localStorage.getItem('settingsNumber') || 25;
		localSettingsFetch = {
			settingsNumber:localSettingsFetch,
			settingsDummy:localSettingsFetch
		}
		const parsed = queryString.parse(this.props.location.search);
		if(parsed.id) {
			this.setState(
				{...localSettingsFetch, channelId : parsed.id }, () => {
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
				state, handleClickedStream,
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

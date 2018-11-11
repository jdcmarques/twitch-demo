import React, { Component } from 'react'
import { StreamPage, LoadingAnimation } from "../../Utils/ImportsPresentation";
import * as TwitchAPI from '../../Utils/TwitchAPI';
export class StreamPageContainer extends Component {
  // Basic Stream Page Information
  state= {
    startedViewersUpdate: false,
    showChat: true,
    streamInfo:{
      game: '',
      name: '',
      streamer : '',
      viewers: '',
      logo: '',
    },
    loading:true,
  }
  
  // Toggles Between Showing / Hiding the chat Frame
  toggleChat = () => {
    this.setState((prevState, props) => {
      return {
        showChat : !prevState.showChat
      }
    });
  }
  // Fetches Stream Information -> Updates number of viewers on the State
  getUpdatedViewers = () => {
    TwitchAPI.getStreamById(this.props.channelId)
    .then(
          res => {
            this.setState({streamInfo:{
              ...this.state.streamInfo,
              viewers: res.stream.viewers
            }});
          }
      )
      .catch(
        err => {
          console.log(err);
        }
      );
      
  }

  // If the component receives a channelId -> Parses the stream information
  componentDidMount = () => {
    if(this.props.channelId !== '') {
      this.parseStream();
    }
  }
  // If the component receives a different channelId or not '' -> Parses the stream information
  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.channelId !== this.props.channelId) {
      this.parseStream();
    }
  }

  // Stops the Viewer Updater function
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Receives a Stream Information object from Twitch API -> Retrieves needed information -> Starts viewer number updater on a 3 seconds loop
  parseStream = () => {
    const {stream} = this.props;
    this.setState({
      streamInfo: {
        game: stream.game,
        name: stream.channel.status,
        streamer : stream.channel.name,
        viewers: stream.viewers,
        logo: stream.channel.logo,
      },
      videoUrl: `https://player.twitch.tv/?channel=${stream.channel.name}&muted=true&autoplay=true`,
      chatUrl:  `https://www.twitch.tv/embed/${stream.channel.name}/chat`,
      loading:false,
    })
    this.interval = setInterval(this.getUpdatedViewers, 3000);
  }

  render() {
    const streamDescriptionProps = {
      ...this.state.streamInfo,
      toggleChat:this.toggleChat,
      showChat:this.state.showChat
    };
    const streamPageProps = {
      streamDescriptionProps: streamDescriptionProps,
      showChat:this.state.showChat,
      streamInfo:this.state.streamInfo,
      videoUrl: this.state.videoUrl, 
      chatUrl: this.state.chatUrl
    }
    return (
      <div>
        {this.state.loading && <LoadingAnimation></LoadingAnimation>}
        <StreamPage {...streamPageProps}></StreamPage>
      </div>
    )
  }
}

export default StreamPageContainer


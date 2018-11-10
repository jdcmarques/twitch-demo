import React, { Component } from 'react'
import { StreamPage } from "../../Utils/ImportsPresentation";
import * as TwitchAPI from '../../Utils/TwitchAPI';
export class StreamPageContainer extends Component {
  state= {
    startedViewersUpdate: false,
    showChat: true,
    streamInfo:{
      game: '',
      name: '',
      streamer : '',
      viewers: '',
      logo: '',
    }
  }
  
  toggleChat = () => {
    this.setState((prevState, props) => {
      return {
        showChat : !prevState.showChat
      }
    });
  }

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

  componentDidMount = () => {
    if(this.props.channelId !== '') {
      this.parseStream();
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.channelId !== this.props.channelId) {
      this.parseStream();
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
      chatUrl:  `https://www.twitch.tv/embed/${stream.channel.name}/chat`
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
      <StreamPage {...streamPageProps}></StreamPage>
    )
  }
}

export default StreamPageContainer


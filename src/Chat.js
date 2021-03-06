import React from 'react';
import io from 'socket.io-client';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.socket = io('localhost:8080');

    // the client side catch 'RECEIVE_MESSAGE' emit from server side and add the message to the messages array
    this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    })

    const addMessage = data => {
      console.log(data)
      this.setState({messages: [...this.state.messages, data]})
      console.log(this.state.messages)
    }

    // sending the message to the server every time you click ‘Send Message’
    this.sendMessage = event => {
      event.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({message: ''})
    }
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title'>
                  Global Chat
                </div>
                <hr />
                <div className='messages'>
                  { this.state.messages.map((message, index) => {
                    return (
                      <div key={index}>{message.author}: {message.message}</div>
                    )
                  })}
                </div>
              </div>
              <div className='card-footer'>
                <input type='text' placeholder='Username' value={this.state.username} onChange={event => this.setState({username: event.target.value})} className='form-control' />
                <br />
                <input type='text' placeholder='Message' value={this.state.message} onChange={event => this.setState({message: event.target.value})} className='form-control' />
                <br />
                <button onClick={this.sendMessage} className='btn btn-primary form-control'>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat;

import React, {Component} from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';

class App extends Component{
    constructor(){
        super();
        this.state={
            messages:[]
        }
    }
    componentDidMount(){
        this.socket =io('/');
        this.socket.on('message',message=>{
            this.setState({
                messages:[message, ...this.state.messages]
            })
        });
    }
    handleSubmit(event){
        const body= event.target.value;
        if (event.keyCode == 13 && body){
            const message={
                body,
                from:'me'
            }
            this.setState({messages:[message, ...this.state.messages]})
            this.socket.emit('message',body);
            event.target.value="";
        }
        
    }
    render(){
        const messages = this.state.messages.map((message,index)=>{
            return (
                <li key={index}>
                    <b>{message.from} : {message.body}</b>
                </li>
            )
        });
        return (
            <div>
                <h1> React Works</h1>
                <input type="text" placeholder="Insert A message" onKeyUp={this.handleSubmit.bind(this)}
                />
                <ul>
                    {messages}
                </ul>
            </div>

        );
    }
}
render(<App/>, document.getElementById('app'));
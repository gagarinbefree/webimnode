import React from 'react';
import Friend from './Friend';
import Server from './Server';

class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {userId: props.userId, friends: []}
    }

    render() {
        return <React.Fragment>
            {this.state.friends.map((item, index) => {
                    return <Friend key={item.id} 
                        id={item.id} 
                        firstName={item.first_name} 
                        lastName={item.last_name} 
                        online={item.online} 
                        photo={item.photo_50}
                    />
                })
            }
        </React.Fragment>
    }    

    async componentDidMount() {
        await this.getFriends();
    }

    async getFriends() {        
        let data = await Server.getUserFriends(this.state.userId);

        this.setState({friends: data.friends});
    }
}

export default Friends;
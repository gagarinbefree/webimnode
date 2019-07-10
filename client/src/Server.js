class Server {
    static domain = 'https://webimnode.herokuapp.com';

    static async login(username, password) {
        const response = await fetch(this.domain + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'text/plain',
            }
        });
        
        return await response.json();  
    }

    static async getUserPhoto(userId) {
        const response = await fetch(this.domain + '/users/' + userId + '/photo', {
            method: 'GET',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'text/plain',
            }
        });
        
        return await response.json(); 
    }

    static async getUserFriends(userId) {
        const response = await fetch(this.domain + '/users/' + userId + '/friends/5', {
            method: 'GET',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'text/plain',
            }
        });
        
        return await response.json();
    }
}

export default Server;
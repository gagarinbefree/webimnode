class Server {
    static async login(username, password) {
        const response = await fetch('http://localhost:3001/auth/login', {
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
        const response = await fetch('http://localhost:3001/users/photo/' + userId, {
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
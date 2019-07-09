import React from 'react';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Server from './Server';

class VkAuth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="modal fade show" tabindex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    <div className="modal-header alert-primary">
                        <h6 className="modal-title">Войти с помощью ВКонтакте</h6>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <input ref={(nameInput) => { this.nameInput = nameInput }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Телефон или email" autoFocus />
                            </div>
                            <div className="form-group">
                                <input ref={(passwordInput) => { this.passwordInput = passwordInput }} type="password" className="form-control" id="exampleInputPassword1" placeholder="Пароль" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={async () => await this.login()}>Войти</button>
                    </div>
                </div>
            </div>
        </div>
    }

    async login() {
        let username = this.nameInput.value;
        let password = this.passwordInput.value;

        try
        {
            let user = await Server.login(username, password);
            let photo = await Server.getUserPhoto(user.user_id);

            this.props.login(username, user.user_id, user.first_name, user.last_name, photo.photo);
        }
        catch(e) {            
            this.props.logout();
        }
    }
}

export default VkAuth;
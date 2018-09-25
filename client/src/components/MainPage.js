import React , { Component } from 'react';

class MainPage extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <label>
                    ID : <input type="text" 
                                value={this.props.info.id}
                                onChange={this.props.onIdChange}/>

                    Password : <input   type="password" 
                                        value={this.props.info.password}
                                        onChange={this.props.onPwChange} />
                </label>
                <input type="submit" value="Submit" />
            </form> 
        );
    }
}

export default MainPage;
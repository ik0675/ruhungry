import React, { Component } from 'react';
import './css/SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      name: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    })
  }

  handleIDChange(e) {
    this.setState({
      id: e.target.value,
    })
  }

  handlePWChange(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleSubmit() {
    this.props.onSubmit(this.state);
    this.setState({
      id: '',
      password: '',
      name: '',
    });
  }

  render() {
      return (
          <div className="sign">
              <button className='btn btn-md btn-info btn-block'
                      type="submit"
                      onClick={this.props.onToggle}>
                      회원가입
              </button>
                {this.props.info.isToggleOn &&
                  <div className="form-group">
                      <input  placeholder="이름"
                              type="text"
                              className='form-control'
                              onChange={this.handleNameChange}
                              value={this.state.name} />

                      <input  placeholder="Email"
                              type="text"
                              className='form-control'
                              onChange={this.handleIDChange}
                              value={this.state.id} />

                      <input  placeholder="Password"
                              type="password"
                              className='form-control'
                              onChange={this.handlePWChange}
                              value={this.state.password} />

                      <button className='btn btn-md btn-secondary btn-block'
                              onClick={this.handleSubmit} >
                          제출
                      </button>
                  </div>
              }
          </div>
      );
  }
}

export default SignUp;

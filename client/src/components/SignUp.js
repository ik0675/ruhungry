import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
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
                                className='form-control'/>
                        <input  placeholder="이메일주소"
                                className='form-control'/>
                        <input  placeholder="암호"
                                className='form-control'/>
                        <button className='btn btn-md btn-default btn-block'>
                            제출
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default SignUp;
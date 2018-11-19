import React from 'react';
import logo from './../login/hungry.jpg';

import 울프강 from './울프강.jpeg';
import 쉑쉑 from './쉑쉑.jpeg';
import 새마을식당 from './새마을식당.jpg';

import './css/Posts.css';

const Posts = () => {
      return (
            <div className="container">
                  {/* <div className="card d-block">
                        <div className="row">
                              <img src={울프강} className="img-fluid" alt=""></img>
                              <img src={logo} className="img-fluid" alt=""></img>
                              <div className="card-body">
                                    <h4 className="card-title">울프강 스테이크 하우스</h4>
                                    <p className="card-text">김규원 님께서 점심먹기를 요청하셨습니다</p>
                                    <a href="#" className="btn btn-outline-success btn-md">허락</a>
                                    <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                              </div>
                        </div>
                  </div>

                  <div className="card d-block">
                        <div className="row no-gutters">
                              <div className="col-auto">
                                    <img src={쉑쉑} className="img-fluid" alt=""></img>
                                    <img src={logo} className="img-fluid" alt=""></img>
                              </div>
                              <div className="col">
                                    <div className="card-body">
                                          <h4 className="card-title">Title</h4>
                                                <p className="card-text">Description</p>
                                          <a href="#" className="btn btn-outline-success btn-md">허락</a>
                                          <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="card d-block">
                        <div className="row no-gutters">
                              <div className="col-auto">
                                    <img src={새마을식당} className="img-fluid" alt=""></img>
                                    <img src={logo} className="img-fluid" alt=""></img>
                              </div>
                              <div className="col">
                                    <div className="card-body">
                                          <h4 className="card-title">Title</h4>
                                                <p className="card-text">Description</p>
                                          <a href="#" className="btn btn-outline-success btn-md">허락</a>
                                          <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                                    </div>
                              </div>
                        </div>
                  </div> */}
                  <div className="column">
                        <div className="row">
                              <div className="card">
                                    <div className="img-fluid">
                                          <img className="temp" src={울프강}></img>
                                          <img className="temp" src={logo}></img>
                                          <div className="card-body">
                                                <a href="#" className="btn btn-outline-success btn-md">허락</a>
                                                <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                                          </div>
                                    </div>
                                    
                              </div>
                        </div>
                        
                  </div>

                  <div className="column">
                        <div className="row">
                              <div className="card">
                                    <div className="image">
                                          <img className="temp" src={쉑쉑}></img>
                                          <img className="temp" src={logo}></img>
                                          <div className="card-body">
                                                <a href="#" className="btn btn-outline-success btn-md">허락</a>
                                                <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                                          </div>
                                    </div>
                                    
                              </div>
                        </div>
                        
                  </div>

                  <div className="column">
                        <div className="row">
                              <div className="card">
                                    <div className="image">
                                          <img className="temp" src={새마을식당}></img>
                                          <img className="temp" src={logo}></img>
                                          <div className="card-body">
                                                <a href="#" className="btn btn-outline-success btn-md">허락</a>
                                                <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                                          </div>
                                    </div>
                                    
                              </div>
                        </div>
                        
                  </div>
                  
            </div>
      );
};

export default Posts;
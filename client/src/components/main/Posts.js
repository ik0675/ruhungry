import React from 'react';
import logo from './../login/hungry.jpg';

import './css/Posts.css';

const Posts = () => {
      return (
            <div className="container">
                  <div className="card d-block">
                        <div className="row no-gutters">
                              <div className="col-auto">
                                    <img src={logo} className="img-fluid" alt=""></img>
                                    <img src={logo} className="img-fluid" alt=""></img>
                              </div>
                              <div className="col">
                                    <div className="card-body">
                                          <h4 className="card-title">울프강 스테이크 하우스</h4>
                                                <p className="card-text">김규원 님께서 점심먹기를 요청하셨습니다</p>
                                          <a href="#" className="btn btn-outline-success btn-md">허락</a>
                                          <a href="#" className="btn btn-outline-danger btn-md">거절</a>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="card d-block">
                        <div className="row no-gutters">
                              <div className="col-auto">
                                    <img src={logo} className="img-fluid" alt=""></img>
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
                                    <img src={logo} className="img-fluid" alt=""></img>
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
            </div>
      );
};

export default Posts;
import React from 'react';
import logo from './../login/hungry.jpg';

const Posts = () => {
      return (
            <div>
                  <div className="card">
                  <div className="card-body d-flex">
                        <div className="w-50 text-left">
                              <img className="" src={logo} alt="sans" width="200px"/>
                        </div> 
                        <div className="w-50 text-right">
                              <h5 className="card-title">Title</h5>
                              <p className="card-text">Some text ehre</p>
                              <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                  </div>
                  </div>
                  <div className="card">
                  <div className="card-body d-flex">
                        <div className="w-50">
                              <h5 className="card-title">Title</h5>
                              <p className="card-text">Some text ehre</p>
                              <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        <div className="w-50 text-right">
                              <img className="" src={logo} alt="sans" width="200px"/>
                        </div>
                  </div>
                  </div>
                  <div className="card">
                  <div className="card-body d-flex">
                        <div className="w-50">
                              <h5 className="card-title">Title</h5>
                              <p className="card-text">Some text ehre</p>
                              <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        <div className="w-50 text-right">
                              <img className="" src={logo} alt="sans" width="200px"/>
                        </div>
                  </div>
                  </div>
            </div>
      );
};

export default Posts;
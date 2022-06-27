import React, { Component } from 'react'

export class About extends Component {
  render() {
    return (
      <div>
        <div className=" container card mb-3 my-5 bg-primary" >
  <div className="row g-0">
    {/* <div className="col-md-4">
      <img src="..." className="img-fluid rounded-start" alt="...">
    </div> */}
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">About Us</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-muted">Copy Right |2022@reserve</small></p>
      </div>
    </div>
  </div>
</div>
      </div>
    )
  }
}

export default About

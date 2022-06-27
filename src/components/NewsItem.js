import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
      let {title,description,imgUrl,newsUrl,publish}=this.props
    return (
      <div>
        <div className="card mb-3 my-3" key={newsUrl} >
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                  {description}
                </p>
                <a href={newsUrl} className="link-primary">Read More</a>
                <p className="card-text">
                  <small className="text-muted">Published At {new Date(publish).toGMTString()}</small>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={imgUrl}
                className="img-fluid rounded-start"
                alt="..."
                style={{height:"100%" ,width:"100%"}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

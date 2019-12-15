import React from "react";
import { connect } from "react-redux";

import { imageDownload } from "../../actions";

class PhotosMin extends React.Component {
  componentDidMount() {
    this.props.imageDownload();
  }

  renderImageList = () => {
    return this.props.images.map(image => {
      return (
        <div className="image2" key={image}>
          <img
            src={`/uploads/${image}`}
            className=""
            alt="foto"
            width="60px"
            height="60px"
          />
        </div>
      );
    });
  };
  render() {
    return (
      <>
        <div className="blockHeader">
          <h1>Photos</h1>
        </div>
        <div className="grid-container">
          {this.renderImageList().slice(0, 4)}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { images: state.user.uploadedImages, id: state.user.userId };
};

export default connect(mapStateToProps, { imageDownload })(PhotosMin);

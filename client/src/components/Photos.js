import React from "react";
import { connect } from "react-redux";

import HomeButton from "./HomeButton";
import { onImageSubmit, imageDownload, deletePhoto } from "../actions";

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.imageInput = React.createRef();
  }

  renderImageList = () => {
    return this.props.images.map(image => {
      return (
        <div className="image" key={image}>
          <img
            src={`/uploads/${image}`}
            className=""
            alt="foto"
            width="280px"
            height="280px"
          />
          <button
            onClick={() => this.props.deletePhoto(image)}
            className="photoDeleteBtn"
          ></button>
        </div>
      );
    });
  };

  componentDidMount() {
    this.props.imageDownload();
  }
  componentDidUpdate(preProps) {
    if (preProps.images.length !== this.props.images.length) {
      this.props.imageDownload();
    }
  }

  picUpload = () => {
    const fd = new FormData();
    fd.append("image", this.imageInput.current.files[0]);
    this.props.onImageSubmit(fd);
  };

  render() {
    return (
      <>
        <HomeButton />
        <h1 className="photosHeading">Photos</h1>
        <div className="imageFlex">
          <label className="imageUpload" htmlFor="imageUpload"></label>
          <input
            className="imageContainer"
            name="image"
            id="imageUpload"
            type="file"
            accept="image/*"
            ref={this.imageInput}
            onChange={this.picUpload}
          />
          {this.renderImageList()};
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return { images: state.user.uploadedImages, id: state.user.userId };
};
export default connect(mapStateToProps, {
  onImageSubmit,
  imageDownload,
  deletePhoto
})(Photos);

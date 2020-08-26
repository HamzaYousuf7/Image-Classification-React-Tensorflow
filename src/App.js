import React, { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

import Navbar from "./components/Navrbar/Navrbar";
import "./App.css";
import Spinner from "./components/UI/Spinner/Spinner";

const App = () => {
  //STATE
  const [imgPreviewS, setimgPreviewS] = useState();
  const [modalS, setmodalS] = useState(null);
  const [classifiedResultS, setclassifiedResultS] = useState();
  const [isLoadingS, setisLoadingS] = useState(false);

  //Ref of html tag
  const imgTagRef = useRef();
  const fileTagRef = useRef();

  //Loading the model
  const loadModel = async () => {
    setisLoadingS(true);
    // Load the model.
    const model = await mobilenet.load();
    setmodalS(model);
    setisLoadingS(false);
    console.log("model is ready", model);
  };

  //img handler also set img preview
  const imagePickHandler = (event) => {
    const img = event.target.files[0];

    if (!img) return;

    const imgURL = URL.createObjectURL(img);
    console.log(img);
    setimgPreviewS(imgURL);
  };

  //classifying the img
  const classifyingImg = async () => {
    setisLoadingS(true);
    // Classify the image.
    const predictions = await modalS.classify(imgTagRef.current);

    console.log("Predictions: ");
    console.log(predictions);
    setclassifiedResultS(predictions);
    setisLoadingS(false);
  };

  return (
    <div>
      <Navbar />
      {isLoadingS && <Spinner />}

      {!isLoadingS && (
        <div className="container ">
          {/**STEP 1 LOAD MODEL */}
          {!modalS && (
            <div className="row">
              <h1>
                Load the model and let the fun beggin:
                <button
                  className="btn btn-info btn-lg"
                  style={{ marginLeft: "15px" }}
                  onClick={loadModel}
                >
                  <i className="glyphicon glyphicon-cloud-download"></i> LOAD
                  MODEL
                </button>
              </h1>
            </div>
          )}

          {/**STEP 2 Chosse file */}
          {modalS && (
            <div className="row">
              <div className="col-xs-4 input-group " style={{ margin: "15px" }}>
                <span className="input-group-addon ">
                  <i className="glyphicon glyphicon-upload "></i>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={imagePickHandler}
                  ref={fileTagRef}
                  className="form-control"
                />
              </div>

              {imgPreviewS && (
                <React.Fragment>
                  {/**IMGE PREIVEW SECTION */}
                  <img
                    className="img-thumbnail"
                    src={imgPreviewS}
                    ref={imgTagRef}
                    alt="img preview"
                    width="250px"
                    height="200px"
                  />
                  <button
                    className="btn btn-info btn-lg"
                    style={{ marginLeft: "15px" }}
                    onClick={classifyingImg}
                  >
                    <i className="glyphicon glyphicon-cog"></i> Classified
                  </button>
                </React.Fragment>
              )}
            </div>
          )}

          {/**STEP 3 LOAD MODEL */}
          {classifiedResultS && (
            <div className="row" style={{ margin: "15px" }}>
              {classifiedResultS.map((singlePrediction, index) => (
                <div className="panel panel-info" key={index} style={{ marginBottom: "15px" }}>
                  <div className="panel-heading">
                    Classified as {singlePrediction.className}
                  </div>
                  <div className="panel-body" >
                    Percentage:%
                    {(singlePrediction.probability * 100).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

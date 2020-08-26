import React, { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

const App = () => {
  //STATE
  const [imgPreviewS, setimgPreviewS] = useState();
  const [modalS, setmodalS] = useState(null);
  const [predictionResultS, setpredictionResultS] = useState([]);

  //Ref of html tag
  const imgTagRef = useRef();
  const fileTagRef = useRef();

  //Loading the model
  const loadModel = async () => {
    // Load the model.
    const model = await mobilenet.load();
    setmodalS(model);
    console.log("nothing", model);
  };

  //img handler also set img preview
  const imagePickHandler = (event) => {
    const img = event.target.files[0];
    const imgURL = URL.createObjectURL(img);
    console.log(img);
    setimgPreviewS(imgURL);
  };

  //classifying the img
  const classifyingImg = async () => {
    // Classify the image.
    const predictions = await modalS.classify(imgTagRef.current);

    console.log("Predictions: ");
    console.log(predictions);
    setpredictionResultS(predictions);
  };
  return (
    <div>
      <button onClick={loadModel}>Load the model</button>
      <input
        type="file"
        accept="image/*"
        onChange={imagePickHandler}
        ref={fileTagRef}
      />
      {imgPreviewS && (
        <img
          src={imgPreviewS}
          ref={imgTagRef}
          alt="img preview"
          width="150px"
          height="150px"
        />
      )}

      <button onClick={classifyingImg}>now predicti</button>

      {predictionResultS && (
        <ul>
          {predictionResultS.map((singlePred, index) => (
            <React.Fragment key={index}>
              <li >{singlePred.className}</li>
              <li>{(singlePred.probability * 100).toFixed(2)}</li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

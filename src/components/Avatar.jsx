import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch } from 'react-redux';
// import './App.css';
import { setImage } from '../redux/actions'
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function CropForm() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [state, setState] = useState({
    src: null,
    crop: {
      unit: 'px', // default, can be 'px' or '%'
      x: 130,
      y: 50,
      width: 200,
      height: 200,
      aspect: 1 / 1,
    },
  });
  const [imageRef, setImageRef] = useState(null);
  const [url, setUrl] = useState(null);
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setState({ ...state, src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // If you setState the crop in here you should return false.
  function onImageLoaded(image) {
    setImageRef(image)
  };
  function onCropComplete(crop) {
    makeClientCrop(crop);
  };
  function onCropChange(crop, percentCrop) {
    // You could also use percentCrop:
    // setState({ crop: percentCrop });
    setState({ ...state, crop });
  };
  async function makeClientCrop(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg'
      );
      setState({ ...state, croppedImageUrl });
    }
  }
  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    console.log(ctx.drawImage);
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const dataUrl = canvas.toDataURL();
    setUrl(dataUrl)
    dispatch(setImage(dataUrl))
  }
  const { crop, croppedImageUrl, src = 'http://localhost:3000/no-photo.jpg' } = state;
  return (
    <div className="App">
      <div>
        Добавить фото<input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={onSelectFile} />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>


        {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          )}</Grid>
        <Grid item xs={12} sm={6}>
          {url ? <img alt="Crop" /* style={{ maxWidth: '100%' }} */ src={url} /> : <></>}
        </Grid></Grid>
    </div>
  );
}

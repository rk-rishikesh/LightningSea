import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/Provider';
import { NFTStorage } from 'nft.storage';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from './Loader';

const theme = createTheme();

function Upload() {
  const inputFilePropertyRef = useRef(null);
  const [propertyImage, setPropertyImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const store = useStore();

  function inputPropertyImageHandler(e) {
    inputFilePropertyRef.current.click();
    console.log(e.target.files[0]);
    setPropertyImage(e.target.files[0]);
  }

  async function IPFSupload(data, file) {
    try {
      setLoading(true);
      const client = new NFTStorage({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYxMjRGNzViYzgwMWE1MmVENTkxQzRBNjVkRWVjMEUxMkVjZTgxRGEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDEzMDQ4NzAyMiwibmFtZSI6IjNFc3RhdGVzIn0.6GtIH1dEXlOzT4YyTdTQaltFLtuMhn5fWLZrPZ_xthY',
      });
      console.log(new File([file], file.name, { type: file.type }));
      console.log(data);
      const metadata = await client.store({
        name: data.name,
        description: data.description,
        image: new File([file], file.name, { type: file.type }),
      });
      console.log(metadata.data.image.href);
      const image = metadata.data.image.href;
      return "https://ipfs.io/ipfs/" + image.slice(7);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const uploadMetadata = async (name, description, image) => {
    console.log('== Uploading Metadata == ');
    console.log(name);
    console.log(description);
    console.log(image);
    const metadataUrl = await IPFSupload(
      {
        name: name,
        description: description,
      },
      image,
    );
    console.log(metadataUrl);

    return metadataUrl;
  };

  const listNFT = async event => {
    event.preventDefault();
    let uri = await uploadMetadata(title, description, propertyImage);
    store.createPost(title, description, uri);
  };

  if (loading) {
    return <Loader/>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <br/>
        <Grid container component="main" sx={{ height: '80vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://cdn.dribbble.com/users/31664/screenshots/1034325/cameras.gif)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: t =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img style={{width:"25%"}} src="https://images.squarespace-cdn.com/content/v1/600da8ef276d9d4dbba3513d/1630504554936-GA5NKS8OV2S7ELJGSQ6Q/Reduce_kWh_Usage.gif"></img>
              <Typography component="h1" variant="h5">
                Asset Details
              </Typography>
              <Box component="form" noValidate onSubmit={listNFT} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  onChange={e => setTitle(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  autoComplete="current-description"
                  onChange={e => setDescription(e.target.value)}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <input
                    ref={inputFilePropertyRef}
                    type="file"
                    id="icon-button-file"
                    hidden
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => inputPropertyImageHandler(e)}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddAPhotoIcon />
                    </IconButton>
                  </label>
                </div>
                <button type="submit"
                  style={{
                    width: '400px',
                    height: '40px',
                    backgroundColor: '#e20074',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize:'20PX'
                  }}>
                  Generate NFT
                  </button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default Upload;

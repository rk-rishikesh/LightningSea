import axios from 'axios';

export const get_http_optionsfunction = (taro_host, macroon) => {
  const cliConfig = config[clientStr];
  const MACAROON_PATH = cliConfig['MACAROON_PATH'];
  const HTTP_HOST = cliConfig['HTTP_HOST'];
  return {
    baseURL: `https://${taro_host}/v1/taro/`,
    // Work-around for self-signed certificates.
    //rejectUnauthorized: false,
    responseType: 'json',
    headers: {
      'Grpc-Metadata-macaroon': macroon.toString('hex'),
    },
  };
};

export const mintAsset = async (
  taro_host,
  macroon,
  name,
  metadata,
  amount = 1,
  asset_type = 'COLLECTIBLE',
  enable_emission = false,
  skip_batch = true,
) => {
  try {
    let config = get_http_optionsfunction(taro_host, macroon);
    let requestBody = {
      asset_type: asset_type,
      name: name,
      meta_data: Buffer.from(JSON.stringify(metadata)).toString('base64'),
      amount: amount,
      enable_emission: enable_emission,
      skip_batch: skip_batch,
    };
    const res = await axios.post('assets', requestBody, config);
    console.log('Response minting asset: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error mininting asset', error);
    throw error;
  }
};


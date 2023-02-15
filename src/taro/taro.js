import axios from 'axios';
import {Buffer} from 'buffer';

export const get_http_optionsfunction = (macroon) => {
//   const cliConfig = config[clientStr];
//   const MACAROON_PATH = cliConfig['MACAROON_PATH'];
//   const HTTP_HOST = cliConfig['HTTP_HOST'];
const taro_host = 'localhost:3005'
  return {
    baseURL: `http://${taro_host}/`,
    // Work-around for self-signed certificates.
    //rejectUnauthorized: false,
    responseType: 'json',
    // headers: {
    //   'Grpc-Metadata-macaroon': macroon.toString('hex'),
    // },
    // httpAgent: new https.Agent({
    //   rejectUnauthorized: false,
    // }),
    // httpsAgent: new https.Agent({
    //   rejectUnauthorized: false,
    // })
  };
};


export const mintAsset = async (
  host, //tarohost
  macaroon,
  name,
  metadata,
  amount = 1,
  asset_type = 'COLLECTIBLE',
  enable_emission = false,
  skip_batch = true,
) => {
  try {
    let config = get_http_optionsfunction(macaroon);
    let requestBody = {
      asset_type: asset_type,
      asset_name: name,
      asset_metadata: Buffer.from(JSON.stringify(metadata)).toString('base64'),
      asset_amount: amount,
      macaroon: '0201047461726f026f030a10fb20b6a94d177ae17a1cb5cd7cfe762a1201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f66731204726561641205777269746500000620a615ad8cd6a1a8d3d8edebd5bd2885f8942bb6fc32e9386313fcd4606cd81e7a',
      host: host

    };
    const res = await axios.post('mint-assets', requestBody, config);
    console.log('Response minting asset: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error mininting asset', error);
    throw error;
  }
};

export const listAsset = async (
  host, //tarohost
  macaroon
) => {
  try {
    const res = await axios.get('http://localhost:3005/list-assets/',{
      params: {
        macaroon: '0201047461726f026f030a10fb20b6a94d177ae17a1cb5cd7cfe762a1201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f66731204726561641205777269746500000620a615ad8cd6a1a8d3d8edebd5bd2885f8942bb6fc32e9386313fcd4606cd81e7a',
        host: host
      }
    });
    console.log('Response listing asset: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error listing balance', error);
    throw error;
  }
};


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
  asset_type = 'collectible',
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
      macaroon: '0201047461726f026f030a1067c0ca18671ae585ce6e2ade565056f11201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f6673120472656164120577726974650000062026a8eaf6e825686844e6ec7b7434c5d6a8cc2d3fcf019a84ce4395fe0d134b18',
      host: host

    };
    console.log("Newbie")
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
        macaroon: '0201047461726f026f030a1067c0ca18671ae585ce6e2ade565056f11201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f6673120472656164120577726974650000062026a8eaf6e825686844e6ec7b7434c5d6a8cc2d3fcf019a84ce4395fe0d134b18',
        host: 'localhost:8089'
      }
    });
    console.log('Response listing asset: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error listing balance', error);
    throw error;
  }
};


export const newAddress = async (
  host, //tarohost
  macaroon,
  genesis_bootstrap_info,
  amount = 1
) => {
  try {
    let config = get_http_optionsfunction(macaroon);
    let requestBody = {
      genesis_bootstrap_info: 'Pwwdy5QueJKBjCh9ssUXeb0ug/TUMgR8m2WggXmf+JwAAAABDFVsdGltYXRlMDF4MRBmYW50eGFzdGljIG1vbmV5AAAAAAE=',
      asset_amount: amount,
      macaroon: '0201047461726f026f030a109bd248fa9a125b9703b28b7c83508f011201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f667312047265616412057772697465000006205ddebd8cc3634fd8d4426d0d5d4bebaf0a5ba0d6ccb8b63318f7e9963e572122',
      host: 'localhost:8091'

    };
    const res = await axios.post('new-address', requestBody, config);
    console.log('Response generating address: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error generating address', error);
    throw error;
  }
};

export const sendAsset = async (
  host, //tarohost
  macaroon,
  asset_address
) => {
  try {
    let config = get_http_optionsfunction(macaroon);
    let requestBody = {
      asset_address: asset_address,
      macaroon: '0201047461726f026f030a1067c0ca18671ae585ce6e2ade565056f11201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f6673120472656164120577726974650000062026a8eaf6e825686844e6ec7b7434c5d6a8cc2d3fcf019a84ce4395fe0d134b18',
      host: 'localhost:8089'

    };
    const res = await axios.post('send-assets', requestBody, config);
    console.log('Response sending asset: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error sending asset', error);
    throw error;
  }
};

// from seller - alice
export const exportProof = async (
  host, //tarohost
  macaroon,
  asset_id,
  script_key
) => {
  try {
    let config = get_http_optionsfunction(macaroon);
    let requestBody = {
      asset_id: asset_id,
      script_key: script_key,
      macaroon: '0201047461726f026f030a1067c0ca18671ae585ce6e2ade565056f11201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f6673120472656164120577726974650000062026a8eaf6e825686844e6ec7b7434c5d6a8cc2d3fcf019a84ce4395fe0d134b18',
      host: 'localhost:8089'

    };
    const res = await axios.post('export-asset-proof', requestBody, config);
    console.log('Response exporting asset proof: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error exporting asset proof', error);
    throw error;
  }
};

// from buyer - bob
export const importProof = async (
  host, //tarohost
  macaroon,
  raw_proof,
  genesis_point
) => {
  try {
    let config = get_http_optionsfunction(macaroon);
    let requestBody = {
      raw_proof: raw_proof,
      genesis_point: genesis_point,
      macaroon: '0201047461726f026f030a109bd248fa9a125b9703b28b7c83508f011201301a180a09616464726573736573120472656164120577726974651a150a06617373657473120472656164120577726974651a0f0a066461656d6f6e120577726974651a150a0670726f6f667312047265616412057772697465000006205ddebd8cc3634fd8d4426d0d5d4bebaf0a5ba0d6ccb8b63318f7e9963e572122',
      host: 'localhost:8091'

    };
    const res = await axios.post('import-asset-proof', requestBody, config);
    console.log('Response importing asset proof: ', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log('Error importing asset proof', error);
    throw error;
  }
};
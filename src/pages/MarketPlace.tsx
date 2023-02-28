import React, { useEffect, useState, useCallback } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import PayModal from '../components/PayModal';
import PostCard from '../components/PostCard';
import { useStore } from '../store/Provider';
import { Badge, Card } from 'react-bootstrap';
import { Post } from '../shared/types';
import VerifyButton from '../components/VerifyButton';
import VoteButton from '../components/VoteButton';
import { newAddress, listAsset, sendAsset, importProof, exportProof } from '../taro/taro.js';

const MarketPlace: React.FC = () => {
  const store = useStore();

  const [postImage, setPostImage] = useState<String[]>([]);
  const [postDesc, setPostDesc] = useState<String[]>([]);
  const [postGen, setPostGen] = useState<String[]>([]);
  const parseURL = async (url: any) => {
    const data = await fetch(url);
    const json = await data.json();
    console.log(json);
    return json;
  };

  const getProductDescription = async (url: any) => {
    let metadata = await parseURL(url);
    let desc = metadata.description;
    desc = desc.toString();
    return desc;
  };

  const getProductImage = async (url: any) => {
    let imageURL = await parseURL(url);
    let image = imageURL.image;
    image = image.toString();
    return 'https://ipfs.io/ipfs/' + image.slice(7);
  };

  const buyNFT = async (post: any, id: any) => {
    const x = await store.showPaymentRequest(post);
    console.log(x)
    console.log(id)
    console.log(store.tarohost)
    console.log(store.macaroon)
    const newAdd = await newAddress(
      store.tarohost,
      store.macaroon,
      "yhAg9Q5LrdCvQqYGpbk3QtXGFeE49bUtkACMH4rV4C0AAAABBnJrMDEyNA5mYW50YXN0aWMgcGFpcwAAAAAB"
    );
    console.log('New Address : ', newAdd);
    console.log("Asset ID : ", newAdd.asset_id)
    console.log("Script Key : ", newAdd.script_key)
    const asset = await sendAsset(
        store.tarohost,
        store.macaroon,
        newAdd.encoded
      );

    // console.log(asset.transfer_txid.taro_transfer.new_outputs[1].asset_id);

    const exportt = await exportProof(
      store.tarohost,
      store.macaroon,
      newAdd.asset_id,
      newAdd.script_key
    );

    console.log(exportt);  

    // const importt = await importProof();

    // console.log(importt);
  };

  useEffect(() => {
    const fetchData = async () => {
      let postImage: string[] = [];
      let postDesc: string[] = [];
      let postGen: string[] = [];
      console.log(store.tarohost)
      let list = await listAsset(store.tarohost, store.macaroon);
      console.log(list);
      for (var i = 0; i < store.posts.length; i++) {
        const x = await getProductImage(store.posts[i].content);
        const y = await getProductDescription(store.posts[i].content);
        const z = list.assets[i].asset_genesis.genesis_bootstrap_info;
        postImage.push(x);
        postDesc.push(y);
        postGen.push(z);
      }

      console.log(postImage);
      console.log(postGen);
      setPostImage(postImage);
      setPostDesc(postDesc);
      setPostGen(postGen);
    };
    fetchData();
  }, []);

  if (store.posts.length === 0) {
    return (
      <>
        <div>
          <hr />
          <h3
            className="heading"
            style={{ color: '#e20074', fontSize: '40px', fontFamily: 'serif' }}
          >
            Marketplace
          </h3>
          <hr />
        </div>
        <div className="row">
          {' '}
          <img
            src="https://uploads-ssl.webflow.com/5fa27c3574b213fae018d63e/61db77ae62249315c10cf2d3_animation_500_kxszguql.gif"
            style={{
              marginLeft: '35%',
              borderRadius: '50%',
              width: '25%',
              marginTop: '7%',
            }}
          />
        </div>

        <div>
          <label style={{ margin: '30px 0px 0px 230px' }}>
            No Posts Found ! Create first post now !
          </label>{' '}
          <br />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <hr />
        <h3
          className="heading"
          style={{ color: '#e20074', fontSize: '40px', fontFamily: 'serif' }}
        >
          Marketplace
        </h3>
        <hr />
      </div>
      <div className="row">
        {store.sortedPosts.map(post => (
          <Card
            key={post.id}
            className="my-4"
            style={{
              margin: '0px 0px 0px 20px',
              borderRadius: '15px 15px 15px 15px',
              width: '545px',
            }}
          >
            <Card.Body>
              {postImage.length != 0 && postDesc.length != 0 && (
                <>
                  <Card.Img
                    src={postImage[post.id - 1].toString()}
                    style={{
                      width: '500px',
                      height: '200px',
                      borderRadius: '15px 15px 0px 0px',
                    }}
                  />
                  <br />
                  <br />
                  <Card.Title>
                    <strong>{post.title}</strong>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {postDesc[post.id - 1].toString()}
                  </Card.Subtitle>
                </>
              )}
            </Card.Body>
            {console.log(postImage)}
            <Card.Footer className="d-flex justify-content-between">
              <h6>Creator : {post.username.toUpperCase()}</h6>
              <span>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    buyNFT(post, post.id - 1);
                  }}
                  style={{
                    backgroundColor: '#e20074',
                    border: 'none',
                    color: 'white',
                    borderRadius: '15px 15px 15px 15px',
                  }}
                >
                  Buy
                </Button>
              </span>
            </Card.Footer>
          </Card>
        ))}
      </div>
      {store.showPayModal && <PayModal />}
    </>
  );
};

export default observer(MarketPlace);

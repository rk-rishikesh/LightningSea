import React, { useEffect, useState } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import PayModal from '../components/PayModal';
import PostCard from '../components/PostCard';
import { useStore } from '../store/Provider';
import { Badge, Card } from 'react-bootstrap';
import { Post } from '../shared/types';
import VerifyButton from '../components/VerifyButton';
import VoteButton from '../components/VoteButton';

const MarketPlace: React.FC = () => {
    const store = useStore();

    const [postImage, setPostImage] = useState<String[]>([]);
    const [postDesc, setPostDesc] = useState<String[]>([]);
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
    }

    const getProductImage = async (url: any) => {
        let imageURL = await parseURL(url);
        let image = imageURL.image;
        image = image.toString();
        return "https://ipfs.io/ipfs/" + image.slice(7);
    };


    useEffect(() => {

        const fetchData = async () => {
            let postImage: string[] = [];
            let postDesc: string[] = [];
            for (var i = 0; i < store.posts.length; i++) {

                const x = await getProductImage(store.posts[i].content)
                const y = await getProductDescription(store.posts[i].content)
                postImage.push(x)
                postDesc.push(y)

            }

            console.log(postImage)
            setPostImage(postImage);
            setPostDesc(postDesc);
        }
        fetchData();

    }, [])


    if (store.posts.length === 0) {
        return (

            <>
                <div>
                    <hr />
                    <h3
                        className="heading"
                        style={{ color: '#e20074', fontSize: '40px', fontFamily: 'serif' }}
                    >
                        My Wall
                    </h3>
                    <hr />
                </div>
                <div className='row'>  <img
                    src="https://uploads-ssl.webflow.com/5fa27c3574b213fae018d63e/61db77ae62249315c10cf2d3_animation_500_kxszguql.gif"
                    style={{ marginLeft: "35%", borderRadius: "50%", width: "25%", marginTop: "7%" }}
                /></div>

                <div><label style={{ margin: '30px 0px 0px 230px' }}>No Posts Found ! Create first post now !</label> <br />
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
            <div className='row'>
                {store.sortedPosts.map(post => (
                    <Card
                        key={post.id}
                        className="my-4"
                        style={{
                            margin: '0px 0px 0px 20px',
                            borderRadius: '15px 15px 15px 15px',
                            width: '545px'
                        }}>
                        <Card.Body>
                            {postImage.length != 0 && postDesc.length != 0 &&
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
                            }
                        </Card.Body>
                        {console.log(postImage)}
                        <Card.Footer className="d-flex justify-content-between">
                            <h6>Creator : {post.username.toUpperCase()}</h6>
                            <span>
                                <VoteButton post={post}></VoteButton>
                            </span>
                        </Card.Footer>
                    </Card>
                ))}</div>
            {store.showPayModal && <PayModal />}
        </>
    );
};

export default observer(MarketPlace);

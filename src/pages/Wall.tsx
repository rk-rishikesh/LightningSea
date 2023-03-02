import React, { useEffect, useState, useCallback } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import PayModal from '../components/PayModal';
import PostCard from '../components/PostCard';
import { useStore } from '../store/Provider';
import { Badge, Card } from 'react-bootstrap';
import Loader from './Loader';

const Wall: React.FC = () => {
    const store = useStore();
    console.log(store)

    const [postCount, setPostCount] = useState(0);

    const handleVerify = ((postId: any) => {
        console.log(postId + 1)
        store.verifyPost(postId + 1);
    });

    useEffect(() => {
        const fetchData = async () => {
            var count = 0;
            console.log("Loading ...", store.posts.length)
            for (var i = 0; i < store.posts.length; i++) {

                if (store.posts[i].username == store.alias) {
                    count = count + 1;
                }

            }
            setPostCount(count);
        }
        fetchData();

    }, [])

    return (
        <>
            <div>
                <hr />
                <h3
                    className="heading"
                    style={{ marginLeft: "38%", color: '#e20074', fontSize: '40px', fontFamily: 'serif' }}
                >
                    {store.alias.toUpperCase()}'S WALL
                </h3>
                <hr />
            </div>
            <div className='' >
                {postCount == 0 ? (
                    <>
                        <div className='row' style={{ display: 'contents', textAlign: 'center' }}>
                            <div className='col'><img
                                src="https://uploads-ssl.webflow.com/5fa27c3574b213fae018d63e/61db77ae62249315c10cf2d3_animation_500_kxszguql.gif"
                                style={{ borderRadius: "50%", width: "25%", marginBottom: '30px' }}
                            /></div>

                            <div className='col'>
                                <label style={{ fontSize: '25px' }}>No Posts Found ! Create your first post now !</label> <br />
                            </div><div className='col' style={{ margin: '30px 0px 0px 0px' }}>
                                <button onClick={store.gotoCreate}
                                    style={{
                                        width: '200px',
                                        height: '40px',
                                        backgroundColor: '#e20074',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontSize: '20px'
                                    }}>
                                    Create Post
                                </button></div>
                        </div></>
                ) : (<div className='row'>
                    {store.posts.map(function (item, index) {
                        return (
                        <>
                            {store.posts[index].username == store.alias &&
                                <>
                                {console.log(store.posts[index].content)}
                                    {<Card
                                        key={index}
                                        className="my-4"
                                        style={{
                                            margin: '0px 0px 0px 20px',
                                            borderRadius: '15px 15px 15px 15px',
                                            width: '545px'
                                        }}>
                                        <Card.Body>
                                            
                                            <Card.Img
                                                src={store.posts[index].content}
                                                style={{
                                                    width: '500px',
                                                    height: '200px',
                                                    borderRadius: '15px 15px 0px 0px',
                                                }}
                                            />
                                            
                                            <br />
                                            <br />
                                            <Card.Title>
                                                <strong>{store.posts[index].title}</strong>
                                            </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {store.posts[index].description.toString()}
                                            </Card.Subtitle>
                                        </Card.Body>

                                        <Card.Footer className="d-flex justify-content-between">
                                            <h6>Owner : {store.posts[index].username}</h6>
                                            {store.posts[index].verified &&
                                                <span>
                                                    <Button variant="outline-primary"
                                                        style={{
                                                            backgroundColor: '#e20074',
                                                            border: 'none',
                                                            color: 'white',
                                                            borderRadius: '15px 15px 15px 15px',
                                                        }}
                                                        onClick={() => { handleVerify(index) }}>
                                                        Unlist from Marketplace
                                                    </Button>
                                                </span>
                                            }
                                            {!store.posts[index].verified &&
                                                <span>
                                                    <Button variant="outline-primary"
                                                        style={{
                                                            backgroundColor: '#e20074',
                                                            border: 'none',
                                                            color: 'white',
                                                            borderRadius: '15px 15px 15px 15px',
                                                        }}
                                                        onClick={() => { handleVerify(index) }}>
                                                        List on Marketplace
                                                    </Button>
                                                </span>
                                            }
                                        </Card.Footer>
                                    </Card>}
                                </>
                            }
                        </>)

                    }
                    )}</div>)

                }


            </div>
            {store.showPayModal && <PayModal />}
        </>
    );
};

export default observer(Wall);

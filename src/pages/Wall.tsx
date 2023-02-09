import React, { useEffect, useState } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import PayModal from '../components/PayModal';
import PostCard from '../components/PostCard';
import { useStore } from '../store/Provider';
import { Badge, Card } from 'react-bootstrap';


const Wall: React.FC = () => {
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
                if (store.posts[i].username == store.alias) {
                    const x = await getProductImage(store.posts[i].content)
                    const y = await getProductDescription(store.posts[i].content)
                    postImage.push(x)
                    postDesc.push(y)
                }
            }

            console.log(postImage)
            setPostImage(postImage);
            setPostDesc(postDesc);
        }
        fetchData();

    }, [])

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
            <div className='row'>

                {postImage.length == 0 && postDesc.length == 0 && <>
                    <>
                        <div>  <img
                            src="https://uploads-ssl.webflow.com/5fa27c3574b213fae018d63e/61db77ae62249315c10cf2d3_animation_500_kxszguql.gif"
                            style={{ marginLeft: "93%", borderRadius: "50%", width: "25%", marginTop: "7%" }}
                        /></div>



                        <div><label style={{ margin: '40px 0px 0px 380px' }}>No Posts Found ! Create your first post now !</label> <br />
                            <button onClick={store.gotoCreate}
                                style={{
                                    width: '200px',
                                    height: '40px',
                                    backgroundColor: '#e20074',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    margin: '60px 0px 0px 430px'
                                }}>
                                Create Post
                            </button></div>
                    </>
                </>}
                {store.sortedPosts.map(post => (

                    <>
                        {postImage.length != 0 && postDesc.length != 0 &&
                            <>
                                <Card
                                    key={post.id}
                                    className="my-4"
                                    style={{
                                        margin: '0px 0px 0px 20px',
                                        borderRadius: '15px 15px 15px 15px',
                                        width: '545px'
                                    }}>
                                    <Card.Body>

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


                                    </Card.Body>
                                    {console.log(postImage)}
                                    <Card.Footer className="d-flex justify-content-between">
                                        <h6>Creator : {post.username.toUpperCase()}</h6>
                                        <span>
                                            <Button variant="outline-primary"
                                                style={{
                                                    backgroundColor: '#e20074',
                                                    border: 'none',
                                                    color: 'white',
                                                    borderRadius: '15px 15px 15px 15px',
                                                }}>
                                                List on Marketplace
                                            </Button>
                                        </span>
                                    </Card.Footer>
                                </Card>
                            </>


                        }
                    </>
                ))}
            </div>
            {store.showPayModal && <PayModal />}
        </>
    );
};

export default observer(Wall);

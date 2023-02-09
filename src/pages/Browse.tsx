import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import '../../src/index.css';
import Button from 'react-bootstrap/Button';
import { useStore } from '../store/Provider';
import { Badge, Card } from 'react-bootstrap';

const Browse: React.FC = () => {

    const store = useStore();

    const [postImage, setPostImage] = useState<String[]>([]);
    const [postDesc, setPostDesc] = useState<String[]>([]);
    const [showPhotograpghers, setShowPhotographers] = useState('Photographer');
    const [loading, setLoading] = useState(false);

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

    const handleSubscribe = useCallback(async (name: String) => {
        setLoading(true);

        let postImage: string[] = [];
        let postDesc: string[] = [];

        for (var i = 0; i < store.posts.length; i++) {
            if (store.posts[i].username == name) {
                const x = await getProductImage(store.posts[i].content)
                const y = await getProductDescription(store.posts[i].content)
                postImage.push(x)
                postDesc.push(y)
            }

            console.log(postImage)
            setPostImage(postImage);
            setPostDesc(postDesc);
            console.log(name)
            setShowPhotographers(name.toString());
         
        }
        setLoading(false);
    }, [store]);

    const artImage = [
        {
            imageName: 'bob',
            src: 'https://openseauserdata.com/files/c65186f3c0d04a070b0fb72863381350.jpg',
        },
        {
            imageName: 'alice',
            src: 'https://www.rangefinderonline.com/wp-content/uploads/2021/10/thumbnail_IMG_4548-2.jpg',
        },
        {
            imageName: 'carol',
            src: 'https://www.artnews.com/wp-content/uploads/2021/08/BAYC-8746.png?w=631',
        },
    ];

    if(loading) {
        return <h1>Loading</h1>
    } else {
        return (
            <>
                <div>
                    <img
                        className="coverImg"
                        src="https://bafkreicih4tuusc4ddhaqs6ivm6bqcw55nwys74cnterlgnpe437kds2fy.ipfs.nftstorage.link"
                    />
                </div>
                <div>
                    <hr />
                    <h3 className="heading" style={{ color: '#e20074', fontSize: '40px', fontFamily: 'serif' }}>{showPhotograpghers}'s Zone</h3>
                    <hr />
                </div>
    <div className='row'>
                {showPhotograpghers != 'Photographer' ?
                    (
                        <>
                            {store.sortedPosts.map(post => (
                                <>
                                    {postImage.length != 0 && postDesc.length != 0 &&
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
                                            </Card.Footer>
    
    
                                        </Card>
                                    }
                                </>
                            ))}
    
                        </>
                    ) :
                    (
                        <>
                            <div className="row">
                                {artImage.map((image: any) => {
                                    return (
                                        <div className='column' >
    
                                            <img className="browseImg" src={image.src}></img><br />
                                            <Button style={{ margin: '0px 0px 0px 165px', backgroundColor: '#e20074', border: 'none' }} onClick={() => handleSubscribe(image.imageName)}>Subscribe {image.imageName}</Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )
                }
    </div>
            </>
        );
    }

};

export default observer(Browse);

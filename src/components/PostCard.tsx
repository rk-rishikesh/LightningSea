import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Post } from '../shared/types';
import VerifyButton from './VerifyButton';
import VoteButton from './VoteButton';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  
  const parseURL = async (url:any) => {
    const data = await fetch(url);
    const json = await data.json();
    console.log(json);
    return json;
  };

  const getProductImage = async (url:any) => {
    let imageURL = await parseURL(url);
    let image = imageURL.image;
    image = image.toString();
    return "https://ipfs.io/ipfs/" + image.slice(7);
  };

  return (
    <Card 
      key={post.id} 
      className="my-4" 
      style={{
      margin: '0px 0px 0px 20px',
      borderRadius: '15px 15px 15px 15px',
      }}>
      <Card.Body>
        <Card.Title>
          <strong>{post.title}</strong>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Posted
          {post.signature && ' and signed '}
          by {post.username}
          {post.verified && (
            <Badge pill variant="success" className="ml-2">
              verified
            </Badge>
          )}
        </Card.Subtitle>
        <Card.Text>{post.content}</Card.Text>
        {/* <Card.Img
                    src={image.src}
                    style={{
                      width: '500px',
                      height: '200px',
                      borderRadius: '15px 15px 0px 0px',
                    }}
                  /> */}
                  <Card.Title>
                    <br />
                    <strong>Post Title</strong>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Post Description
                  </Card.Subtitle>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <h5 className="mt-1">
          <Badge variant={post.votes ? 'primary' : 'light'}>{post.votes}</Badge> votes
        </h5>
        <span>
          <VerifyButton post={post} />
          <VoteButton post={post} />
        </span>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;

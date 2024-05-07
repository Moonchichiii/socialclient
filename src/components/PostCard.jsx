const PostCard = ({ post }) => (
    <div className="post-card">
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      
    </div>
  );
  export default PostCard;
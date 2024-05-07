import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosDefaults';
import styles from './PostPage.module.css';

const PostPage = () => {
    const [postData, setPostData] = useState({
        title: '',
        ingredients: '',
        recipe: '',
        description: '',
        cookingTime: '',
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleImageChange = (e) => {
        setPostData({ ...postData, image: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(postData).forEach(key => {
            formData.append(key, postData[key]);
        });

        setIsLoading(true);
        try {
            await axiosInstance.post('/api/posts/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/feed'); 
            setError('');
        } catch (error) {
            setError('Failed to add post! Please try again!');
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.postPage}>
              <h1>Create a New Post</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="postTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                  />
                </Form.Group>
        
                <Form.Group controlId="postIngredients">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingredients"
                    name="ingredients"
                    value={postData.ingredients}
                    onChange={handleChange}
                  />
                </Form.Group>
        
                <Form.Group controlId="postRecipe">
                  <Form.Label>Recipe</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="How to make the dish"
                    name="recipe"
                    value={postData.recipe}
                    onChange={handleChange}
                  />
                </Form.Group>
        
                <Form.Group controlId="postDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Description"
                    name="description"
                    value={postData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
        
                <Form.Group controlId="postCookingTime">
                  <Form.Label>Cooking Time (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Cooking time"
                    name="cookingTime"
                    value={postData.cookingTime}
                    onChange={handleChange}
                  />
                </Form.Group>
        
                <Form.Group controlId="postImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </Form.Group>
        
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Posting...' : 'Post'}
                </Button>
              </Form>
            </div>
          );
        };
   
export default PostPage;



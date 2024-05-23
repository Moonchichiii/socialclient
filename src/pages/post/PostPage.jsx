import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/PostPage.module.css';

const PostPage = () => {
    const { currentUser } = useCurrentUser();
    const { postId } = useParams(); 
    const [postData, setPostData] = useState({
        title: '',
        ingredients: '',
        recipe: '',
        description: '',
        cookingTime: '',
        image: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            
            setIsLoading(true);
            axiosInstance.get(`/api/posts/${postId}/`)
                .then(response => {
                    setPostData({
                        title: response.data.title,
                        ingredients: response.data.ingredients,
                        recipe: response.data.recipe,
                        description: response.data.description,
                        cookingTime: response.data.cooking_time,
                        image: response.data.image
                    });
                })
                .catch(error => {
                    console.error('Failed to fetch post:', error);
                    setError('Failed to fetch post data.');
                })
                .finally(() => setIsLoading(false));
        }
    }, [postId]);

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
        Object.entries(postData).forEach(([key, value]) => {
            if (value !== null) formData.append(key, value);
        });

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        try {
            const endpoint = postId ? `/api/posts/${postId}/` : '/api/posts/';
            const method = postId ? 'put' : 'post';
            await axiosInstance[method](endpoint, formData, config);
            navigate('/dashboard/feed');  
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to process post! Please try again!');
        }
    };

    return (
        <div className={styles.postPage}>
            <h1>{postId ? 'Edit Post' : 'Create a New Post'}</h1>
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
                  <Form.Label className='mt-2'>Ingredients</Form.Label>
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
                  <Form.Label className='mt-2'>Recipe</Form.Label>
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
                  <Form.Label className='mt-2'>Description</Form.Label>
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
                  <Form.Label className='mt-2'>Cooking Time (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Cooking time"
                    name="cookingTime"
                    value={postData.cookingTime}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="postImage">
                  <Form.Label className='mt-2'>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Button className='mt-2' variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting.....' : (postId ? 'Update' : 'Post')}
                </Button>
            </Form>
        </div>
    );
};

export default PostPage;
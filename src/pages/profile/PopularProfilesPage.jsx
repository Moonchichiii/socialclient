import React from 'react';
import useProfilesFollowers from '../../hooks/useProfilesFollowers';
import styles from '../../styles/PopularProfiles.module.css';
import { ListGroup, Button, Alert, Image } from 'react-bootstrap';

const PopularProfilesPage = () => {
    const {
        profiles,
        followingList,
        message,
        messageType,
        handleFollow,
        handleUnfollow,
        isFollowing
    } = useProfilesFollowers();

    console.log('Following list:', followingList);

    return (
        <div className="text-center">
            <h1>Most Popular Profiles</h1>
            {message && <Alert variant={messageType}>{message}</Alert>}
            <div className={styles.sectionWrapper}>
                <section className={styles.section}>
                    {profiles.length ? (
                        <ListGroup>
                            {profiles.map(profile => (
                                <ListGroup.Item key={profile.profile_id} className={styles.profileItem}>
                                    <div className={styles.profileInfo}>
                                        <Image src={profile.image} roundedCircle width="40" height="40" alt="Profile" />
                                        <h3 className={styles.PopularHeading}>{profile.display_name}</h3>
                                        <p className={styles.PopularParagraph}>Total Likes: {profile.total_likes}</p>
                                    </div>
                                    <div className={styles.profileButtons}>
                                        {!isFollowing(profile.profile_id) ? (
                                            <Button 
                                                onClick={() => handleFollow(profile.profile_id)} 
                                                variant="success" 
                                                className={styles.followButton}
                                            >
                                                Follow
                                            </Button>
                                        ) : (
                                            <Button 
                                                onClick={() => handleUnfollow(profile.profile_id)} 
                                                variant="danger" 
                                                className={styles.followButton}
                                            >
                                                Unfollow
                                            </Button>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No popular profiles found.</p>
                    )}
                </section>
                <section className={styles.section}>
                    <h2>Your Following List</h2>
                    {followingList.length ? (
                        <ListGroup>
                            {followingList.map(follower => (
                                <ListGroup.Item key={follower.profile_id} className={styles.profileItem}>
                                    <div className={styles.profileInfo}>
                                        <Image src={follower.profile_profile_image} roundedCircle width="40" height="40" alt="Profile" />
                                        <h3 className={styles.PopularHeading}>{follower.profile_display_name}</h3>
                                    </div>
                                    <div className={styles.profileButtons}>
                                        <Button 
                                            onClick={() => handleUnfollow(follower.profile_id)} 
                                            variant="danger" 
                                            className={styles.followButton}
                                        >
                                            Unfollow
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>You are not following anyone yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default PopularProfilesPage;



import React from "react";
import useProfiles from "../../hooks/useProfiles";
import useFollow from "../../hooks/useFollow";
import { ListGroup, Button, Alert, Image } from "react-bootstrap";
import styles from "../../styles/PopularProfiles.module.css";

const PopularProfilesPage = () => {
  const {
    profiles,
    message: profilesMessage,
    messageType: profilesMessageType,
  } = useProfiles();
  const {
    followingList,
    message: followMessage,
    messageType: followMessageType,
    handleFollow,
    handleUnfollow,
    isFollowing,
  } = useFollow();

  return (
    <div className="text-center">
      <h1>Popular Profiles & Followers</h1>
      {profilesMessage && (
        <Alert variant={profilesMessageType}>{profilesMessage}</Alert>
      )}
      {followMessage && (
        <Alert variant={followMessageType}>{followMessage}</Alert>
      )}
      <div className={styles.sectionWrapper}>
        <section className={styles.section}>
          <h2>Popular Profiles</h2>
          {profiles.length ? (
            <ListGroup>
              {profiles.map((profile) => (
                <ListGroup.Item
                  key={profile.profile_id}
                  className={styles.profileItem}
                >
                  <div className={styles.profileInfo}>
                    {profile.image && (
                      <Image
                        src={profile.image}
                        roundedCircle
                        width="40"
                        height="40"
                        alt="Profile"
                      />
                    )}
                    <h3 className={styles.popularHeading}>
                      {profile.display_name}
                    </h3>
                    <p className={styles.popularParagraph}>
                      Total Likes: {profile.total_likes}
                    </p>
                  </div>
                  <div className={styles.profileButtons}>
                    {!isFollowing(profile.profile_id) ? (
                      <Button
                        onClick={() => {
                          handleFollow(profile.profile_id);
                        }}
                        variant="success"
                        className={styles.followButton}
                      >
                        Follow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleUnfollow(profile.profile_id);
                        }}
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
              {followingList.map((follower) => (
                <ListGroup.Item
                  key={follower.id}
                  className={styles.profileItem}
                >
                  <div className={styles.profileInfo}>
                    {follower.profile.image && (
                      <Image
                        src={follower.profile.image}
                        roundedCircle
                        width="40"
                        height="40"
                        alt="Profile"
                      />
                    )}
                    <h3 className={styles.popularHeading}>
                      {follower.profile.display_name}
                    </h3>
                  </div>
                  <div className={styles.profileButtons}>
                    <Button
                      onClick={() => {
                        handleUnfollow(follower.profile.profile_id);
                      }}
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
            <p>You are not following anyone?</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default PopularProfilesPage;

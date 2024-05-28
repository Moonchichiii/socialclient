# Manual Testing

[Go to README](README.md)

## Login/Register Page

| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Open the Login/Register Page  | Login/Register Page loads and displays the login form by default           |        | [Screenshot]()    |
| Switch to Register Form       | Clicking the switch button shows the registration form                     |         | [Screenshot]()    |
| Register a user with valid data| Request is successful, user is registered and logged in                    |         | [Screenshot]()    |
| Register a user with invalid data| Request fails, form reloads, error displayed                         |         | [Screenshot]()    |
| Login a user with valid data  | Request is successful, user is logged in                                   |         | [Screenshot]()    |
| Login a user with invalid data| Request fails, form reloads, error displayed                           |        | [Screenshot]()    |
## Dashboard 
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Open the Dashboard            | Dashboard loads and displays a welcome text and the navigation bar         |         | [Screenshot]()    |
## Navigation
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Navigate to Home              | Clicking Home navigates to the (dashboard)                                   |         | [Screenshot]()    |
| Navigate to Feed              | Clicking Feed navigates to the Feed page                                   |        | [Screenshot]()    |
| Navigate to Liked             | Clicking Liked navigates to the Liked page                                 |         | [Screenshot]()    |
| Navigate to Popular Profiles  | Clicking Popular Profiles navigates to the Popular Profiles page           |         | [Screenshot]()    |
| Navigate to Post              | Clicking Post navigates to the Post creation page                          |         | [Screenshot]()    |
| Navigate to Profile           | Clicking Profile navigates to the Profile page                             |        | [Screenshot]()    |
| Logout                        | Clicking Logout logs out the user and navigates to the login page          |         | [Screenshot]()    |
## Feed Page
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Open the Feed Page            | Feed page loads and displays posts.                      |         | [Screenshot]()    |
| Use Search Bar                | Entering keywords and submitting shows search results                      |         | [Screenshot]()    |
## Liked Page
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Open the Liked Page           | Liked page loads and displays posts liked by the user                      |         | [Screenshot]()    |
## Popular Profiles Page
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Open the Popular Profiles Page| Popular profiles page loads and displays the most popular profiles and following list | | [Screenshot]()    |
| Follow a Profile              | Clicking follow button successfully follows a profile                      |         | [Screenshot]()    |
| Unfollow a Profile            | Clicking unfollow button successfully unfollows a profile                  |         | [Screenshot]()    |
## Post Page
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Create a Post with valid data | Request is successful, post is created.   |         | [Screenshot]()    |
| Create a Post with invalid data| Request fails, form shows error                                           |         | [Screenshot]()    |
| Edit a Post with valid data   | Request is successful, post is updated.|        | [Screenshot]()    |
| Edit a Post with invalid data | Request fails, form shows error                                            |         | [Screenshot]()    |
| Delete a Post                 | Request is successful, post is deleted,    |         | [Screenshot]()    |
## Profile Page
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Open Profile                  | Profile page loads and displays correct user data                          |         | [Screenshot]()    |
| Edit Profile                  | Request is successful, profile is updated.   |         | [Screenshot]()    |
## Post Interaction
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Open a post by clicking "view full recipe"       | Post detail page loads with correct data                                   |         | [Screenshot]()    |
| Open a post through URL       | Post detail page loads with correct data                                   |         | [Screenshot]()    |
| Liking a post                 | Like count increases                                                       |         | [Screenshot]()    |
| Unliking a post               | Like count decreases                                                       |         | [Screenshot]()    |
| Publish a post (Superuser)    | Request is successful, post is published                                   |         | [Screenshot]()    |
## Commenting
| Testcase                      | Expected Result                                                            | Test Result | Screenshots        |
| ----------------------------- | -------------------------------------------------------------------------- | ----------- | ----------------- |
| Writing a comment             | Request is successful, comment is added to the list, message is shown      |         | [Screenshot]()    |
| Editing a comment             | Request is successful, comment content is updated, message is shown        |         | [Screenshot]()    |
| Delete a comment              | Request is successful, comment is deleted, message is shown                |         | [Screenshot]()    |

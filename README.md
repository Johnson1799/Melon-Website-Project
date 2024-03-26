To clone this branch into your local computoer:
------------------------------------------------------
### `git clone -b <branchname> <remote-repo-url>`


First, you need to run the server
-----------------------------------------------------------------------------------
1. In VSCode, right click the 'server' folder and click 'Open In Integrated Terminal'
2. type 'npm install', this will install all the libraries required in back-end
3. type 'nodemon app' to run the server


Second, you need to run the front-end
-----------------------------------------------------------------------------------
4. In VSCode, right click the 'client' folder and click 'Open In Integrated Terminal'
5. type 'npm install' again, this will install all the library required in front-end
6. type 'npm run start' to run the front-end, a webpage will be display on brower

Make sure that both server terminal and front-end terminal is running at the same time

Changes:
-----------------------------------------------------------------------------------
1. I create a new nav bar design after user login to their account
2. I establish the profile editing (edit modal and image modal), user can edit their personal information (e.g username, nickname, email, contact, address, description) and user avatar in those modal
3. I develop the connection with Cloudinary database to store images and videos
4. I modify the authenication and arthorization when user login (e.g password encryption and verifying using token during routing each pages)
5. I improve the Profile page UI (added post container in the left-hand side of profile page) 
6. Add the 'post' functionality in profile page (create posts, delete post, edit post)
7. I make the like button, user can like the posts
8. User now can add friends
9. Admin User account is created (account: admin@admin  password: admin123)

Reminders
-----------------------------------------------------------------------------------
1. The comment function still not yet start.
2. HomepageUI still not yet created.
   
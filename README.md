# Social App (Frontend)

## How to Use
```bash
npm install
```
create .env file and set
```bash
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:3001
```
```bash
npm run dev
```

## Article Application Overview:
- Homepage ("/"):
Displays a list of all public articles.
Includes a "Create Post" button at the top to open a modal for creating a new post with a title and body.

- My Posts ("/my_post"):
Shows a list of articles you have posted.
Allows you to edit or delete your articles.

- User Authentication:
"Sign In" button for logging into the app.
After logging in, the "Sign In" button changes to an avatar icon.
Clicking the avatar icon opens a dropdown with options to view "My Posts" and "Logout."

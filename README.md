# Issues Explorer Task

### Demo URL:

[https://topshot-task.vercel.app/](https://topshot-task.vercel.app/)

### QnA Answered:

[QnA Link](https://github.com/axiomzen/cc_Krishna_IssuesExplorerFE/blob/main/problem_statement/QnA.md)

### Problem Statement:

[Problem Statement Link](https://github.com/axiomzen/cc_Krishna_IssuesExplorerFE/tree/main/problem_statement)

### Features Built:

1. User can enter any GitHub repo URL and check all its issues and pull requests.
2. User can click on "I'm Feeling Lucky" button and see issues of a random GitHub repo.
3. User can see basic details about the repo on the top.
4. User can toggle with between 4 categories - All Issues, Open Issues, Closed Issues, Pull Requests.
5. User can also view the count of issues/pull requests in each of the categories.
6. User can filter issues using search bar. The syntax is similar to [Github search syntax](https://docs.github.com/en/github/searching-for-information-on-github/understanding-the-search-syntax).
7. User can toggle between Grid and List views for the results.
8. User can scroll down and load more results.
9. User can use the product in any mobile device as well.

### Product Screenshots:

![image](https://user-images.githubusercontent.com/4353562/115087180-585f9000-9f2b-11eb-8ffe-e1284709673c.png)

![image](https://user-images.githubusercontent.com/4353562/115087250-72996e00-9f2b-11eb-8e96-cf2a9d63141f.png)

### Stack Used:

**Deployment:**
- [Vercel](https://vercel.com/)

**Core Framework:**
- [Next.js](https://nextjs.org/)

**Static Checking:**
- [EsLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

**CSS Framework:**
- [Bulma](https://bulma.io/)

**CSS Pre-processor:**
- [SASS](https://sass-lang.com/)

**API Clients:**
- [Axios](https://github.com/axios/axios)
- [Apollo Client](https://www.apollographql.com/docs/react/)

_Note: Both API Clients are used deliberately to show the code strcuture possibilities for the task. In actual project, ideally, only one of them should be used._

### Folder Structure:

- `pages` - Contains all route pages
- `components` - Contains all components grouped by usecases & routes.
- `styles` - Contains all global and modular css styles.
- `services` - Folder structure for Axios API routes.

### Run Locally:

1. Clone repo locally. Then,
2. `cd cc_Krishna_IssuesExplorerFE`
3. `npm install`
4. Create a `.env.local` file by copying `.env` file. Add GitHub key from [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line).
5. `npm run dev`
6. Open `http://localhost:3000` in your browser.

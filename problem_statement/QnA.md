# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?

Mainly two risks need to be taken care of while completing this project -
- Scalability Risk - Since the aim is to build a generic issues explorer, the architecture should not be tightly bound to Github, and it should be easy to plug in other clients in the future.
- Design consistency - Chosen CSS frameworks and tools should be standardized and developer-friendly so that whoever picks up the project in the future can continue the work instead of re-writing parts of the code.


> What changes/additions would you make to the design?

I would want to make few improvements to the current design -
- Empower users to search & filter issues using more parameters like labels, owner, assignee, etc.
- Add a different way of viewing filters for better exploration, like adding a list view along with the grid view.
- If GitHub API permits, make the filters more useful for users by adding stats with the filters' values. For instance, open issues (10), closed issues (23), etc.


> List a two or three features that you would consider implementing in the future that would add significant value to the project.

Few features that will add a significant value to the project are -
- Allow users to interact & update the issues in the UI directly instead of redirecting to the client.
- Create Issues Analytics dashboard to give the ability to see how the team is performing.
- Allow users to group issues by category for easier discovery - by teams, projects, milestones, etc.

Some other features include, in no particular order -
- Allow users to favorite/bookmark an issue for quicker access.
- Add authentication & authorization flows to allow users to save the bookmarks and the repos list.
- Add shortcuts and a global command line to explore & triage issues faster.
- Add integrations with other clients like BitBucket & GitLab to allow users to view issues from multiple clients at one place.
- Create public APIs for the product to empower users to build custom third-party workflows.
- Create a new "roadmap" view type so that users can plan better.


---

### Looking Back

> Describe the major design/build decisions and why you made them.

- **Using GitHub's GraphQL API vs. REST API:** GraphQL API provided two benefits over the REST API.  1) I could get issues' and pull requests' count in GraphQL API that is not possible in REST API, and 2) I could combine all the APIs into one request in GraphQL.
- **Using Bulma CSS framework:** I saw that NBA Top Shot uses Bulma in its site. That's why I wanted to use the Bulma framework.
Using Apollo React Client for GraphQL: Though GraphQL APIs can also be fetched using REST API clients, the Apollo React Client provided a very declarative and seamless way of integrating GraphQL APIs.
- **Using both Axios & Apollo React Client:** Although the purpose of this project can be solved using any one client, I wanted to show the code structure possibilities with both types of clients, strictly for this task.



> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

Overall, the assessment took around 10 hours to complete.
- **Learning Framework** took around 3 hours. It mainly involved going through Github APIs, Bulma's, and Apollo React Client's documentation.
- **Coding** took around 4 hours.
- **Debugging** took around 3 hours. It mainly involved troubleshooting Github's GraphQL API and Bulma framework for responsiveness.

> If you could go back and give yourself advice at the beginning of the project, what would it be?

There were no major issues as such during the execution. But, to add a small thing, I would tell me to go through the Github APIs documentation end-to-end before starting executing, since not knowing the differences between their REST and GraphQL APIs took a good amount of my time.

> Did you learn anything new?

Yes, I got to learn many new things -

- **Bulma Framework:** I have used Bootstrap & TailwindCSS before. It was the first time I got to use the Bulma Framework.
- **Apollo React Client:** I have never used the Apollo Client for the GraphQL queries. Seeing the declarative approach with the Query tag was fun.
- **Github API:** Although I have used GitHub's APIs before for various projects, this was the first time I went through it extensively.

> Do you feel that this assignment allowed you to showcase your abilities effectively?

Yes, I got to showcase my abilities in this project perfectly.

> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

Yes, there were a few things that I was not able to show using this exercise -
Performance Improvements - This was not a big enough app to showcase various techniques to improve web performance, using tools like web vitals & Mixpanel.
CI/CD workflows - Since I was the only one working on this project, I didn't do any CI checks using Github Actions. That would have made sure that the code in the main branch is completely checked and tested.
Feature Flags - I also didn't use any feature flags for A/B Testing flow because of the time limitations of the task.

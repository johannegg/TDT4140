# Icebreaker

## Project rules

### Issues and branches

Each issue is assigned a label, describing the priority level (critical/suggestion), the location in the stack (frontend/backend), what type of work should be done (testing/documentation), and whether it involves an existing feature (bug/enhancement). The "in-progress" label will also be utilized to track the status of an issue on the [issue board](https://gitlab.stud.idi.ntnu.no/tdt4140-2024/produktomraade-2/gruppe-23/icebreaker/-/boards).

Each issue will be assigned to one person since GitLab does not allow multiple assignees. Pair programming will be registered in commit messages as described in the section below. The deadline and time estimates for each issue will let the assignee know the workload required.

Every issue that involves coding has to be solved on a separate branch. We generate a new branch on the issue page, checkout to this branch locally, and make merge requests when the work is finished. Only documentation-related issues may be ommitted from this rule, pushing directly to main instead of a separate branch.

When merging a feature branch into the main branch, we squash the commit messages from the feature branch into one commit message on the main. We write a summary of all commit messages as the squash commit message. The individual commit messages on the feature branch will still be accessible on the merge request page.

### Commit messages

General format:

```
prefix: commit title

- Comment 1
- Comment 2
...

Co-authored-by: Name1 <additional-dev-1@example.com>
Co-authored-by: Name2 <additional-dev-2@example.com>
```

The title of each commit message should include prefixes such as "feat:", "enhancement:" or "docs:", as outlined in [this](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) thread. When pair programming we will follow the "Co-authored-by:"-standard at the end of the commit, as described in [this](https://stackoverflow.com/a/7442255/10002175) thread.

The VS Code [settings](/.vscode/settings.json) enforce input validation warnings on commit messages in "Source control" in VS Code: titles can be up to 50 characters, and comments up to 72 characters per line. When pair programming with the [LiveShare](https://code.visualstudio.com/learn/collaboration/live-share) extension, the relevant "Co-authored-by:"-lines can be auto generated.

If the commit is relevant to one or more issues, we can refer to them at the end of the commit (before "Co-authored-by") using their IDs as follows: "Related to \#\<issue-id-1> and \#\<issue-id-2>". We may close an issue directly from the commit message using certain [keywords](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically), such as "Closes" or "Resolves" directly in front of the issue reference. As an example, a commit message may look like this:

```
enhancement: added validation to foo-feature

- Set up regex new patterns
- Added null checks in setup method

Related to #5 and #6
Closes #7

Co-authored-by: Name <firstlast@example.com>
```

Note: to reference a merge request, the identifier is given by \!\<id> instead of \#\<id>.

### Local development workflow

- Each participant clones the repository to their local machine.
- Each participant is responsible for running compatible versions of Java and Maven.
- Each participant uses ```git checkout``` to develop on their assigned issue branch.
- Each participant uses ```git stash``` to stash unsaved work when checking out on another branch.
- We utilize the [LiveShare](https://code.visualstudio.com/learn/collaboration/live-share) VS Code extension for pair programming.

## Frontend setup

### Authentication

Upon successful login, a JWT token is obtained and cached for later use. Requests to protected endpoints on the backend will have to utilize this token once logged in.

## Backend setup

### Inspiration and credit

The backend for this project is based on a [Spring Initializr](https://start.spring.io) template provided by Broadcom. To enable database integration with MySQL, the project structure was further inspired by this [tutorial](https://www.bezkoder.com/spring-boot-jwt-authentication/) provided by the BezKoder, allowing us to utilize JWT tokens for authentication after user login.

### Prerequisites

- Java version 17, a downgrade from Java 21 might be necessary.
- Local MySQL Server, with the following details:
  - Schema called "icebreaker_db"
  - Admin user with username "admin", and password "P@ssw0rd!123"
  - Server configuration on port 3306

### Dependencies and plugins

The backend is set up as a non-modular Maven project, which means there is only one "src/" directory to contain the Java code. The [pom.xml](/backend/pom.xml) file uses the "spring-boot-starter-parent" as a starting point, with some dependencies already configured. However, we also include additional dependencies for different purposes: Spring Boot (with Tomcat) to run the server, Spring Security for user authentication, Spring Boot JPA to enable database support, and MySQL Connector to connect to this database (some are commented out for the time being).

We have plugins such as Maven Surefire for automated testing, Checkstyle to ensure consistent source code formatting, SpotBugs to check for potential bug patterns in the byte code, and JaCoCo to generate test coverage reports. The testing is done through JUnit, which is baked into the "spring-boot-starter-parent" configuration. The versions of all dependencies/plugins are configurable at the top of our [pom.xml](/backend/pom.xml) file.

### CI/CD pipeline

We have configured the setup for continuous integration in [this](.gitlab-ci.yml) configuration file. The file contains a build stage and a test stage, but since we require a local MySQL instance with a specific login, we made the test stage manual for the time being. In the future, if we hook up to a database in the cloud, we may configure it back to use automatic testing. Since we are only interested in operating the server locally, we have not included any steps for continuous deployment.

### Interacting with the server

In order to start the Spring Boot server, go through the following steps:

1. Open a terminal within VS Code.
2. Jump into the "backend" directory with the command ```cd backend```
3. Clean up the target folder and run tests with ```mvn clean install```
4. If you want to skip the tests, run ```mvn clean install -DskipTests```
5. If any bugs were detected by SpotBugs, debug using ```mvn spotbugs:gui```
6. Run the server with ```mvn spring-boot:run```
7. Press Ctrl+C in the terminal to stop the server

While the server is running, the endpoints should be accessible locally from the port 8080 on the path "/api/\<endpoint>". The port can be reconfigured in the [properties](/backend/src/main/resources/application.properties) file for the server. Database configurations are also set up in the same properties file. The MySQL Connector operates on port 3306. To ensure that the frontend web host port is compatible with the server backend, we utilize @CrossOrigin annotation on the backend endpoints.

### Available endpoints

The full documentation for the REST API can be found [here](/docs/rest-api.md). In this document, we specify which data is required in a request, and what type of data is returned. For the frontend team, this documentation will act as a guide on how to interact with the server through requests to endpoints. The test frontend setups in the [frontendTest](/frontendTest/) directory also specify examples for how to use "fetch" in Javascript, which should be easily adaptable for Typescript.

### Database management

The database setup for the backend relies on a local MySQL server instance with the login specified in "Prerequisites" section above. The server is configured to automatically set up tables for the defined entity classes and repositories through JPA/Hibernate.

We have ensured that some "standard data" is automatically inserted on server launch through the [data.sql](/backend/src/main/resources/data.sql) file; for instance we have 3 entries in "roles", 3 entries in "users", and 6 entries in "user_roles". The full overview of our standard data can be found in [this](/docs/standard-data.md) file. If the tables and predefined data entries already exist in the database, nothing will be added on server launch. Other data that was added will also remain between server restarts.

Interactions with the database is done through methods defined for each JPA repository; this includes queries, deletions, insertions etc. Endpoints related to fetching data are generally set up for public access, while other endpoints require authentication with specific roles.

### Test coverage reports for unit tests

The Surefire plugin generates test reports in .txt format, where we can see how many tests passed or failed. However, for a more detailed report, we leverage test analysis through the JaCoCo plugin. We can see which instructions/branches are not being covered by our tests by following the steps below:

1. Run the relevant tests with Maven commands (```mvn clean install``` or ```mvn test```)
2. Look for the "target" directory within the "backend" directory
3. Navigate through ".../target/site/jacoco/", you should now see the file "index.html"
4. Host the "index.html" file locally and inspect the table that pops up ([Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code)
5. The "missed instructions" and "missed branches" columns summarize the test result
6. The goal for a given test is not necessarily to get a coverage "Cov." of 100%. The most important thing is that the most critical methods in the class are tested

It is worth noting that our project does not necessarily benefit from writing unit tests. Relying on integration tests where more parts of the infrastructure is connected is more valuable. Writing test frontends for the backend is more important than testing edge cases of individual methods.

### Integration tests

We define an integration test similarly to system testing, where we try to confirm that two or more components of the app work together correctly. To test that the frontend can communicate with the backend we have added a temporary HTML/JS test frontend [here](/frontend/auth-testing/), containing some buttons to test user permissions after logging in. The [index.html](/frontend/auth-testing/index.html) can here be hosted with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) by right clicking on the file in the VS Code file explorer. Once the website is hosted in a browser, the console in "inspect element" will display any errors that may appear. In the future we will replace this basic type of integration test with more realistic methods for React.

It is important to note the JWT authentication method required to use the backend endpoints. Any frontend must obtain the access token from the "api/auth/signin" endpoint and cache it locally for use in future requests. The request format will then require the header "Authorization: Bearer \<token>" for all protected endpoints.

The "standard data" that is loaded upon server launch includes test users with the following login info (username and password):

- adminuser: Adminuser1
- moduser: Moduser1
- normaluser: Normaluser1

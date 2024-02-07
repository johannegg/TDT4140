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

Co-authored-by: Firstname Lastname <firstlast@example.com>
```

Note: to reference a merge request, the identifier is given by \!\<id> instead of \#\<id>.

### Local development workflow
- Each participant clones the repository to their local machine.
- Each participant is responsible for running compatible versions of Java and Maven.
- Each participant uses ```git checkout``` to develop on their assigned issue branch.
- Each participant uses ```git stash``` to stash unsaved work when checking out on another branch.
- We utilize the [LiveShare](https://code.visualstudio.com/learn/collaboration/live-share) VS Code extension for pair programming.

## Frontend setup

## Backend setup

### Inspiration and credit

The backend for this project is based on a GitLab [Project Template](https://docs.gitlab.com/ee/user/project/#create-a-project-from-a-built-in-template), with the license included [here](/backend/LICENSE). To enable database integration with MySQL, the project structure was further inspired by this [tutorial](https://springjava.com/spring-boot/security-login-rest-api-with-database-authentication-in-spring-boot) provided by the Spring team (yet to be implemented).

### Dependencies and plugins

The backend is set up as a non-modular Maven project, which means there is only one "src/" directory to contain the Java code. The [pom.xml](/backend/pom.xml) file uses the "spring-boot-starter-parent" as a starting point, with some dependencies already configured. However, we also include additional dependencies for different purposes: Spring Boot (with Tomcat) to run the server, Spring Security for user authentication, Spring Boot JPA to enable database support, and MySQL Connector to connect to this database (some are commented out for the time being). 

We have plugins such as Maven Surefire for automated testing, Checkstyle to ensure consistent source code formatting, SpotBugs to check for potential bug patterns in the byte code, and JaCoCo to generate test coverage reports. The testing is done through JUnit, which is baked into the "spring-boot-starter-parent" configuration. The versions of all dependencies/plugins are configurable at the top of our [pom.xml](/backend/pom.xml) file.

### CI/CD pipeline

We have configured the setup for continuous integration in [this](.gitlab-ci.yml) configuration file. The file contains a build stage and a test stage. Since we are only interested in operating the server locally, we have not included any steps for continuous deployment.

### Interacting with the server

In order to start the Spring Boot server, go through the following steps:

1. Open a terminal within VS Code.
2. Jump into the "backend" directory with the command ```cd backend```
3. Clean up the target folder and run tests with ```mvn clean install```
4. If you want to skip the tests, run ```mvn clean install -DskipTests```
5. If any bugs were detected by SpotBugs, debug using ```mvn spotbugs:gui``` 
6. Run the server with ```mvn spring-boot:run```
7. Press Ctrl+C in the terminal to stop the server

While the server is running, the endpoints should be accessible locally from the port 8080 on the path "/api/\<endpoint>". The port can be reconfigured in the [properties](/backend/src/main/resources/application.properties) file for the server. To ensure that the frontend web host port is compatible with the server backend, we may utilize @CrossOrigin annotation on the backend endpoints. Once implemented, database configurations will also be set up in the same properties file. The default port for the MySQL Connector is 3306, and will also be standard configured for the application properties.

### Test coverage reports for unit tests

The Surefire plugin generates test reports in .txt format, where we can see how many tests passed or failed. However, for a more detailed report, we leverage test analysis through the JaCoCo plugin. We can see which instructions/branches are not being covered by our tests by following the steps below:

1. Run the relevant tests with Maven commands (```mvn clean install``` or ```mvn test```)
2. Look for the "target" directory within the "backend" directory
3. Navigate through ".../target/site/jacoco/", you should now see the file "index.html"
4. Host the "index.html" file locally and inspect the table that pops up ([Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code)
5. The "missed instructions" and "missed branches" columns summarize the test result
6. The goal for a given test is not necessarily to get a coverage "Cov." of 100%. The most important thing is that the most critical methods in the class are tested

### Integration tests

We define an integration test similarly to system testing, where we try to confirm that two or more components of the app work together correctly. To test that the frontend can communicate with the backend we have added a temporary HTML/JS test frontend [here](/frontend/temporary-testing/), containing only two buttons and a div. The [index.html](/frontend/temporary-testing/index.html) can here be hosted with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) by right clicking on the file in the explorer. When pressing buttons on the website, it will make calls to the "/health" and "/login" endpoints on the server, and confirm that the text in the div changes to what we expect. The console in "inspect element" will also display any errors that may appear. In the future we will replace this basic type of integration test with more realistic methods for React.

It is worth noting that the current test frontend has to run on port 5501 to have access to the endpoints, due to the configurations of \@CrossOrigin in the [controllers](/backend/src/main/java/icebreaker/controller/). The VS Code [settings](/.vscode/settings.json) are set to configure the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension on port 5501, so it should work with these tools. The \@CrossOrigin setup may also be altered to work with the frontend port when testing, just make sure that the ports are aligned when both the client and server are running. 
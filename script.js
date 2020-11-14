/*
*
*
* https://api.github.com/graphql
*
*
                    <section class="repository d-flex justify-content-btwn">
                        <section class="part-1">
                            <a href="" class="repo-name">
                                repo-name
                            </a>

                            <p class="repo-description">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eum obcaecati placeat
                                quod saepe! Ab aspernatur deleniti dolorum impedit, ipsam laudantium necessitatibus,
                                obcaecati placeat quaerat quisquam repellendus temporibus vel voluptas!
                            </p>

                            <section class="additional-infos">
                                <ul class="list-unstyled list-inline p-0">
                                    <li class="list-item">
                                        <span class="pl-notch"
                                              style="background-color: lightcoral;"
                                        ></span>
                                        Shell
                                    </li>
                                    <li class="list-item">
                                        <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16"
                                             version="1.1" width="16" height="16" role="img">
                                            <path fill-rule="evenodd"
                                                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                        </svg>
                                        1
                                    </li>
                                    <li class="list-item">
                                        <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16"
                                             version="1.1" width="16" height="16" role="img">
                                            <path fill-rule="evenodd"
                                                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                        </svg>
                                        2
                                    </li>
                                    <li class="list-item">
                                        Updated on Oct 1
                                    </li>
                                </ul>
                            </section>
                        </section>

                        <section class="part-2">
                            <button class="star-btn"
                                    title="Star matscode/buycions-test"
                                    data-ga-click="Repository, click star button, action:profiles#show; text:Star">
                                <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16"
                                     height="16" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                </svg>
                                Star
                            </button>
                        </section>
                    </section>
*
* */

window.addEventListener('DOMContentLoaded', (wde) => {
    const reposWrapper = document.querySelector('#repositoriesWrapper');
    const profileName = document.querySelector('.profile-user-name');
    const profileUsername = document.querySelector('.profile-username');
    const profileDesc = document.querySelector('.profile-description');
    const repoCount = document.querySelector('#repositoriesCount');
    const profilePicture = document.getElementsByClassName('avatar');

    const gq = {
        "query": `{
    user (login: "matscode") {
        id,
        login,
        name,
        avatarUrl,
        bio,
        bioHTML,
        email,
        repositories(first: 20) {
            nodes {
                name,
                shortDescriptionHTML,
                homepageUrl,
                url,
                primaryLanguage {
                    name,
                    color
                },
                updatedAt,
                stargazerCount,
                forkCount
            },
            totalCount
        }
    }
}`
    };


    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer 85e3ccfa7776bdf46cc57db1cb618bed2da4f2a1',
        },
        body: JSON.stringify(gq),
    })
        .then(r => r.json())
        .then(jr => {
            const { user } = jr.data;
            // put my info on the page
            profileName.innerHTML = user.name;
            profileUsername.innerHTML = user.login;
            repoCount.innerHTML = user.repositories.totalCount;
            profileDesc.innerHTML = user.bioHTML;
            for (let xy = 0; xy < profilePicture.length; xy++) {
                profilePicture[xy].src = user.avatarUrl;
            }

            // put my repos on the page
            const reposString = user.repositories.nodes.map(repo => `
                <section class="repository d-flex justify-content-btwn">
                        <section class="part-1">
                            <a href="${repo.url}" class="repo-name">
                                ${repo.name}
                            </a>

                            <p class="repo-description">
                                ${repo.shortDescriptionHTML}
                            </p>

                            <section class="additional-infos">
                                <ul class="list-unstyled list-inline p-0">
                                ${(repo.primaryLanguage) ?
                `<li class="list-item">
                                        <span class="pl-notch"
                                              style="background-color: ${repo.primaryLanguage.color};"
                                        ></span>
                                        ${repo.primaryLanguage.name}
                                    </li>`
                : ''}
                                
                                    <li class="list-item">
                                        <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16"
                                             version="1.1" width="16" height="16" role="img">
                                            <path fill-rule="evenodd"
                                                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                        </svg>
                                        ${repo.stargazerCount}
                                    </li>
                                    <li class="list-item">
                                        <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16"
                                             version="1.1" width="16" height="16" role="img">
                                            <path fill-rule="evenodd"
                                                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                        </svg>
                                        ${repo.forkCount}
                                    </li>
                                    <li class="list-item">
                                        Updated on <em>${new Date(repo.updatedAt).toDateString()}</em>
                                    </li>
                                </ul>
                            </section>
                        </section>

                        <section class="part-2">
                            <button class="star-btn"
                                    title="Star ${user.login}/${repo.name}">
                                <svg class="octicon octicon-star" 
                                viewBox="0 0 16 16" 
                                version="1.1" width="16"
                                     height="16" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                </svg>
                                Star
                            </button>
                        </section>
                    </section>
                `);

            reposWrapper.innerHTML = reposString.join('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});
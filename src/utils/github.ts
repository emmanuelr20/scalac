import { getUser } from "../services/github";
import { ApiRepository, ApiContributor, Contributor, ContributedRepository, Repository } from "../types/Interfaces";

interface ContributorsRepositories {
    contributors: Contributor[];
    repositories: Map<string, Repository>;
}

export const parseContributors = (repos: ApiRepository[]):  Promise<ContributorsRepositories> => {
    let contributors = new Map<string, ApiContributor>();
    let repositories = new Map<string, Repository>();
    for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];
        repositories.set(repo.name, {
            name: repo.name,
            forks: repo.forks,
            full_name: repo.full_name,
            watchers: repo.watchers,
            open_issues: repo.open_issues,
            contributors: []
        });

        for (let j = 0; j < repo.contributors.length; j++) {
            let contributor = repo.contributors[j];
            
            if(contributor.author) {
                let oldContributor = contributors.get(contributor.author.login);
                const contributedRepository: ContributedRepository = {
                    name: repo.name,
                    contributions: repo.contributors[j].total
                };
                contributor = {
                    ...contributor,
                    contributions: oldContributor && oldContributor.contributions 
                        ? (oldContributor.contributions + contributor.total)
                        : contributor.total,
                    contributed_repos: oldContributor 
                        ? [
                            ...oldContributor.contributed_repos,
                            contributedRepository
                        ] 
                        : [contributedRepository]
                }
                contributor.author && contributors.set(contributor.author.login, contributor)
            }
        }
    }

    return parseUserInformation(Array.from(contributors.values()), repositories);
}

export const parseUserInformation = async (contributors: ApiContributor[], repositories: Map<string, Repository>): Promise<ContributorsRepositories> => {
    const requests = Array<Promise<any>>();
    for (let i = 0; i < contributors.length; i++) {
        requests.push(getUser(contributors[i].author.login));
    }
    const results = await Promise.all(requests);
    

    const users = Array<Contributor>();

    let contributed_repos: Array<ContributedRepository>;

    for (let i = 0; i < results.length; i++) {
        contributed_repos = contributors[i].contributed_repos.sort((a,b) => {
            if(a.contributions > b.contributions) return -1;
            if(a.contributions < b.contributions) return 1;
            return 0;
        });

        const user = {
            username: contributors[i].author.login,
            name: results[i].data.name,
            url: results[i].data.url,
            avatar: contributors[i].author.avatar_url,
            followers: results[i].data.followers,
            following: results[i].data.following,
            gists: results[i].data.public_gists,
            repos: results[i].data.public_repos,
            contributions: contributors[i].contributions || 0,
            contributed_repos: contributed_repos,
        }

        //add user to repos they contributed to for speed;
        contributed_repos.forEach(r => {
            const repo = repositories.get(r.name);
            repo?.contributors.push(user);
            repo && repositories.set(r.name, {...repo});
        });

        users.push( user );
    }

    return {
        contributors: users, 
        repositories
    };
}
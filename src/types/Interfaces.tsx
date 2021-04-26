export interface ApiContributor {
    author: {
        login: string,
        avatar_url: string,
    },
    contributed_repos: Array<ContributedRepository>,
    contributions?: number,
    total: number
}

export interface Contributor {
    username: string,
    name: string,
    url: string,
    avatar: string,
    followers: number,
    following: number,
    gists: number,
    repos: number,
    contributions: number,
    contributed_repos: Array<ContributedRepository>,
}

export interface ApiRepository {
    name: string,
    full_name: string,
    forks: number,
    watchers: number,
    open_issues: number,
    contributors: Array<ApiContributor>
}

export interface Repository {
    name: string,
    full_name: string,
    forks: number,
    watchers: number,
    open_issues: number,
    contributors: Array<Contributor>
}

export interface ContributedRepository {
    name: string,
    contributions: number
}

import axios from 'axios';
import { githubUrl, githubAccessToken } from '../config.json';

const requestQuery = `?access_token=${githubAccessToken}`;

export const getOrgRepos = (org: string): Promise<any> => {
    return axios.get(`${githubUrl}orgs/${org}/repos${requestQuery}`);
}

export const getUser = (login: string): Promise<any> => {
    return axios.get(`${githubUrl}users/${login}${requestQuery}`);
}

export const getOrgReposWithContributors = async (org: string): Promise<any> => {
    const { data } = await getOrgRepos(org);
    const repoPromises: Array<Promise<any>> = [];
    for (let i = 0; i < data.length; i++) {
        const repo = data[i];
        repoPromises.push(new Promise((resolve, reject) => {
            return axios.get(`${githubUrl}repos/${org}/${repo.name}/stats/contributors${requestQuery}`)
                .then(({ data }) => {
                    repo.contributors = data;
                    return resolve(repo);
                })
                .catch((err) => reject(err));
        }));
    }
    return Promise.all(repoPromises);
}
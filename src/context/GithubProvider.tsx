import React, { createContext, useContext, useState } from 'react';
import { getOrgReposWithContributors } from '../services/github';
import { organization } from '../config.json';
import { parseContributors } from '../utils/github';
import { Repository, Contributor } from "../types/Interfaces";


interface ContributorsData {
    baseContributors: Array<Contributor>;
    repos: Map<string, Repository>;
    fetchingData: boolean;
    pageTitle: string;
    fetchData: () => void;
    getContributor: (username: string) => undefined | Contributor;
    getRepository: (name: string) => undefined | Repository;
    setPageTitle: (title: string) => void;
}

interface Props {
    children: React.ReactNode
}

export const GithubContext = createContext<undefined | ContributorsData>(undefined);

export default function GithubProvider({ children }: Props) {

    const [baseContributors, setBaseContributors] = useState(new Array<Contributor>());
    const [repos, setRepos] = useState(new Map<string, Repository>());
    const [fetchingData, setFetchingData] = useState(true);
    const [pageTitle, setPageTitle] = useState("Contributors");


    const fetchData = async () => {
        setFetchingData(true);
        try {
            let serializedData = await localStorage.getItem('github-data');
            if (serializedData) {
                const localData = JSON.parse(serializedData);
                setRepos(localData.repos || []);
                setBaseContributors(localData.contributors || []);
            }
            const repos = await getOrgReposWithContributors(organization);
            const {contributors, repositories} = await parseContributors(repos);
            setRepos(repositories);
            setBaseContributors(contributors);
            try {
                localStorage.setItem('github-data', JSON.stringify({
                    repos,
                    contributors
                }));
            } catch (error) {
                //Not enough space
            }
            setFetchingData(false);
        } catch (error) {
            setFetchingData(false);
            throw error;
        }
    }


    const getContributor = (username: string): undefined | Contributor => {
        return baseContributors.find(contributor => contributor.username.toLowerCase() === username.toLowerCase());
    }

    const getRepository = (name: string): undefined | Repository => {
        return repos.get(name);
    }


    return (
        <GithubContext.Provider value={{
            baseContributors,
            repos,
            fetchingData,
            fetchData,
            pageTitle,
            setPageTitle,
            getContributor,
            getRepository
        }}>
            { children}
        </GithubContext.Provider>
    )
}


export function useGithubContext() {
    const context = useContext(GithubContext);

    if (!context) {
        throw new Error('Contributor Context can only be used with ContributorProvider')
    }

    return context;
}
import React, { useState, useEffect, Fragment } from 'react'
import ContributorList from '../components/ContributorList';
import RepositoryLoader from '../components/loaders/RepositoryLoader';
import { useGithubContext } from '../context/GithubProvider';
import { Repository as RepositoryInterface } from '../types/Interfaces';
import useFilteredContributor from '../hooks/useFilteredContributor';
import ContributorsFilter from '../components/ContributorsFilter';
import RepoCard from '../components/RepoCard';
import ContributorsLoader from '../components/loaders/ContributorsLoader';
import Error from '../components/Error';

interface Props {
    match: {
        params: {
            name: string
        }
    }
}


export default function Repository({ match: { params: { name } } }: Props) {
    const [loading, setLoading] = useState(true);
    const [repo, setRepo] = useState<undefined | RepositoryInterface>(undefined);

    const { filteredContributors, setBaseContributors, setMagnitude, setOrdering, filtering } = useFilteredContributor();

    const { getRepository, fetchingData, setPageTitle } = useGithubContext();

    useEffect(() => {
        repo && setBaseContributors(repo.contributors)
        // eslint-disable-next-line
    }, [repo]);

    useEffect(() => {
        setPageTitle(name)
        setLoading(true);
        setTimeout(() => {
            setRepo(getRepository(name));
            setLoading(false);
        }, 500);
    }, [getRepository, name, setPageTitle]);

    return (
        <div>
            {
                loading || fetchingData
                    ? <RepositoryLoader />
                    : repo
                        ? <Fragment>
                            <RepoCard repo={repo} />
                            <div>
                                <p className="sub-title">Contributors</p>
                                <hr className="sub-divider"/>
                                <ContributorsFilter
                                    setMagnitude={setMagnitude}
                                    setOrdering={setOrdering}
                                />
                                {
                                    filtering 
                                        ? <ContributorsLoader />
                                        :<ContributorList contributors={filteredContributors} />
                                }
                            </div>
                        </Fragment>
                        : <Error message={"Repository Not Found"} />
            }
        </div>
    )
}

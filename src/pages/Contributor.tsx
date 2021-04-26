import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ContributorCard from '../components/ContributorCard';
import Error from '../components/Error';
import ContributorLoader from '../components/loaders/ContributorLoader';
import { useGithubContext } from '../context/GithubProvider';
import { ContributedRepository, Contributor as ContributorInteface } from '../types/Interfaces';
interface Props {
    match: {
        params: {
            username: string
        }
    }
}

export default function Contributor({ match: { params: { username } } }: Props) {

    const [loading, setLoading] = useState(true);
    const [contributor, setContributor] = useState<undefined | ContributorInteface>(undefined);

    const { getContributor, fetchingData, setPageTitle } = useGithubContext();

    useEffect(() => {
        setPageTitle(username)
        setLoading(true);
        setTimeout(() => {
            setContributor(getContributor(username));
            setLoading(false);
        }, 500);
    }, [getContributor, username, setPageTitle]);

    return (
        <div>
            {
                loading || fetchingData
                    ? <ContributorLoader />
                    : contributor
                        ? <Fragment>
                            <ContributorCard contributor={contributor} />
                            <div>
                                <p className="sub-title">Repository Contribution</p>
                                <hr className="sub-divider"/>
                                <br />
                                {
                                    contributor.contributed_repos.map((repo: ContributedRepository) => (
                                        <Link to={`/repos/${repo.name}`} key={repo.name}>
                                            <div className="item-card" >
                                                {repo.name}
                                                <span className="tag">{repo.contributions}</span>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </Fragment>
                        : <Error message={"Contributor Not Found"} />
            }
        </div>
    )
}

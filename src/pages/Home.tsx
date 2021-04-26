import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { useGithubContext } from '../context/GithubProvider';
import { Contributor } from '../types/Interfaces';
import ContributorsFilter from '../components/ContributorsFilter';
import ContributorsLoader from '../components/loaders/ContributorsLoader';
import ContributorList from '../components/ContributorList';
import useFilteredContributor from '../hooks/useFilteredContributor';
import Error from '../components/Error';

export default function Home() {

    const PER_PAGE = 20;

    const { baseContributors, setPageTitle, fetchingData } = useGithubContext();

    const [contributors, setContributors] = useState(new Array<Contributor>());
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageEnd, setPageEnd] = useState(false);
    const { filteredContributors, setBaseContributors, setMagnitude, setOrdering, filtering } = useFilteredContributor();



    const loadContributors = (): void => {
        setLoading(true);
        setTimeout(() => {
            setContributors(filteredContributors.slice(0, PER_PAGE * (page + 1)));
            if (contributors.length >= filteredContributors.length) {
                setPageEnd(true);
            } else {
                setPageEnd(false);
            }
            setPage(page + 1);
            setLoading(false);
        }, 500)
    }

    useEffect(() => {
        if (contributors.length >= filteredContributors.length) {
            setPageEnd(true);
        } else {
            setPageEnd(false);
        }
    }, [contributors, filteredContributors])

    useEffect(() => {
        setBaseContributors(baseContributors)
        // eslint-disable-next-line
    }, [baseContributors])

    useEffect(() => {
        setPage(0);
        setContributors([]);
        loadContributors();
        setPageEnd(false);
        setPageTitle(`Contributors (${filteredContributors.length})`)
        // eslint-disable-next-line
    }, [filteredContributors]);

    useLayoutEffect(() => {
        const handleScroll = () => {
            console.log(loading, pageEnd)
            if (
                window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
                loading || pageEnd
            ) return;

            loadContributors();
        }
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line
    }, [contributors, page, loading, filteredContributors]);


    return (
        <div >
            {(filtering || fetchingData || loading)
                ? <ContributorsLoader />
                : baseContributors && baseContributors.length
                    ? <Fragment>
                        <ContributorsFilter
                            setMagnitude={setMagnitude}
                            setOrdering={setOrdering}
                        /><ContributorList contributors={contributors} />
                    </Fragment>
                    : <Error />
            }
        </div>
    )
}

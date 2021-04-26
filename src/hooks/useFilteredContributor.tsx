import React, { useEffect, useState } from 'react'
import { ContributorsOrdering, OrderingMagnitude } from '../types/Enums';
import { Contributor } from '../types/Interfaces';

interface FilteredContributorHook {
    filtering: boolean;
    setOrdering: React.Dispatch<React.SetStateAction<ContributorsOrdering>>;
    setMagnitude: React.Dispatch<React.SetStateAction<OrderingMagnitude>>;
    filteredContributors: Contributor[];
    setBaseContributors: React.Dispatch<React.SetStateAction<Contributor[]>>;
}
export default function useFilteredContributor(): FilteredContributorHook {

    const [ordering, setOrdering] = useState(ContributorsOrdering.Contributions);
    const [magnitude, setMagnitude] = useState(OrderingMagnitude.Descending);
    const [filtering, setFiltering] = useState(false);
    const [filteredContributors, setFilteredContributors] = useState(Array<Contributor>());
    const [baseContributors, setBaseContributors] = useState(Array<Contributor>());

    const filterContributors = () => {
        setFiltering(true)
        let filteredContributors: Contributor[] = baseContributors.slice();

        filteredContributors.sort((a: Contributor, b: Contributor): number => {
            if (magnitude === OrderingMagnitude.Ascending) {
                if(a[ordering] < b[ordering]) { return -1; }
                if(a[ordering] > b[ordering]) { return 1; }
                return 0;
            }
            if(a[ordering] > b[ordering]) { return -1; }
            if(a[ordering] < b[ordering]) { return 1; }
            return 0;
        });

        setFilteredContributors(filteredContributors);
       
        setTimeout(() => {
            setFiltering(false)
        }, 500);
    }

    useEffect(() => {
        filterContributors();
        // eslint-disable-next-line
    }, [baseContributors, ordering, magnitude]);

    return {
        filtering,
        setOrdering,
        setMagnitude,
        filteredContributors,
        setBaseContributors
    }
}

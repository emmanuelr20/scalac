import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Contributor } from '../types/Interfaces'
import ContributorCard from './ContributorCard'
import CssTransitionContainer from './CssTransitionContainer'

interface Props {
    contributors: Array<Contributor>;
}

export default function ContributorList({ contributors }: Props) {
    return (
        <TransitionGroup>
            {contributors.map((contributor, index) => (
                <CssTransitionContainer
                    key={index}>
                    <ContributorCard key={contributor.username} contributor={contributor} />
                </CssTransitionContainer>
            ))}
        </TransitionGroup>
    )
}

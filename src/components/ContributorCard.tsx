import React from 'react'
import { Contributor } from '../types/Interfaces'
import { ReactComponent as ContributionsIcon } from "../svg/contributions.svg";
import { ReactComponent as GistsIcon } from "../svg/gists.svg";
import { ReactComponent as ReposIcon } from "../svg/repos.svg";
import { ReactComponent as FollowersIcon } from "../svg/followers.svg";
import { Link } from 'react-router-dom';

interface Props {
    contributor: Contributor
}
export default function ContributorCard({ contributor }: Props) {
    return (
        <Link to={`/contributors/${contributor.username}`}>
            <div className="item-card">
                <div className="item-avatar">
                    <img src={contributor.avatar} alt={contributor.username} />
                </div>
                <div className="item-info">
                    <div className="item-name">{contributor.name}</div>
                    <div className="item-username">@{contributor.username.toLowerCase()}</div>
                    <div className="item-stats">
                        <div className="item-stats-item">
                            <ContributionsIcon />
                            <span className="item-stats-score">{contributor.contributions}</span>
                            <span className="item-stats-title">Contributions</span>
                        </div>
                        <div className="item-stats-item">
                            <ReposIcon />
                            <span className="item-stats-score">{contributor.contributed_repos.length}</span>
                            <span className="item-stats-title">Repository</span>
                        </div>
                        <div className="item-stats-item">
                            <FollowersIcon />
                            <span className="item-stats-score">{contributor.followers}</span>
                            <span className="item-stats-title">Followers</span>
                        </div>
                        <div className="item-stats-item">
                            <GistsIcon />
                            <span className="item-stats-score">{contributor.gists}</span>
                            <span className="item-stats-title">Gists</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

import React from 'react'
import { Repository } from '../types/Interfaces'
import { ReactComponent as ContributionsIcon } from "../svg/contributions.svg";
import { ReactComponent as GistsIcon } from "../svg/gists.svg";
import { ReactComponent as ReposIcon } from "../svg/repos.svg";
import { ReactComponent as FollowersIcon } from "../svg/followers.svg";

interface Props {
    repo: Repository
}

export default function RepoCard({ repo }: Props) {
    return (
        <div className="item-card">
            <div className="item-info">
                <div className="item-name">{repo.name}</div>
                <div className="item-itemname">@{repo.full_name}</div>
                <div className="item-stats">
                    <div className="item-stats-item">
                        <ContributionsIcon />
                        <span className="item-stats-score">{repo.contributors?.length || 0}</span>
                        <span className="item-stats-title">Contributors</span>
                    </div>
                    <div className="item-stats-item">
                        <GistsIcon />
                        <span className="item-stats-score">{repo.forks}</span>
                        <span className="item-stats-title">Forks</span>
                    </div>
                    <div className="item-stats-item">
                        <ReposIcon />
                        <span className="item-stats-score">{repo.watchers}</span>
                        <span className="item-stats-title">Watchers</span>
                    </div>
                    <div className="item-stats-item">
                        <FollowersIcon />
                        <span className="item-stats-score">{repo.open_issues}</span>
                        <span className="item-stats-title">Open Issues</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

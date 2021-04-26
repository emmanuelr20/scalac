import React from 'react';
import { ContributorsOrdering, OrderingMagnitude } from '../types/Enums';

interface Props {
    setMagnitude: React.Dispatch<React.SetStateAction<any>>;
    setOrdering: React.Dispatch<React.SetStateAction<any>>;
}

export default function ContributorsFilter( { setMagnitude, setOrdering }: Props) {
    const orderOptions: ContributorsOrdering[] = Object.values(ContributorsOrdering);
    const magnitudes: OrderingMagnitude[] = Object.values(OrderingMagnitude);
    return (
        <div className="page-filters">
            <div className="filter-item">
                <div className="filter-label">Magnitude</div>
                <select onChange={e => setMagnitude(e.target.value)}>
                    {
                        magnitudes.map((option => (
                            <option key={option} value={option}>{option}</option>
                        )))
                    }
                </select>
            </div>
            <div className="filter-item">
                <div className="filter-label">Sort by</div>
                <select onChange={e => setOrdering(e.target.value)}>
                    {
                        orderOptions.map((option => (
                            <option key={option} value={option}>{option}</option>
                        )))
                    }
                </select>
            </div>
        </div>
    )
}

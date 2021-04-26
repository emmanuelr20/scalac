import React from 'react'
import ContentLoader from 'react-content-loader'

export default function RepositoryLoader() {
    return (
        <div>
            <div className="item-card">
                <ContentLoader
                    height={85}
                    speed={1}
                    backgroundColor={'#dedede'}
                    foregroundColor={'#efefef'}
                    viewBox="0 0 350 70"
                >
                    <rect x="0" y="5" rx="4" ry="4" width="300" height="15" />
                    <rect x="0" y="30" rx="3" ry="3" width="150" height="10" />
                    <rect x="0" y="55" rx="3" ry="3" width="150" height="10" />
                    <rect x="160" y="55" rx="3" ry="3" width="150" height="10" />
                    <rect x="320" y="55" rx="3" ry="3" width="150" height="10" />
                </ContentLoader>
            </div>
            <div>
                <ContentLoader
                    height={15}
                    speed={1}
                    backgroundColor={'#dedede'}
                    foregroundColor={'#efefef'}
                    viewBox="0 0 350 10"
                >
                    <rect x="0" y="0" rx="5" ry="5" width="150" height="10" />
                </ContentLoader>
            </div>
            <br />
            {
                Array(7).fill(1).map((val, index) => <div className="item-card" key={index} >
                    <ContentLoader
                        height={85}
                        speed={1}
                        backgroundColor={'#dedede'}
                        foregroundColor={'#efefef'}
                        viewBox="0 0 350 70"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                        <rect x="80" y="5" rx="4" ry="4" width="300" height="15" />
                        <rect x="80" y="30" rx="3" ry="3" width="150" height="10" />
                        <rect x="80" y="55" rx="3" ry="3" width="150" height="10" />
                        <rect x="240" y="55" rx="3" ry="3" width="150" height="10" />
                        <rect x="400" y="55" rx="3" ry="3" width="150" height="10" />
                    </ContentLoader>
                </div>)
            }
        </div>
    )
}

    import React from 'react'

    interface Props {
        isUpdating: boolean
    }
    
    export default function DataLoader({ isUpdating }: Props) {
        return (
            <div className="main-data-loader-container">
                <span className="lds-dual-ring"></span>
                <span>
                    {isUpdating ? "Updating Data..." : "Loading Data ..."} 
                </span>
            </div>
        )
    }
    
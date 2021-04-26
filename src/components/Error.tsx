import React from 'react'

import { ReactComponent as ErrorIcon } from "../svg/no-data.svg";
interface Props {
    message ?: string;
}
export default function Error({message}: Props) {
    return (
        <div className="error-view">
            <div>
                <ErrorIcon />
            </div>
            <div>
                <p>{message || 'Oops somthing went wrong!'}</p>
            </div>
        </div>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useGithubContext } from '../../context/GithubProvider';

export default function Header() {
    const { pageTitle } = useGithubContext();
    return (
        <header>
            <div className="container">
                <div className="main-header">
                    <Link to="/">
                        <div className="logo-container">
                            <img src="/dist/img/logo.png" alt="logo" className="logo" />
                            <span className="brand-title">Angular</span>
                        </div>
                    </Link>
                </div>
                <div className="sub-header">
                    <div className="page-title">
                        {pageTitle}
                    </div>
                </div>
            </div>
        </header>
    )
}

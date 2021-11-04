import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

const Header = () => {
    const history = useHistory()
    const authToken = localStorage.getItem(AUTH_TOKEN)

    const renderPostCreateButton = () => {
        return (
            <div className="flex">
                <div className="ml1">|</div>
                <Link
                    to="/create"
                    className="ml1 no-underline black"
                >
                    submit
                </Link>
            </div>
        )
    }

    const renderBasicButtons = () => {
        return (
            <>
                <Link to="/" className="ml1 no-underline black">
                    new
                </Link>
                <div className="ml1">|</div>
                <Link to="/search" className="ml1 no-underline black">
                    search
                </Link>
                <div className="ml1">|</div>
                <Link to='/top' className="ml1 no-underline black">
                    top
                </Link>
            </>
        )
    }

    const renderLoginOutButtons = () => {
        return (
            <div className="flex flex-fixed">
                {authToken ? (
                <div
                    className="ml1 pointer black"
                    onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    history.push(`/`);
                    }}
                >
                    logout
                </div>
                ) : (
                <Link
                    to="/login"
                    className="ml1 no-underline black"
                >
                    login
                </Link>
                )}
            </div> 
        )
    }

  return (
    <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
            <div className="fw7 mr1">Hacker News</div>
            {renderBasicButtons()}
            {authToken && (
                renderPostCreateButton()
            )}
        </div>
        {renderLoginOutButtons()}
    </div>
  )
};

export default Header;
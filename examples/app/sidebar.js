import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li><Link to="/">基础</Link></li>
                    <li><Link to="/">Button</Link></li>
                    <li><Link to="/">Tab</Link></li>
                </ul>
            </div>
        );
    }
}

SideBar.propTypes = {

};

export default SideBar;
import React, {Component} from 'react';
import Header from './header';
import SideBar from './sidebar';

import './style/index.less';

class App extends Component {
    render() {
        return (
            <div className="content">
                <Header />
                <SideBar />
                <div className="main">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default App;
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {TabContainer, Tab} from '../../dist';

class TabView extends Component {
    render() {
        return (
            <div>
                <TabContainer className="">
                    <Tab>aaaaaaa</Tab>
                    <Tab>bbbbbbb</Tab>
                    <Tab>ccccccc</Tab>
                </TabContainer>
            </div>
        );
    }
}

export default TabView;

import React, {Component, PropTypes} from 'react';

class Tab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            firstLoad: false // 是否第一次加载过
        };
    }

    componentWillMount () {
        this.updateLoadState(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.updateLoadState(nextProps);
    }

    updateLoadState (props) {
        let me = this;
        const {active, index} = props;
        let state = me.state;
        let isActive = active === index;

        if (isActive && state.firstLoad === false) {
            this.setState({
                firstLoad: isActive
            });
        }
    }
    
    render () {
        let me = this;
        const { firstLoad } = me.state;
        const { active, index, lazyLoad, children, className } = me.props;

        return (
            <div className={`${className} ${active === index ? 'show' : 'hide'}`}>
            {
                lazyLoad ? (firstLoad ? children : null) : children
            }
            </div>
        );
    }
}

Tab.defaultProps = {
    lazyLoad: true,
    className: ''
}

Tab.propTypes = {
    active: React.PropTypes.number,
    index: React.PropTypes.number,
    lazyLoad: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default Tab;
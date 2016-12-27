import React, {Component, PropTypes} from 'react';

class TabContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            active: 0
        }
    }

    changeTab (i) {
        let me = this;
        let props = me.props;
        const {navs = [], active, className, children} = me.props;

        props.onClick && props.onClick();
        if (active != i) { // onChange event handler
            props.onChange && props.onChange(i);
        }
        navs[i]['onClick'] && navs[i]['onClick'](i);
        
        me.setState({
            active: i
        });
    }
    
    getChildTabs () {
        /** 
         * @desc 获取各tab子元素，传递index，active两个props选项，返回一组子元素
        */
        let me = this;
        let {active} = me.state;
        let {children, lazyLoad} = me.props;
        
        if (!children) {
            return null;
        }

        let list = React.Children.toArray(children);
        
        return list.map((item, index) => {
            return React.cloneElement(item, {
                index,
                active
            })
        });
    }

    render () {
        let me = this;
        const {navs = [], className, children} = me.props;
        const {active} = me.state;
        const childrens = me.getChildTabs();

        return (
            <div className={`tab-container ${className}`}>
                <ul className="tab-nav clearfix">
                {navs.map((item, i) => {
                    return (
                        <li className={i === active ? 'active' : null} key={i}>
                            <a href="javascript:void(0)" onClick={me.changeTab.bind(me, i)}>{item.title}</a>
                            {
                                item.children
                            }
                        </li>
                    )
                })}
                </ul>
                <div className="tab-wrapper">
                {
                    childrens
                }
                </div>
            </div>
        );
    }
}

TabContainer.defaultProps = {
    className: ''
}

TabContainer.PropTypes = {
    navs: React.PropTypes.array,
    className: React.PropTypes.string
};

export default TabContainer;

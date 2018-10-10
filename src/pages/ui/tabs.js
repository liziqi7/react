import React from 'react'
import { Card, message, Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
export default class Messages extends React.Component {

    handleCallback = (key) => {
        message.info('Hi you are ' + key);
    }
    componentWillMount() {
        this.newTabIndex = 0;
        const panes = [{
            title: "Tab 1",
            key: '1',
            content: "Tab 1"
        }, {
            title: "Tab 2",
            key: '2',
            content: "Tab 2"
        }, {
            title: "Tab 3",
            key: '3',
            content: "Tab 3",closable: false
        }]
        this.setState({activeKey: panes[0].key, panes })
    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab可关闭卡片式页签" className="card-wrap">
                    <Tabs 
                        type="editable-card" 
                        activeKey={this.state.activeKey} 
                        onChange={this.onChange} 
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                    closable={panel.closable}
                                >
                                    {panel.content}
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>


            </div>
        )
    }
}
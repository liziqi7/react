import React from 'react'

export default class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: 0 };
    }
   
    componentWillMount(){
        console.log('will mount');
    }
    componentDidMount(){
        console.log('did mount')
    }

    componentWillReceiveProps = (nextProps) => {
      console.log('will prop: '+ nextProps.name);
    }
    

    shouldComponentUpdate = (nextProps, nextState) => {
      console.log('should update:'+nextProps.name);
      return true;
    }
    
    componentWillUpdate = (nextProps, nextState) => {
        console.log('will update:'+nextProps.name);
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        console.log('did update:'+prevProps.name);
    }
    
    
    

    render() {       
        return (
        <div>
            <p>这里是子组件</p>
			<p>{this.props.name}</p>
		</div>
        )
    }
}
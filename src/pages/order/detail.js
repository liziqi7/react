import React from 'react'
export default class Detail extends React.Component {
    render() {
        return (
            <div>
                this is Detail page.{this.props.match.params.orderId}
            </div>
        )
    }
}
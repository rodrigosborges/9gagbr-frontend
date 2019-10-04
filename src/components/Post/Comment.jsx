import React from 'react';

export default class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <div className="text-left mt-1 ml-2">
                    <div className=""> 
                        <b>{this.props.name}</b> · {this.props.date}
                    </div>
                </div>
                <div className="text-left mt-1 ml-2">{this.props.message}</div>
            </div>
        )
    }
}
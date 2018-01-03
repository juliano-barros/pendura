import React, {Component} from 'react';

export default class ProgressBarLte extends Component {

	render(){
		return( 
				<div className= {`progress ${this.props.progressSize} ${this.props.active}`}>
	                <div className={`progress-bar ${this.props.color} ${this.props.active} ${this.props.layout}`} role="progressbar" aria-valuenow={this.props.value} aria-valuemin="0" aria-valuemax={this.props.valueMax} style={{width:this.props.value + '%'}}>
	                  <span className="sr-only">20% Complete</span>
	                </div>
	              </div>
			)
	}

}

ProgressBarLte.defaultProps = {
	progressSize: 'progress-sm',
	active: 'active',
	color: 'progress-bar-success',
	layout: 'rogress-bar-striped',
	value: 0,
	valueMax: 100
};







              
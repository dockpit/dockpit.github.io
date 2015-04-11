import React from 'react';
import Immutable from 'immutable'
import Showdown from 'showdown'
import ImmutablePropTypes from 'react-immutable-proptypes'

var featureType = ImmutablePropTypes.shape({
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired
})

class Feature extends React.Component {
	constructor(props) { 
		super(props) 
		this.converter = new Showdown.converter()
	}	

	render() {
		var title = this.converter.makeHtml(this.props.feature.get('title'))
		var description = this.converter.makeHtml(this.props.feature.get('description'))

		return <li className="row">
			<div className="col-md-6 text">
				<h3 dangerouslySetInnerHTML={{__html: title}}></h3>
				<div dangerouslySetInnerHTML={{__html: description}}></div>
			</div>
			<div className="col-md-6 img">
				<img src={this.props.feature.get('image')} />
			</div>
		</li>
	}
}

Feature.propTypes = {
	feature: featureType.isRequired
}
 
class Features extends React.Component {
    constructor(props) { super(props) }

	render() {
		return <div id="features">
			<div className="container" >			
				<h2>Features:</h2>
				<ul>
					{this.props.features.map(function(f, i){
						return <Feature key={i} feature={f}/>
					})}
				</ul>
			</div>
		</div>
	}
}

Features.propTypes = {
	features: ImmutablePropTypes.listOf(featureType).isRequired
}

export default Features;
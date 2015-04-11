import React from 'react';
import Showdown from 'showdown'
 
class WhatIsIt extends React.Component {
    constructor(props) { 
    	super(props) 
    	this.converter = new Showdown.converter()
    }

	render() {
		var oneLiner = this.converter.makeHtml(this.props.oneLiner)

		return <div id="what-is-it">
			<div className="container" >			
				<h2>What is Dockpit?</h2>
				<div className="lead" dangerouslySetInnerHTML={{__html: oneLiner}}></div>

				<div className="note-image">
					<img src="src/img/tour_drawing.png" />
				</div>

			</div>
		</div>
	}
}

WhatIsIt.propTypes = {
	oneLiner: React.PropTypes.string.isRequired,

}

export default WhatIsIt;
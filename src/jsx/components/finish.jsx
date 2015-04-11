import React from 'react';
import Showdown from 'showdown'
 
class Finish extends React.Component {
    constructor(props) { 
    	super(props) 
    	this.converter = new Showdown.converter()
    }

	render() {
		var catchPhrase = this.converter.makeHtml(this.props.catchPhrase)

		return <div id="finish">
			<div className="container" >			
				<div className="lead" dangerouslySetInnerHTML={{__html: catchPhrase}}></div>
	
		    	<a id="btn-download-bottom" href="download.html" className="btn btn-default">
			    	{this.props.btnCTA}&nbsp;&nbsp;<i className="fa fa-download"></i>
			    </a>
			    
			    <p className="text-muted">(Free and open-source)</p>		

			</div>


            <script dangerouslySetInnerHTML={{__html: `
                var dlb = document.getElementById('btn-download-bottom');
                analytics.trackLink(dlb, 'Clicked CTA - Download Page', {CTA: 'Visit Downloads', text: 'download', location: 'bottom'})
            `}} />

		</div>
	}
}

Finish.propTypes = {
	catchPhrase: React.PropTypes.string.isRequired,
	btnCTA: React.PropTypes.string.isRequired,
}

export default Finish;
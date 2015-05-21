import React from 'react';

import UIScreenshot from './ui_screenshot.jsx'
import Navbar from './navbar.jsx'

class Callout extends React.Component {
    constructor(props) { super(props) }

	render() {
		return <main id="callout">

		  <Navbar/>

		  <div className="container">
        <h1 style={{position: "absolute", "left": 0, "right": 0, "top": 170, "paddingLeft": 130}}>Dockpit</h1>
		  	<img style={{marginLeft: "-150px"}} className="logo" src="src/img/logo.png"/>
		    <p className="lead">{this.props.catchPhrase}</p>

		    <a id="btn-download-callout" href="download.html" className="btn btn-default">
		    	{this.props.btnCTA}&nbsp;&nbsp;<i className="fa fa-chevron-right"></i>
		    </a>

		    <p className="text-muted">(Free and open-source)</p>

		    <ul className="platforms">
		    	<li><img src="src/img/osx.png"/></li>
		    	<li><img src="src/img/linux.png"/></li>
		    	<li><img src="src/img/windows.png"/></li>
		    </ul>
		  </div>

		  <UIScreenshot/>

            <script dangerouslySetInnerHTML={{__html: `
                var dlb = document.getElementById('btn-download-callout');
                analytics.trackLink(dlb, 'Clicked CTA - Download Page', {CTA: 'Visit Downloads', text: 'lets solve', location: 'callout'})
            `}} />

		</main>
	}
}

Callout.propTypes = {
	catchPhrase: React.PropTypes.string.isRequired,
	btnCTA: React.PropTypes.string.isRequired,
}

export default Callout;

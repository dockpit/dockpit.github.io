import React from 'react';
 
class Navbar extends React.Component {
    constructor(props) { super(props) }

	render() {
		return 	<nav className="navbar navbar-default">
			<div className="container">
				<div className="navbar-header">
			     <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>

					<a className="navbar-brand" href="/">Dockpit</a>
				</div>

				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav navbar-right">
						<li>
							<a id="btn-github" href="https://github.com/dockpit/pit">
								<i className="fa fa-github">&nbsp;GitHub</i>
							</a>
						</li>
						<li>
							<form action="download.html">
								<button id="btn-download" className="btn navbar-btn btn-default">Download</button>
							</form>
						</li>
					</ul>
				</div>
			</div>

            <script dangerouslySetInnerHTML={{__html: `
                var gh = document.getElementById('btn-github');
                var dl = document.getElementById('btn-download');

                analytics.trackLink(gh, 'Clicked CTA - GitHub', {CTA: 'Visit GitHub', text: 'github', location: 'navbar'})               
                analytics.trackLink(dl, 'Clicked CTA - Download Page', {CTA: 'Visit Downloads', text: 'download', location: 'navbar'})
            `}} />

		</nav>
	}
}

Navbar.propTypes = {}

export default Navbar;
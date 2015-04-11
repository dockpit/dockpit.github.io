import React from 'react';
 
class Footer extends React.Component {
    constructor(props) { super(props) }

	render() {
		return 	<footer style={{heigth: "50px"}}>
			<div>
				Copyright © {new Date().getFullYear()} -&nbsp;
				<a id="link-linkedin" target="_blank" href="https://nl.linkedin.com/in/advanderveer">Ad van der Veer</a>&nbsp;
				<a target="_blank" href="mailto:ad@dockpit.io">(ad@dockpit.io)</a>
				
				<a style={{float: "right", marginTop: "-8px"}} href="https://mixpanel.com/f/partner">
					<img src="//cdn.mxpnl.com/site_media/images/partner/badge_light.png" alt="Mobile Analytics" />
				</a>
			</div>

            <script dangerouslySetInnerHTML={{__html: `
                var lnk = document.getElementById('link-linkedin');
                analytics.trackLink(lnk, 'Clicked CTA - Ad van der Veer', {CTA: 'Checkout Author', text: 'Ad van der Veer', location: 'footer'})
            `}} />
		</footer>
	}
}

Footer.propTypes = {}

export default Footer;
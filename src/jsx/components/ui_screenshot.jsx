import React from 'react';
 
class UIScreenshot extends React.Component {
    constructor(props) { super(props) }

	render() {
		return <div id="ui-screenshot" style={{width: "100%",textAlign: "center",}}>			
			<img src="src/img/ui_screenshot.png" />
		</div>
	}
}

export default UIScreenshot;
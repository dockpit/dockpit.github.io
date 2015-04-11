import React from 'react';
 
class Head extends React.Component {
	constructor(props) { super(props) }

	render() {
		return <head>
			<meta charSet="utf-8"/>			
			<title>Dockpit - {this.props.page}</title>
		
			<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>

			<link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'/>
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"/>		
			<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
			<link rel="stylesheet" href="main.css"/>

			__CONDITIONALS__
			__ANALYTICS__

			<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
		</head>
	}
}

Head.propTypes = { 
	page: React.PropTypes.string.isRequired 
}

export default Head;

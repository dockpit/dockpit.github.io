import React from 'react';
import Immutable from 'immutable'

import Head from './components/head.jsx'
import Footer from './components/footer.jsx'
import Callout from './components/callout.jsx'
import WhatIsIt from './components/what_is_it.jsx'
import Features from './components/features.jsx'
import Finish from './components/finish.jsx'

class IndexPage extends React.Component {
  constructor(props) { super(props) }
  render() {
    return <html lang="en" id="homepage">

    	<Head page="Home"/>
    	<body>
			
    		<Callout 
    			catchPhrase="Because handling (micro)service dependencies during development is a pain."
    			btnCTA="Lets solve it in 5 minutes"
    		/>
    		
    		<WhatIsIt
    			oneLiner="Dockpit makes it trivial to develop your (micro)service in isolation. 
    			It __mocks__ the APIs you depend on and puts __data stores__, __message queus__ and __service registries__ in predictable states"
    		/>

    		<Features features={Immutable.fromJS([
                {
                    title: "__Templates__ for the technologies you already know",
                    description: "Quickly setup commonly used technologies with  build-in templates that let you configure them right away. Is your favorite technology not yet included? You can always setup anything you want by writing your own [Dockerfiles.](https://docs.docker.com/reference/builder/)",
                    image: "src/img/f_image_templates.png"
                },
                {
                    title: "__Dockerfile editor__ with immediate feedback",
                    description: "The state of dependencies are configured using Dockerfiles. Dockpit comes with an editor that allows you to build and test the resulting image immediately for quick feedback.",
                    image: "src/img/f_image_editor.png"
                },
                {
                    title: "__Different Isolations__ for different Scenarios",
                    description: "Different tests might need different data in the database, or maybe do you want to see what happens if your service registry is down? You can configure multiple isolations with different states for each dependency to test any scenario you can imagine.",
                    image: "src/img/f_image_isolations.png"
                },
                {
                    title: "A __Terminal UI__ for quickly switching between isolations ",
                    description: "We know you feel comfortable in your Terminal.  Dockpit comes with a Terminal UI that allows you to quickly switch between different isolations without ever lifting your hands off the keyboard.",
                    image: "src/img/f_image_terminal.png"
                }
            ])}/>

            <Finish
                catchPhrase="Decouple your (micro)services like the rest of you code"
                btnCTA="Download Dockpit"
            />

            <Footer/>

            <script dangerouslySetInnerHTML={{__html: `                
                analytics.page('Landing');
            `}} />
    	</body>
    </html>
  }
}
 
IndexPage.propTypes = {}

export default IndexPage;
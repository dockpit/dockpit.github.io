import React from 'react';
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Head from './components/head.jsx'
import Footer from './components/footer.jsx'
import Navbar from './components/navbar.jsx'

class Platform extends React.Component {
    constructor(props) { super(props) }

    render() {
        var me = this
        return <li className="row">
            <div className="col-md-2 icon"><img height="100" src={'src/img/' + this.props.name.toLowerCase() +".png"}/></div>
            <div className="col-md-3 links">                    
                <h2>{this.props.name}</h2>

                {this.props.platformAssets.map(function(a, i){
                    return <a id={"rel-asset-link-"+me.props.name.toLowerCase()+`-`+i} key={i} href={a.get('browser_download_url')}>
                        {a.get('name').match("amd64") ? '64-bit' : '32-bit'}

                        <script dangerouslySetInnerHTML={{__html: `                
                            analytics.trackLink(document.getElementById('rel-asset-link-`+me.props.name.toLowerCase()+`-`+i+`'), 'Clicked CTA - Download Asset', {
                                text: '`+a.get('name')+`',
                                asset: '`+a.get('name')+`',
                                CTA: 'Download',
                            })
                        `}} />  

                    </a>                
                })}
                
            </div>

            <div className="col-md-7 script">                
                {this.props.name.toLowerCase() !== "windows" ? <span>download, unzip and move to /usr/local/bin:</span> :null }
                {this.props.name.toLowerCase() !== "windows" ? <pre id={"rel-asset-script-"+this.props.name.toLowerCase()}> curl -sSL {this.props.platformAssets.get(0).get('browser_download_url')} > dockpit.zip; unzip -o dockpit.zip; mv -f pit /usr/local/bin/pit; rm dockpit.zip</pre> : null }
            </div>

            <script dangerouslySetInnerHTML={{__html: `                
                analytics.trackLink(document.getElementById('rel-asset-script-`+this.props.name.toLowerCase()+`'), 'Clicked CTA - Download Script', {
                    text: 'curl',
                    asset: '`+this.props.platformAssets.get(0).get('name')+`',
                    CTA: 'Download',
                })
            `}} />            
        </li>
    }    
}

Platform.propTypes = { 
    name: React.PropTypes.string.isRequired,   
    platformAssets: ImmutablePropTypes.listOf(
        ImmutablePropTypes.shape({
            browser_download_url: React.PropTypes.string.isRequired
        })
    ).isRequired
}

class DownloadPage extends React.Component {
  constructor(props) { super(props) }

  render() {

    //organize assets
    var assets = Immutable.fromJS(this.props.latestRelease.assets)    
    var platforms = Immutable.Map({
        OSX: Immutable.List(),    
        Linux: Immutable.List(),
        Windows: Immutable.List(),
    })

    var checksums
    assets.forEach(function(asset){
      if (/SHA256SUMS/.test(asset.get('name'))) {
        checksums = asset
      } else if (/darwin/.test(asset.get('name'))) {
        platforms = platforms.set('OSX', platforms.get('OSX').push(asset))
      } else if (/windows/.test(asset.get('name'))) {
        platforms = platforms.set('Windows', platforms.get('Windows').push(asset))
      } else if (/linux/.test(asset.get('name'))) {
        platforms = platforms.set('Linux', platforms.get('Linux').push(asset))
      }
    })

    return <html lang="en" id="download">
    	<Head page="Home"/>
    	<body>

            <Navbar/>
			
            <div className="container">
                <div id="download-panel" className="center-block">
                    <h1>Download Dockpit</h1>
                    <p>
                        {this.props.intro}&nbsp;
                        <a href={checksums.get('browser_download_url')}>here</a>.</p>
                    <hr/>

                    <ul>
                        {platforms.map(function(p, name){
                            return <Platform name={name} platformAssets={p} />
                        })}
                    </ul>
                </div>
            </div>

            <Footer/>


            <script dangerouslySetInnerHTML={{__html: `                
                analytics.page('Download');
            `}} />
    	</body>
    </html>
  }
}
 
DownloadPage.defaultProps = { 
    intro: "Dockpit is written in Go and compiled to a single ~15mb binary, below are all the available downloads for the latest version. SHA-256 checksums are available"
}

DownloadPage.propTypes = {    
    latestRelease: React.PropTypes.shape({
      name: React.PropTypes.string,
      assets: React.PropTypes.array
    }).isRequired,
}

export default DownloadPage;
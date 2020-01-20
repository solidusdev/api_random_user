import React, { Component, Fragment } from "react";

class RandomUser extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            
            data: [],
            firstName: "",
            lastName: "",
            singleImage: ""
        }
    }

    componentDidMount() {
        this.fillBackgroundImages();
        this.changeUser();
    }

    fillBackgroundImages = () => {
        
        fetch("https://randomuser.me/api/?results=500")   // fetching the url
        .then(results => results.json())
        .then(obj => {
            this.setState({
                data: obj.results // setting the property "results" (object) to the data (array)
            });
        })
    }

    changeUser = () => {
        
        fetch("https://randomuser.me/api/?results=1")
        .then(results => results.json())
        .then(obj => {
            this.setState({
                
                firstName: obj.results[0]["name"]["first"],
                lastName: obj.results[0]["name"]["last"],
                singleImage: obj.results[0]["picture"]["large"],
            });
        })
    }

    render() {
        return(
            <Fragment>
                
                {/* <MenuButton /> */}
                
                <div id="random-user">

                    <div id="background-images">
                        
                        {/* an overlay to darken the background */}
                        <div id="darken-overlay"></div>

                        {/* rendering 500 images as the background */}
                        {this.state.data.map(element => (
                            <img alt="500 images" src={element["picture"]["medium"]} />
                        ))}

                    </div>

                    <div id="main-container">

                        <header>
                            <h1>random user</h1>
                            <h5>Like Lorem Ipsum, but for people.</h5>
                        </header>
                        
                        <section id="single-user-data">
                            
                            <div className="row">

                                <div className="column">
                                    <h3>First Name: {this.state.firstName}</h3>
                                    <h3>Last Name: {this.state.lastName}</h3>
                                </div>

                                <div className="column">
                                    <img src={this.state.singleImage} alt="single random user" />
                                </div>
                                
                            </div>
                            
                        </section>

                        <button onClick={this.changeUser}>generate</button>
                    
                    </div>
                
                </div>
            
            </Fragment>
        )
    }
}

export default RandomUser;
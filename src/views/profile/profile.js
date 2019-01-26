import React from "react";
import style from "./profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return  <div>
              <div> Profile {this.props.name}</div>              
            </div>  
  }
}

export default Profile;
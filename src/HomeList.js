import React from "react";
import PropTypes from "prop-types";
import HomeSummary from "./HomeSummary";

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let homes = this.props.homes.map((home, i) => {
    //   return (
    //     <li className="home" key={i}>
    //       {<HomeSummary home={home} />}
    //     </li>
    //   );
    // });
    return (
      <div>
        <ul>
          {
            //homes
          }
        </ul>
      </div>
    );
  }
}

export default HomeList;

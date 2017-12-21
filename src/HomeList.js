import React from "react";
import PropTypes from "prop-types";
import HomeSummary from "./HomeSummary";
import "./HomeList.css";
import Section from "./Section";
import Alert from "./Alert";

class HomeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let homes = this.props.homes.map((home, i) => {
      return (
        <div className="home-display" key={i}>
          <p className="home" key={i}>
            {<HomeSummary home={home} onClick={this.props.onViewChange} />}
          </p>
        </div>
      );
    });
    return (
      <Section>
        <div>
          <p>{homes}</p>
        </div>
      </Section>
    );
  }
}

export default HomeList;

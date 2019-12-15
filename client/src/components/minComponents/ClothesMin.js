import React from "react";
import { fetchData } from "../../actions";
import { connect } from "react-redux";
import { ResponsivePie } from "@nivo/pie";

class ClotesMin extends React.Component {
  async componentDidMount() {
    await this.props.fetchData();
    console.log("===================");
    console.log(this.props);
  }

  render() {
    return (
      <>
        <div className="blockHeader">
          <h1>Clothes</h1>
        </div>
        <div className="chart">
          <ResponsivePie
            data={this.props.data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: "color" }}
            sliceLabel={function(e) {
              return `${Math.round(e.value / 10)}%`;
            }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: "jacket"
                },
                id: "dots"
              },
              {
                match: {
                  id: "sweater"
                },
                id: "dots"
              },
              {
                match: {
                  id: "hoodie"
                },
                id: "dots"
              },
              {
                match: {
                  id: "jumper"
                },
                id: "dots"
              },
              {
                match: {
                  id: "raincoat"
                },
                id: "dots"
              },
              {
                match: {
                  id: "blazer"
                },
                id: "dots"
              }
            ]}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  //console.log(Object.values(state.clothe));
  return { data: Object.values(state.clothe) };
};
export default connect(mapStateToProps, { fetchData })(ClotesMin);

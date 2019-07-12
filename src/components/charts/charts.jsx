import React, { Component } from 'react';
import { Chart, Coord, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import PropType from "prop-types";

class Charts extends Component {

    static propTypes = {
        data : PropType.array.isRequired,
        scale : PropType.object.isRequired
    }

    render() {
        return (
            <Chart forceFit height={400} 
                    padding={{ top: 20, right: 50, bottom: 200, left: 80 }}
                    data={this.props.data} 
                    scale={this.props.scale}>
                <Coord/>
                <Axis name="genre" title label={{textStyle:{fill:'#bbbbbb'}}}/>
                <Axis name="sold" title/>
                <Legend/>
                <Tooltip showTitle={false}/>
                <Geom type="interval" position="genre*sold" color="genre" />
            </Chart>
        );
    }
}

export default Charts;
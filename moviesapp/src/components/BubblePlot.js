import { useD3 } from './useD3';
import React from 'react';
import * as d3 from 'd3';

function BubblePlot({ data }) {
  const ref = useD3(
    (svg) => {

        let names = [];
        data.forEach(d=>{
            d.lifeexpectancy = parseFloat(d.lifeexpectancy);
            d.purchasingpower = parseFloat(d.purchasingpower);
            d.population = parseInt(d.population);
            names.push(d.country);
        })
        const width = 700;
        const height = 500;
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;
    
        svg.attr("width", width);
        svg.attr("height", height);
        
        let g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
        var x = d3.scaleLinear()
            .domain([0, 40000])
            .range([ 0, iwidth ]);
    
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([90, 30])
            .range([ 0, iheight]);
    
        // Add a scale for bubble size
        var z = d3.scaleLinear()
            .domain([3600000, 205000000])
            .range([ 10, 50]);
    
        var myColor = d3.scaleOrdinal()
            .domain(names)
            .range(d3.schemeSet2);
        
        const bubbles = g.selectAll("dot").data(data);
    
        // Add dots
        bubbles
            .enter()
            .append("circle")
            .attr("cx", d => x(d.purchasingpower) )
            .attr("cy", d => y(d.lifeexpectancy) )
            .attr("r", d => z(d.population) )
            .style("fill", d => myColor(d.country))
            .style("opacity", "0.7")
            .attr("stroke", "black");
        
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  
    
        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
        
        svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Purchasing power");
    
        svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Life expectancy");
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BubblePlot;
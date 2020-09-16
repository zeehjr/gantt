import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const Calendar = () => {
  const canvas = useRef(null);
  const [data, setData] = useState(Array.from(new Array(30), (x, y) => y))

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length < 35) {
        setData([...data, data.length])
      }
      // setData(data.slice(1))
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [data])

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const svg = d3.select(canvas.current);

    const updateRects = svg.select('.squares').selectAll('rect').data(data);

    updateRects
      .enter()
      .append("rect")
      .attr("x", (d, i) => 1 + (i % 7) * 100)
      .attr("y", (d, i) => {
        const y = Math.floor(i / 7) * 100;

        console.log(y);

        return 1 + y;
      })
      .attr("width", 99)
      .attr("height", 99)

      .style("fill", (d) => (d === 5 ? "rgba(220,220,220,0.9)" : "#444"))
      .transition()
      .duration("500")
      .style("fill", "#eee");
      // .style("stroke", (d, i) => (d === 5 ? "dodgerblue" : "#000000"))
      // .style("stroke-width", (d) => (d === 5 ? "1px" : "0"))
      // .on("mouseover", function () {
      //   d3.select(this).transition().duration("150").attr("opacity", "0.5");
      // })
      // .on("mouseout", function () {
      //   d3.select(this).transition().duration("150").attr("opacity", "1");
      // })
      
      updateRects.exit().remove();

    const updateRedDemands = svg.select('.demands').selectAll('rect.red').data(data)

    // const demandsUpdater = updateDemands.enter();
    // updateDemands
    //   .enter()
    updateRedDemands
    .enter()
      .append("rect")
      .attr('class', 'red')
      .attr("x", (d, i) => 5 + (i % 7) * 100)
      .attr("y", (d, i) => 5 + Math.floor(i / 7) * 100)
      .attr("width", 90)
      .attr("height", 20)
      .style("fill", "red")
      .on("mouseover", function () {
        d3.select(this).transition().duration("150").style("fill", "magenta");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration("150").style("fill", "red");
      })
      .exit().remove()

      const updateBlueDemands = svg
        .select(".demands")
        .selectAll("rect.blue")
        .data(data);

    updateBlueDemands
      .enter()
      .append("rect")
      .attr('class', 'blue')
      .attr("x", (d, i) => 5 + (i % 7) * 100)
      .attr("y", (d, i) => 5 + 22 + Math.floor(i / 7) * 100)
      .attr("width", 90)
      .attr("height", 20)
      .style("fill", "dodgerblue")
      .on("mouseover", function () {
        d3.select(this).transition().duration("150").style("fill", "blue");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration("150").style("fill", "dodgerblue");
      })
      .exit().remove()
    
    // updateDemands.exit().remove();

    // Update existing D3 elements
    // update.attr("x", (d, i) => i * 40).text((d) => d);

    // Remove old D3 elements
  }, [data])


  return (
    <div style={{ display: "flex", height: "80vh", flexDirection: "column" }}>
      <svg
        className="d3-component"
        viewBox="0 0 700 500"
        preserveAspectRatio="none"
        ref={canvas}
        style={{ flexGrow: 1 }}
      >
        <g className="squares"></g>
        <g className="demands"></g>
      </svg>
    </div>
  );
}

export default Calendar

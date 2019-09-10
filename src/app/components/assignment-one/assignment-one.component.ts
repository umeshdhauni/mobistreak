import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import * as d3 from 'd3';

export class MarketPrice {
  name: string;
  calls: number;
  Quallified: number;
  cost: number
}

@Component({
  selector: 'app-assignment-one',
  templateUrl: './assignment-one.component.html',
  styleUrls: ['./assignment-one.component.scss']
})
export class AssignmentOneComponent implements OnInit {
  @ViewChild('chart') chartElement: ElementRef;
  data: any;
  chartData = [];
  categories = [];
  private svgElement: HTMLElement;
  private chartProps: any;
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    
    this.getChartData();
  }

  getChartData() {
    this.commonService.getChartData().subscribe(res => {
      for (let key in res) {
        for (let innerKey in res[key]) {
          this.categories.push(innerKey)
          if (key == 'cost') {
            res[key][innerKey] = Number(res[key][innerKey].substr(1))
          }
          let obj = {
            name: innerKey,
            [key]: res[key][innerKey]
          }
          // console.log(obj)
          let index = this.chartData.findIndex(element => {
            return element.name == obj.name;
          })
          if (index >= 0) {
            this.chartData[index][key] = res[key][innerKey];
          }
          else {
            this.chartData.push(obj);
          }

        }
      }
      console.log(this.chartData)
      this.buildChart();
    }, (err) => {
      console.log(err);
    })
  }

  buildChart() {
    let element = this.chartElement.nativeElement;
    this.chartProps = {};

    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = element.offsetWidth - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    this.chartProps.x = d3.scaleBand().rangeRound([0,width])
      // .domain(this.categories)
      // .range(d3.range(0,width))
      

    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    // var xAxis = d3.axisBottom(this.chartProps.x);
    var xAxis = d3.axisBottom(this.chartProps.x)
                        .tickValues(this.categories)
                        .tickPadding(10)
                        
                        
    var yAxis = d3.axisLeft(this.chartProps.y);

    let _this = this;


    var valueline = d3.line<MarketPrice>()
      .x(function (d) {
        return _this.chartProps.x(d.name);

      })
      .y(function (d) { console.log('Close market'); return _this.chartProps.y(d.calls); });


      var valueline2 = d3.line<MarketPrice>()
      .x(function (d) {
        return _this.chartProps.x(d.name);

      })
      .y(function (d) { console.log('Open market'); return _this.chartProps.y(d.Quallified); });

    var valueline3 = d3.line<MarketPrice>()
      .x(function (d) {
        return _this.chartProps.x(d.name);

      })
      .y(function (d) { console.log('Open market'); return _this.chartProps.y(d.cost); });

    var svg = d3.select(this.chartElement.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);


      this.chartProps.x.domain(
      this.chartData.map(function(d){ return d.name }));
    this.chartProps.y.domain([0, d3.max(this.chartData, function (d) {
      return Math.max(d.calls, d.Quallified, d.cost);
    })]);


    svg.append('path')
      .attr('class', 'line line2')
      .style('stroke', 'green')
      .style('fill', 'none')
      .attr('d', valueline2(_this.chartData));

    svg.append('path')
      .attr('class', 'line line2')
      .style('stroke', 'red')
      .style('fill', 'none')
      .attr('d', valueline3(_this.chartData));


      svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'blue')
      .style('fill', 'none')
      .attr('d', valueline(_this.chartData));



      svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)


      svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    this.chartProps.valueline2 = valueline2;
    this.chartProps.valueline3 = valueline3;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
    
  }
}


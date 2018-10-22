import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {Chart} from 'chart.js';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild('valuesBarsCanvas') valuesBarsCanvas;
  parameters: any[] = [];
  values: any[] = [];
  data: any[] = [];
  label: any[] = [];

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbFirebase :FirebaseDbProvider) {

    this.dbFirebase.getActualParameters().subscribe(parameters=>{
      this.parameters = parameters;
      if (this.parameters[1] < 550){
        this.parameters[1] = 'Alta'
      } else {
        this.parameters[1] = 'Baja'
      }
    });

    this.dbFirebase.getValues().subscribe(values=>{
      this.data = [];
      this.label = [];

      /*for (let value of values) {
        this.data.push(value['temp']);
        this.label.push(value['time']);

      }*/
      this.data.push(values[values.length-6]['temp']);
      this.data.push(values[values.length-5]['temp']);
      this.data.push(values[values.length-4]['temp']);
      this.data.push(values[values.length-3]['temp']);
      this.data.push(values[values.length-2]['temp']);
      this.data.push(values[values.length-1]['temp']);

      this.label.push(values[values.length-6]['time']);
      this.label.push(values[values.length-5]['time']);
      this.label.push(values[values.length-4]['time']);
      this.label.push(values[values.length-3]['time']);
      this.label.push(values[values.length-2]['time']);
      this.label.push(values[values.length-1]['time']);
      this.labelChart(this.label);
    });
  }

  // graficos

  dataChart(data){
  this.lineChartData = [
      {data: data, label: 'Temperatura'}
    ];

  }

  labelChart(label) {
    setTimeout(() => {
      this.lineChartLabels = label;
    }, 0);

    this.dataChart(this.data);
  }

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(63,114,191,0.66)',
      borderColor: 'rgba(38,68,114,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}

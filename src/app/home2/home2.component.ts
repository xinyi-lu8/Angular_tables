import { Component, OnInit } from '@angular/core';
import {sampledata} from '../sampledata';
import{ DataprocessService} from "../dataprocess.service";

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {

  //create variable
  sampledata: sampledata[] = [];

  inputdata: sampledata = {
    ID: null,
    Name: ""
  };

  constructor(public dataservice:  DataprocessService) { }

  ngOnInit(): void {
    this.dataservice.createTable("table2");

    this.dataservice.getdata(this.sampledata, "table2").then((element: any) => {
      this.sampledata = element
    });
  }

  addUser(): void{
  
    this.sampledata.push({...this.inputdata});
    //add into database
    this.dataservice.add({...this.inputdata}, "table2");
  }

}

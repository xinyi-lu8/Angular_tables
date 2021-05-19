import { Component, OnInit } from '@angular/core';
import {sampledata} from '../sampledata';
import{ DataprocessService} from "../dataprocess.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //create variable
  sampledata: sampledata[] = [];

  inputdata: sampledata = {
    ID: null,
    Name: ""
  };

  constructor(public dataservice:  DataprocessService) { }

  ngOnInit(): void {
    this.dataservice.createTable("table1");

    this.dataservice.getdata(this.sampledata, "table1").then((element: any) => {
      this.sampledata = element
    });
  }

  addUser(): void{
  
    this.sampledata.push({...this.inputdata});
    //add into database
    this.dataservice.add({...this.inputdata}, "table1");
  }


}

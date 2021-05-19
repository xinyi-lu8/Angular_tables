import { Component, OnInit } from '@angular/core';
import { sampledata } from '../sampledata';
import {DataprocessService} from '../dataprocess.service'

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.css']
})
export class Home3Component implements OnInit {
  joineddata: sampledata[] = [];

  constructor(public dataservice: DataprocessService) { }

  ngOnInit(): void {
    this.dataservice.join(this.joineddata).then((element: any) => {
      console.log("join")
      console.log(element)
      this.joineddata = element;
    })
  }
}

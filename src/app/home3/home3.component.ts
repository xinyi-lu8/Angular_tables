import { Component, OnInit } from '@angular/core';
import { joineddata } from '../joineddata';
import {DataprocessService} from '../dataprocess.service'

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.css']
})
export class Home3Component implements OnInit {
  joineddata: joineddata[] = [];

  constructor(public dataservice: DataprocessService) { }

  ngOnInit(): void {
    this.dataservice.join().then((element: any) => {
      //console.log("join")
      //console.log(element)
      this.joineddata = element;
    })
  }
}

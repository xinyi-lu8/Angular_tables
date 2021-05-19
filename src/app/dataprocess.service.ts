import { Injectable, resolveForwardRef } from '@angular/core';
// import { rejects } from 'assert';
// import { resolve } from 'dns';
import{sampledata} from './sampledata';

@Injectable({
  providedIn: 'root'
})
export class DataprocessService {

  constructor() { }

  sampledata: sampledata[] = [];


  db = (<any>window ).openDatabase("datatesting", "1.0", "datatesting", 5 * Math.pow(10,7));

  //create a table? 
  createTable(tablename: string):void{
    this.db.transaction(function(tx: any){
      const sqlstring = "CREATE TABLE IF NOT EXISTS "+ tablename +" (ID int, Name varchar(255))";

      //other arguments?
      tx.executeSql(sqlstring);
    })
  }


  add(data: sampledata, tablename: string): void{
    this.db.transaction(function(tx: any){

      //string
      var sqlstatement = "INSERT INTO "+ tablename +" (ID, Name) VALUES (?,?) ";

      tx.executeSql(sqlstatement, [data.ID, data.Name]);
    })
  }

  getdata(sampledata: Array<sampledata>, tablename: string): Promise<sampledata[]>{

    return new Promise((resolve, reject) => {
    this.db.transaction(function(tx: any){
      const sqlstring = "SELECT * FROM " + tablename;
      var res: any[] = [];
      // return table
      tx.executeSql(sqlstring, [], (tx: string, results: any) => {

        var len = results.rows.length;
        var i;

        for(i = 0; i < len; i++){
          var row = results.rows.item(i);
          res.push( {ID: row['ID'], Name: row['Name']});
        } 

        resolve(res)
      }), (tx: string, results: any) => {
        console.log("error", results)
        reject(results)
      }
    })

    });
     
  }

  join(joineddata: Array<sampledata>): Promise<sampledata[]>{
    return new Promise((resolve, reject) => {
        this.db.transaction(function(tx: any){
          //string
          var sqlstatement = "SELECT table1.ID, table1.Name, table2.ID, table2.Name FROM table2 FULL OUTER JOIN table1";

          var res: any[] = [];
    
          tx.executeSql(sqlstatement, [], (tx:string, results: any) => {
            var len = results.length;
            var i;
    
            for(i = 0; i < len; i++){
              var row = results.rows.item(i);
              res.push({ID: row['ID'], Name: row['Name']});
            }
            resolve(res);
          }), (tx: string, results: any) => {
            console.log("error", results);
            reject(results);
          }
      })
    });
  }





  
}

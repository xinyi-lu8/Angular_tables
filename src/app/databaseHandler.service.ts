export class DatabaseHandler{
    /**
     * class though which all database transactions should be done.
     * This will allow us to move to sqlite3 as quickly as possible when we get
     * that functionality.
     */

    static db = (<any> window).openDatabase("grubbrrKisosk", "1.0", "grubbrrKisosk", 5 * Math.pow(10,7) /*50mb*/);
    

    /**
     * 
     * @param {string[]} sqlStrings each sql statement you want to execute in the transation
     * @param {string[][]} variables each set of variables you want subsititured in the sql string of the same index. 
     * @param {function[]} callbacks  the callback function that you want to be called for that sql statement
     * @param {function[]} callbacksFail  the callback function that you want to be called for that sql statement
     */
    static executeSqlTransation(sqlStrings: String[], variables: String[][], callbacks: Function[], callBacksFail: Function[]): void{
        this.db.transaction(function(tx: any){
            for(var i = 0; i < sqlStrings.length; i++){
                tx.executeSql(sqlStrings[i].replace(/(\r\n|\n|\r)/gm, ""), variables[i], callbacks[i], callBacksFail[i])
            }
        });
    }
    
    /**
     * 
     * @param {string} sqlStrings the sql statement you want to execute
     * @param {string[]} variables the set of variables you want subsititured in the sql string. 
     * @param {function} callback  the callback function that you want to be called for that sql statement
     * @param {function[]} callbackFail  the callback function that you want to be called for that sql statement
     */
     static executeSqlStatement(sqlString: String, variables: String[], callback: Function, callBackFail: Function): void{
        this.db.transaction(function(tx: any){
            tx.executeSql(sqlString.replace(/(\r\n|\n|\r)/gm, ""), variables, callback, callBackFail)
        });
    }
}
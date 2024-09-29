function Active() {
    // Parse the incoming data from Node-RED
    // Open the spreadsheet by ID and sheet by name
    var sheet = SpreadsheetApp.openById("1MKpIux6dOREbDvlDfrfTXt3F0qCBcTaggcZIMJfAjFI").getActiveSheet();
  
    // Find the last row in column B that has data, starting from row 3
    var lastRow = sheet.getLastRow();
    var startRow = 3; // We want to start from row 3
    
    // Loop through column B to find the first empty row
    var nextRow = startRow;
    while (sheet.getRange(nextRow, 2).getValue() !== "" && nextRow <= lastRow) {
      nextRow++;
    }
  
    // If column B is empty after row 2, the nextRow is correct
    let d = new Date();
    let min = d.getMinutes();
    let hour = d.getHours();
    let sec = d.getSeconds();
    let timeText = String(hour)+":"+String(min)+":"+sec;
    sheet.getRange(nextRow,1).setValue(timeText);
    sheet.getRange(nextRow,2).setValue(["detected"]);
    sheet.getRange(nextRow,3,1,3).setValue(["-","-","-"]);
    for(let i=2;i<=5;i++){
      var rangeb = sheet.getRange(nextRow, i); // Row , Column 
      rangeb.setHorizontalAlignment('center'); // Center align the content
    }
    // Return a success message
    return ContentService.createTextOutput("Data successfully written to row " + nextRow);
  }
  
  
  function doGet(e) {
    Logger.log(JSON.stringify(e)); 
    if(e.parameter['message'] == 1){
      return Active();
    }
   
    var result = 'Ok';
    if (e.parameter == undefined) {
      result = 'No Parameters';
    }
    else {
      var id = '1MKpIux6dOREbDvlDfrfTXt3F0qCBcTaggcZIMJfAjFI'; // Spreadsheet ID
      var sheet = SpreadsheetApp.openById(id).getActiveSheet();
      var newRow = sheet.getLastRow() + 1;
      var eData = [];
      for(let i=2;i<=5;i++){
      var rangeb = sheet.getRange(newRow, i); // Row , Column 
       rangeb.setHorizontalAlignment('center'); // Center align the content
      }
    
      Logger.log(JSON.stringify(eData));
      var value1 = e.parameter['value1'];
  
  
  
  
  
  
  
      value1 = value1.match(/\d+/)[0]; //get only number
      let d = new Date();
      let min = d.getMinutes();
      let hour = d.getHours();
      let sec = d.getSeconds();
      let timeText = String(hour)+":"+String(min)+":"+sec;
      eData[0] = timeText;
      eData[1] = '-';
      if(value1 === "1"){
        eData[2] = value1;
        eData[3] = '-';
        eData[4] = '-';
      }else if(value1 === "15"){
        eData[2] = '-';
        eData[3] = value1;
        eData[4] = '-';
      }else if(value1 === "30"){
        eData[2] = '-';
        eData[3] = '-';
        eData[4] = value1;
      }
      
  
      // Write new row below
      var newRange = sheet.getRange(newRow, 1, 1, eData.length);
      newRange.setValues([eData]);
    }
  
    // Return result of operation
    return ContentService.createTextOutput(result);
  }
  
  
  function clearAllExceptFirstTwoRows() {
    // Get the active spreadsheet and the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get the last row number that has content
    var lastRow = sheet.getLastRow();
    
    // Delete everything except the first two rows
    if (lastRow > 2) {
      // Get the range from the third row to the last row
      var range = sheet.getRange(3, 1, lastRow - 2, sheet.getLastColumn());
      
      // Clear the content in that range
      range.clearContent();
    }
  }
  
  function renameSheetWithDate() {
    // Get the current active spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get the current date
    var today = new Date();
    
    // Format the date as "DD-MM-YYYY"
    var formattedDate = Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd-MM-yyyy');
    
    // Create the new sheet name
    var newSheetName1 = 'Data (' + formattedDate + ')';
    var newSheetName2 = 'Report (' + formattedDate + ')';
    
    // Get the next sheet (the second sheet or whichever index you want)
    var sheets = spreadsheet.getSheets();
  
    // Rename the active sheet with the new name
    var sheet1 = spreadsheet.getActiveSheet();
    var sheet2 = sheets[1];
    sheet1.setName(newSheetName1);
    sheet2.setName(newSheetName2);
    // Log the new name (optional)
    Logger.log('Sheet renamed to: ' + newSheetName1);
    Logger.log('Sheet renamed to: ' + newSheetName2);
  }
  
  
  
  
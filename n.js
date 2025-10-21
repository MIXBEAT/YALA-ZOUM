function doPost(e) {
  try {
    const action = e.parameter.action;
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    if (action === 'addRegistration') {
      const name = e.parameter.name;
      const role = e.parameter.role;
      const contact = e.parameter.contact;
      const timestamp = e.parameter.timestamp;
      const photo = e.parameter.photo;
      
      sheet.appendRow([name, role, contact, photo, timestamp]);
      
      return ContentService
        .createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Invalid action'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  
  if (action === 'getRegistrations') {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const registrations = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      registrations.push({
        name: row[0],
        role: row[1],
        contact: row[2],
        photo: row[3],
        timestamp: row[4]
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(registrations))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify([]))
    .setMimeType(ContentService.MimeType.JSON);
}
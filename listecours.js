/**
 * Lists all course names and ids. 
 */
function listCoursesToSheets() {
  var spreadsheet = SpreadsheetApp.openById("XXXXXXXXXXXXXXX"); //recuperer à partir de l'id le classeur contenant la liste des cours
  var sheet = spreadsheet.getSheets()[0]; // la feuille (sheet) du classeur contenant la liste
  var courses = [];
  var pageToken = null;
  var optionalArgs = {
    pageToken: pageToken,
    pageSize: 0,
    teacherId: 'email@schooldomainname.edu'
  };
  var response;
  var i = 95;
  while (true) {
    response = Classroom.Courses.list(optionalArgs);
    courses = response.courses;
    Logger.log("voici le token %s et le nextToken %s", pageToken,  response.nextPageToken);
    
    if (courses.length === 0) {
      Logger.log("No courses found.");
    } else {
      Logger.log("Number of Courses is '%s", courses.length);
      for (course in courses) {
        i++;
        sheet.getRange(i,1).setValue(courses[course].id);
        sheet.getRange(i,2).setValue(courses[course].name);
        sheet.getRange(i,3).setValue(courses[course].section);
        sheet.getRange(i,4).setValue(courses[course].enrollmentCode);
        sheet.getRange(i,5).setValue(courses[course].alternateLink);
        Logger.log('%s (%s)', courses[course].name, courses[course].id);
      }
      Logger.log("Number of Courses add to sheet '%s", i-1);
    }
    if (!response.nextPageToken) {
       break;
    }
    optionalArgs.pageToken = response.nextPageToken;
  }
}

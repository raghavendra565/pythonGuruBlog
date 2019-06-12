import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pythondocs',
  templateUrl: './pythondocs.component.html',
  styleUrls: ['./pythondocs.component.scss']
})
export class PythondocsComponent implements OnInit {

  constructor() { }

  chapters_list: Array<any>=['Chapter 1 Introduction', 'Chapter 2 Strings', 'Chapter 3 Control Structures',
  'Chapter 4 Data Structures', 'Chapter 5 Functions', 'Chapter 6 Modules', 'Chapter 7 File IO', 
  'Chapter 8 Comprehensions, Lambdas and Functional Programming', 'Chapter 9 Serialization', 
  'Chapter 10 Object Orientation', 'Chapter 11 MySQL DB Connection', 'Chapter 12 MYSQLDBSetupWalkthrough',
  'Chapter 13 ExceptionHandling', 'Chapter 14 Threading', 'Chapter 15 Logging', 'Chapter 16 Email - FTP', 
  'Chapter 17 UnitTesting', 'Chapter 18 Regular Expressions', 'Chapter 19 Numpy', 'Chapter 20 Pandas',
  'Chapter 21 Matplotlib', 'Chapter 22 MS-SQL Server Database Connection']

  chapters_list1: Array<any>=['1. Introduction', '2. Strings', '3. Control Structures', 
  '4. Data Structures', '5. Functions', '6. Modules', '7. File IO', 
  '8. Comprehensions, Lambdas and Functional Programming', 
  '9. Serialization', '10. Object Orientation', '11. MySQL DB Connection', 
  '12. MYSQLDBSetupWalkthrough', '13. ExceptionHandling', '14. Threading', 
  '15. Logging', '16. Email - FTP', '17. UnitTesting', '18. Regular Expressions', 
  '19. Numpy', '20. Pandas', '21. Matplotlib', '22. MS-SQL Server Database Connection']

  ngOnInit() {
    window.scroll(0,0);
  }

  openDoc(url: any) {
    url = 'assets/material/pydocs/' + url + '.html';
    window.open(url)
  }

}

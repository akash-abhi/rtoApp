import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';

import { ChangeDetectorRef } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RtoService } from 'src/services/rto.service';
import { UserService } from 'src/services/user.service';
import { CalendarService } from 'src/services/calendar.service';
import { cl, cp } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private fB: FormBuilder,
    private userService: UserService,
    public rtoService: RtoService,
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef
  ) {}

  // Main Status Dropdown Declaration

  thisWeekDates: any = [];
  // selectedOption1: string = '';
  selectedOption2: string = '';
  selectedOption3: string = '';
  selectedOption4: string = '';
  selectedOption5: string = '';
  selectedOption6: string = '';
  // selectedOption6: string = '';

  rtoStatusForm!: FormGroup;
  UserRTOStatusFormTemp: any = [];
  UserRTOStatusForm: any = [];
  currentUserRTOData: any = [];
  monthEvents: any = [];
  eventsNew: any = [];

  rtoStatusData: any = [];

  // date Declaration
  date1: any;
  date2: any;
  date3: any;
  date4: any;
  date5: any;
  date6: any;
  date7: any;
  userData: any;
  formattedDates: any;

  curr = new Date();

  currNxt: any;

  day1 = new FormControl('');
  day2 = new FormControl('');
  day3 = new FormControl('');
  day4 = new FormControl('');
  day5 = new FormControl('');
  day6 = new FormControl('');
  day7 = new FormControl('');

  // rtoForm:FormGroup;

  daysArrays: Date[] = [];

  NumberOfWorkingDays: number[] = [1, 2, 3, 4, 5, 6, 7];

  // Calendar
  calendarOptions: CalendarOptions | undefined;

  // Calendar End

  ngOnInit(): void {
    this.curr.setHours(12);
    this.curr.setMinutes(0);
    this.curr.setSeconds(0);
    this.getRTOMethod();
    this.getRTOMethod();

    this.dateMethod();

    this.rtoStatusForm = this.fB.group({
      day1: this.day1,
      day2: this.day2,
      day3: this.day3,
      day4: this.day4,
      day5: this.day5,
      day6: this.day6,
      day7: this.day7,
    });

    // MonthGRidView

    this.calendarService.currentEvents.subscribe((newEvents) => {
      this.calendarOptions = {
        height: '450px',
        // width : '60%',

        nowIndicator: true,
        initialView: 'multiMonthFourMonth',
        views: {
          multiMonthFourMonth: {
            type: 'multiMonth',
            duration: { months: 1 },
          },
        },

        plugins: [multiMonthPlugin],

        events: newEvents.map((event: any) => ({
          title: event.dayStatus,
          date: event.date,
          backgroundColor: this.getEventBackgroundColor(event.dayStatus),
        })),
      };
    });

    // DayGridView

    // this.calendarService.currentEvents.subscribe((newEvents) => {
    //   this.calendarOptions = {
    //     height: '400px',
    //     initialView: 'dayGridMonth',
    //     plugins: [dayGridPlugin],
    //     events: newEvents.map((event: any) => ({
    //       title: event.dayStatus,
    //       date: event.date,
    //       backgroundColor: this.getEventBackgroundColor(event.dayStatus),
    //     })),
    //     // eventContent: this.customEventRender.bind(this),
    //   };
    // });
  }

  // Event backgroundColor

  getEventBackgroundColor(dayStatus: string) {
    if (dayStatus == 'Office') {
      return 'green';
    } else if (dayStatus == 'Leave') {
      return 'red';
    } else if (dayStatus == 'Disengagement') {
      return 'orange';
    } else if (dayStatus == 'Holiday') {
      return 'rgb(250, 92, 255)';
    } else if (dayStatus == 'WFH') {
      return 'Blue';
    } else {
      return 'White';
    }
  }

  customEventRender(info: {
    event: EventInput;
    el: HTMLElement;
    view: any;
  }): void {
    info.el.style.backgroundColor = info.event.backgroundColor || '';
  }
  // -----------------------------

  dateMethod() {
    for (var i = 0; i < 7; i++) {
      var day = this.curr.getDate() - this.curr.getDay() + i;
      this.daysArrays[i] = new Date(this.curr);
      this.daysArrays[i].setDate(day);
    }
  }

  minus7Days() {
    this.curr.setDate(this.curr.getDate() - 7);
    this.dateMethod();
    this.dropDownPopulate();
  }

  plus7Days() {
    this.curr.setDate(this.curr.getDate() + 7);
    this.dateMethod();
    this.dropDownPopulate();
  }

  todayDay() {
    this.curr = new Date();
    this.dateMethod();
    this.dropDownPopulate();
  }

  getDateValues() {
    this.UserRTOStatusFormTemp = [
      {
        dayStatus: this.rtoStatusForm.value.day1,
        date: `${this.daysArrays[0].getFullYear()}-${(
          this.daysArrays[0].getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${this.daysArrays[0]
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      },
      {
        dayStatus: this.rtoStatusForm.value.day2,
        date: `${this.daysArrays[1].getFullYear()}-${(
          this.daysArrays[1].getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${this.daysArrays[1]
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      },
      {
        dayStatus: this.rtoStatusForm.value.day3,
        date: `${this.daysArrays[2].getFullYear()}-${(
          this.daysArrays[2].getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${this.daysArrays[2]
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      },
      {
        dayStatus: this.rtoStatusForm.value.day4,
        date: `${this.daysArrays[3].getFullYear()}-${(
          this.daysArrays[3].getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${this.daysArrays[3]
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      },
      {
        dayStatus: this.rtoStatusForm.value.day5,
        date: `${this.daysArrays[4].getFullYear()}-${(
          this.daysArrays[4].getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${this.daysArrays[4]
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      },
      {
        dayStatus: this.rtoStatusForm.value.day6,
        date: `${this.daysArrays[5].getFullYear()}-${(
          this.daysArrays[5].getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${this.daysArrays[5]
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      },
      {
        dayStatus: this.rtoStatusForm.value.day7,
        date: `${this.daysArrays[6].getFullYear()}-${(
          this.daysArrays[6].getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${this.daysArrays[6]
          .getDate()
          .toString()
          .padStart(2, '0')}`,
      },
    ];
  }

  setUserData() {
    this.userData = {
      empName: this.userService.currentUserData.empName,
      empId: this.userService.currentUserData.empId,
      rtoStatus: this.rtoStatusData,
    };
  }

  submit() {
    this.getDateValues();
    // To filter empty status Dates
    this.UserRTOStatusForm = this.UserRTOStatusFormTemp.filter(
      (value: any) => value.dayStatus != ''
    );

    // CalendarService

    this.calendarService.updateEvents(this.UserRTOStatusForm);

    this.rtoService.AllRTODataCurrentUserData = this.rtoService.AllRTOData.find(
      (obj: any) => obj.empName == this.userService.currentUserData.empName
    );

    if (this.rtoService.AllRTODataCurrentUserData == undefined) {
      this.userData = {
        empName: this.userService.currentUserData.empName,
        empId: this.userService.currentUserData.empId,
        rtoStatus: this.UserRTOStatusForm,
      };

      this.rtoService.createRTOdata(this.userData).subscribe({
        next: (res: any) => {},
      });
      this.rtoStatusData = this.UserRTOStatusForm;

      this.calendarService.updateEvents(this.UserRTOStatusForm);

      this.getRTOMethod();
      this.getRTOMethod();
      this.filterOfficeDays();
    } else {
      this.rtoStatusData = this.rtoService.AllRTODataCurrentUserData.rtoStatus;
      this.calendarService.updateEvents(this.rtoStatusData);
      this.UserRTOStatusForm.forEach((newObj: any) => {
        let index = this.rtoStatusData?.findIndex(
          (obj: any) => obj.date == newObj.date
        );
        if (index == -1) {
          this.rtoStatusData.push(newObj);
        } else if (index != -1) {
          this.rtoStatusData[index] = newObj;
        }
      });
      this.calendarService.updateEvents(this.rtoStatusData);

      this.userData = {
        empName: this.userService.currentUserData.empName,
        empId: this.userService.currentUserData.empId,
        rtoStatus: this.rtoStatusData,
      };

      this.rtoService.createRTOdata(this.userData).subscribe({
        next: (res: any) => {},
      });

      this.getRTOMethod();
      this.getRTOMethod();
      this.getRTOMethod();
      this.filterOfficeDays();
      this.calendarService.updateEvents(this.rtoStatusData);
    }

    alert('Status Updated');
  }

  filterOfficeDays() {
    const month = this.curr.getMonth();
    const year = this.curr.getFullYear();
    if (this.rtoService.AllRTODataCurrentUserData?.rtoStatus === undefined) {
      this.eventsNew = this.UserRTOStatusForm;
    } else {
      this.eventsNew = this.rtoService.AllRTODataCurrentUserData?.rtoStatus;
    }

    // Filtering objects with date in July
    this.rtoService.monthEvents = this.eventsNew?.filter(
      (obj: any) =>
        new Date(obj.date).getMonth() === month &&
        new Date(obj.date).getFullYear() === year
    );
    this.rtoService.officeDaysOfThatMonth = this.rtoService.monthEvents?.filter(
      (obj: any) => obj.dayStatus == 'Office'
    );

    this.rtoService.monthEvents?.sort((a: any, b: any) =>
      a.date.localeCompare(b.date)
    );

    this.getRTOMethod();
    this.getRTOMethod();
  }

  dropDownPopulate() {
    this.formattedDates = this.daysArrays.map((dateString) => {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
    });

    this.thisWeekDates = this.formattedDates.map((value: any) => {
      if (
        this.rtoService.AllRTODataCurrentUserData.rtoStatus?.some(
          (obj: any) => obj.date === value
        )
      ) {
        
        return {
          dayStatus: this.rtoService.AllRTODataCurrentUserData.rtoStatus?.find(
            (obj: any) => obj.date === value
          ).dayStatus,
          value,

          
          
        };
      } else {
        return { dayStatus: '', value };
      }
    });
//  new``

// DropdownDate Checks
    // this.selectedOption1 = this.thisWeekDates[0].dayStatus;
    this.selectedOption2 = this.thisWeekDates[1].dayStatus;
    this.selectedOption3 = this.thisWeekDates[2].dayStatus;
    this.selectedOption4 = this.thisWeekDates[3].dayStatus;
    this.selectedOption5 = this.thisWeekDates[4].dayStatus;
    this.selectedOption6 = this.thisWeekDates[5].dayStatus;
    // this.selectedOption7 = this.thisWeekDates[6].dayStatus;
  }

  getRTOMethod() {
    this.rtoService.getRTOData().subscribe({
      next: (res: any) => {
        this.rtoService.AllRTOData = res;

        this.rtoService.AllRTODataCurrentUserData =
          this.rtoService.AllRTOData.find(
            (obj: any) =>
              obj.empName == this.userService.currentUserData.empName
          );

        this.dropDownPopulate();

      },
    });
  }
}

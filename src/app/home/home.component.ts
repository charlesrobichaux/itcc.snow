import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from '../services/events.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventSesrvice]
})
export class HomeComponent implements OnInit {

  users: any;
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(
    private http: HttpClient,
    protected eventService: EventSesrvice) {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      }
    };
  }

  ngOnInit() {
    this.http.get<any>('/api/now/table/cmn_schedule_span?sysparm_query=schedule=fc997457db0d2f00f6b873ffbf9619ac&sysparm_fields=name,sys_id,all_day,end_date_time,start_date_time').subscribe(res => {


      // let's take the response, parse the dates and store it in a users array
      this.calendarOptions.events = res.result.map(evt => {
        Object.keys(evt).forEach(function (key, index) {
          // key: the name of the object key
          alert(key);
          // index: the ordinal position of the key within the object
        });
        evt.end = evt.end_date_time;
        evt.start = evt.start_date_time;
        evt.title = evt.name;
        evt.id = evt.sys_id;
        evt.allDay = evt.all_day;

        return evt;

        // a quick and dirty sort...
      });

    });

    // this.http.get<any>('/api/now/table/sys_user?sysparm_fields=first_name,last_name,email,sys_created_on').subscribe(res => {

    //   // let's take the response, parse the dates and store it in a users array
    //   this.users = res.result.map(user => {
    //     user.sys_created_on = new Date(user.sys_created_on);
    //     return user;

    //     // a quick and dirty sort...
    //   }).sort((a, b) => `${a.first_name}${a.last_name}` < `${b.first_name}${b.last_name}` ? - 1 : 1);

    // });

    // this.eventService.getEvents().subscribe(data => {
    //   this.calendarOptions = {
    //     editable: true,
    //     eventLimit: false,
    //     header: {
    //       left: 'prev,next today',
    //       center: 'title',
    //       right: 'month,agendaWeek,agendaDay,listMonth'
    //     },
    //     events: data
    //   };
    // });

  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamprofilesComponent } from './teamprofiles.component';

describe('TeamprofilesComponent', () => {
  let component: TeamprofilesComponent;
  let fixture: ComponentFixture<TeamprofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamprofilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

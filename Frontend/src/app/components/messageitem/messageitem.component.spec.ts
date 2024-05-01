import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageitemComponent } from './messageitem.component';

describe('MessageitemComponent', () => {
  let component: MessageitemComponent;
  let fixture: ComponentFixture<MessageitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

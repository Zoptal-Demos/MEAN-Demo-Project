import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchiconComponent } from './searchicon.component';

describe('SearchiconComponent', () => {
  let component: SearchiconComponent;
  let fixture: ComponentFixture<SearchiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchiconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

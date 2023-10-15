/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListBienComponent } from './list-bien.component';

describe('ListBienComponent', () => {
  let component: ListBienComponent;
  let fixture: ComponentFixture<ListBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

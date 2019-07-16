import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTipsPage } from './share-tips.page';

describe('ShareTipsPage', () => {
  let component: ShareTipsPage;
  let fixture: ComponentFixture<ShareTipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTipsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

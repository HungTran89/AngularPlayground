import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormOneComponent } from './quiz-form-one.component';

describe('QuizFormOneComponent', () => {
  let component: QuizFormOneComponent;
  let fixture: ComponentFixture<QuizFormOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

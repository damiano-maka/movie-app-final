import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import emailjs from '@emailjs/browser';

interface contactForm {
  fullname: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, JsonPipe, ReactiveFormsModule],
  template: `
    @if (user$ | async; as user) {
    <div class="flex justify-center flex-col md:flex-row bg-gray-800 vh">
      <div
        class="flex-1 justify-center p-8 w-full md:w-96 mb-4 md:mb-0 md:w-96"
      >
        <div class="flex items-center justify-center mt-5 ">
          <img
            src="{{ user.picture }}"
            alt="Profile Picture"
            class="w-30 h-30 rounded-full"
          />
        </div>

        <div class="text-center mt-3 text-gray-300">
          <h1 class="text-xl font-bold mb-2">{{ user?.name }}</h1>
          <p class="text-white-400 mb-2">
            <b>Nickname</b> : {{ user?.nickname }}
          </p>
          <p class="text-white-400 mb-2"><b>Email</b>: {{ user?.email }}</p>
          <p class="text-white-400"><b>Locale</b>: {{ user?.locale }}</p>
          <p class="text-white-400">
            <b>Last Updated</b>: {{ user?.updated_at | date }}
          </p>
          <button
            class="btn btn-error btn-sm mt-5 text-white"
            (click)="
              auth.logout({
                logoutParams: {
                  returnTo: 'https://dami-streaming.vercel.app'
                }
              })
            "
          >
            Log out
          </button>
        </div>
      </div>
      <div class="flex-1 justify-center p-8 w-full  mt-10 md:w-96 md:mt-0 ">
        <div class="isolate">
          <div class="mx-auto max-w-2xl text-center">
            <h2
              class="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl"
            >
              Contact Support
            </h2>
            <p class="mt-2 text-lg leading-8 text-gray-400">
              We're here to assist you with any issues you may encounter with
              our app. Whether it's a technical problem, a question about the
              app's features, or simply feedback, our team is happy to help.
            </p>
          </div>
          <form
            method="POST"
            [formGroup]="contactForm"
            (ngSubmit)="onSubmit()"
            class="mx-auto mt-5 max-w-xl sm:mt-20"
          >
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label
                  for="first-name"
                  class="block text-sm font-semibold leading-6 text-gray-300"
                  >First name</label
                >
                <div class="mt-2.5">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    required
                    formControlName="fullname"
                    [class.error]="contactForm.controls.fullname.touched && contactForm.controls.fullname.errors?.['required']"
                    autocomplete="given-name"
                    class="block w-full bg-gray-700 rounded-md border-0 px-3.5 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                  @if(contactForm.controls.fullname.touched &&
                  contactForm.controls.fullname.errors?.['required']){<span
                    class="error-message"
                  >
                    Name is required </span
                  >}
                </div>
              </div>
              <div class="sm:col-span-2">
                <label
                  for="email"
                  class="block text-sm font-semibold leading-6 text-gray-300"
                  >Email</label
                >
                <div class="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    formControlName="email"
                    [class.error]="contactForm.controls.email.touched && contactForm.controls.email.errors?.['required']"
                    autocomplete="email"
                    class="block w-full bg-gray-700 rounded-md border-0 px-3.5 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600  sm:text-sm sm:leading-6"
                  />
                  @if(contactForm.controls.email.touched &&
                  contactForm.controls.email.errors?.['required']){<span
                    class="error-message"
                  >
                    Email is required </span
                  >}
                </div>
              </div>
              <div class="sm:col-span-2">
                <label
                  for="message"
                  class="block text-sm font-semibold leading-6 text-gray-300"
                  >Message</label
                >
                <div class="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    formControlName="message"
                    [class.error]="contactForm.controls.message.touched && contactForm.controls.message.errors?.['required']"
                    rows="4"
                    required
                    class="block w-full bg-gray-700 rounded-md border-0 px-3.5 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600  sm:text-sm sm:leading-6"
                  ></textarea>

                  @if(contactForm.controls.message.touched &&
                  contactForm.controls.message.errors?.['required']){
                  <span class="error-message"> Message is required </span>}
                </div>
              </div>
            </div>
            <div class="mt-4">
              @if(formVal){
              <div class="text-center mt-2 mb-2 text-error">
                Please input correct information in the form.
              </div>
              } @if(isEmailSent){
              <div class="text-center mt-2 mb-2 text-successs">
                Email sent successfully!
              </div>
              }
              <button
                type="submit"
                class="block w-full rounded-md bg-indigo-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-indigo-800"
              >
                Let's talk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    }
  `,
  styles: [
    `
      .vh {
        min-height: 60vh;
      }

      .gog {
        flex-direction: column;
        justify-content: center;
      }

      .custom-input {
        border-color: #414141;
      }

      .custom-input:focus {
        border-color: #2980b9;
      }

      .error-message {
        color: #e74c3c;
        margin-top: 5px;
        font-size: 14px;
      }

      .custom-input.error {
        border-color: #e74c3c;
      }

      .btn-success:hover {
        background-color: #218838;
        border-color: #218838;
      }
    `,
  ],
})
export default class ProfileComponent {
  user$ = inject(AuthService).user$;
  auth = inject(AuthService);
  fb = inject(FormBuilder);

  contactForm: FormGroup<contactForm> = new FormGroup<contactForm>({
    fullname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  isEmailSent: boolean = false;
  formVal: boolean = false;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}
  async onSubmit() {
    if (this.contactForm.valid) {
      emailjs.init('tUwv8kVZR7_otQsNR');
      try {
        const response = await emailjs.send(
          'service_9m6o4dd',
          'template_vpz7f7f',
          {
            from_name: this.contactForm.value.fullname,
            to_name: 'DAMI STREAMING ADMIN',
            message: this.contactForm.value.message,
            from_email: this.contactForm.value.email,
            subject: 'Messaggio dal utente!',
          }
        );

        if ((await response.status) === 200) {
          this.isEmailSent = true;
          this.formVal = false;
          this.contactForm.reset();
          this.cdr.detectChanges();
        } else {
          this.formVal = true;
        }
      } catch (error) {
        console.error('Errore:', error);
        alert('Si è verificato un errore');
      }
    } else {
      this.formVal = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { BookService } from '../service/book.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../toast/service/toast.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastsContainer } from '../../toast/toast.component';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule,ToastsContainer ],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [BookService],
})
export class AddBookComponent implements OnInit {
  FormData!: FormGroup;
  isloading!: boolean;
  countries$!:string[];
  lanGuages$!:string[];

  constructor(
    private book: BookService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.FormData = this.builder.group({
      author: new FormControl(''),
      country: new FormControl(''),
      language: new FormControl(''),
      pages: new FormControl(''),
      title: new FormControl(''),
      year: new FormControl(''),
    });
    this.getAllCountries();
    this.getAllLanguage();
  }

  reset() {
    this.FormData = this.builder.group({
      author: new FormControl(''),
      country: new FormControl(''),
      language: new FormControl(''),
      pages: new FormControl(''),
      title: new FormControl(''),
      year: new FormControl(''),
    });
  }
  onSubmit(FormData: any) {
    this.book.postBook(FormData).subscribe((res) => {
      this.showToaster('Add', 'Book Added Successfully');
      setTimeout(() => {
        this.reset();
      }, 2000);
    });
  }

  showToaster(title: string, message: string) {
    this.toast.show(title, message, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
    });
  }

  getAllCountries() {
    this.book.getCountry().subscribe((res:string[]) => {
      this.countries$=res
      console.log(this.countries$)
    })
    
  }

  getAllLanguage() {
    this.book.getLanguages().subscribe((res:string[]) => {
      const languages = res;
      const uniqueLanguageSet = new Set<string>();
  
      languages.forEach((language: any) => {
        for (const key in language.languages) {
          if (language.languages.hasOwnProperty(key)) {
            uniqueLanguageSet.add(language.languages[key]);
          }
        }
      });
  
      const uniqueLanguages = Array.from(uniqueLanguageSet);
      this.lanGuages$=uniqueLanguages;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { BookService } from '../service/book.service';
import { ToastsContainer } from '../../toast/toast.component';
import { ToastService } from '../../toast/service/toast.service';
@Component({
  selector: 'app-lend',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastsContainer],
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.scss'],
  providers: [BookService],
})
export class LendComponent implements OnInit {
  books$: any[] = [];
  FormData!: FormGroup;
  selectedBookTitle: any;
  selectedBookAuthor: any;
  today=new Date();

  constructor(
    private Builder: FormBuilder,
    private toast: ToastService,
    private book: BookService
  ) {}

  ngOnInit() {
    this.FormData = this.Builder.group({
      name: new FormControl(''),
      bookTitle: new FormControl(''),
      bookAuthor: new FormControl(''),
      lendingDate: new FormControl(''),
      returnDate: new FormControl(''),
    });
    this.getAllBooks();
    console.log(this.getAllBooks());
  }

  onSubmit(FormData: any) {
    this.FormData.get('lendingDate')?.patchValue({
      value:new Date().toDateString()
    })
    this.FormData.get('returnDate')?.patchValue({
      value:new Date(this.today.setDate(this.today.getDate() + 7)).toDateString()
    })
    this.FormData.get('bookAuthor')?.patchValue({
      value:this.selectedBookAuthor.value
    })
    this.book.lendBook(FormData).subscribe((res)=>{
      this.showToaster('Lend', 'Book Lend Successfully');
      setTimeout(() => {
        this.resetForm();
      }, 2500);
    });
    console.log(this.FormData.value);
  }
  resetForm() {
    this.FormData = this.Builder.group({
      name: new FormControl(''),
      bookTitle: new FormControl(''),
      bookAuthor: new FormControl(''),
      lendingDate: new FormControl(''),
      returnDate: new FormControl(''),
    });
  }

  showToaster(title: string, message: string) {
    this.toast.show(title, message, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
    });
  }

  getAllBooks() {
    this.book.getBooks().subscribe((res) => {
      this.books$ = res;
      console.log(this.books$);
    });
  }
  updateSelectedBookAuthor() {
    const selectedBook = this.books$.find(
      (book) => book.title === this.selectedBookTitle
    );

    if (selectedBook) {
      this.selectedBookAuthor = selectedBook.author;
    } else {
      this.selectedBookAuthor = ''; // Handle the case when no book is selected
    }
  }
}

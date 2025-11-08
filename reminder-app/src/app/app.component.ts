import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../environments/firebase.config";

@Component({
  imports: [RouterModule, Toast],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    initializeApp(firebaseConfig);
  }
}

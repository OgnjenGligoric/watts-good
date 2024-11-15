import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../../env/env';
import { SocketService } from '../../service/consumption-web-socket.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgFor],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'], // Corrected typo here
  providers: [SocketService], // Add SocketService here, not StompRService
})
export class StatisticsComponent implements OnInit, OnDestroy {
  notifications: string[] = [];
  private notificationsSubscription: any;
  private serverUrl = environment.apiHostWebSocket + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;

  // Inject the SocketService into the constructor
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Subscribe to the WebSocket notifications
    
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });

  }
  handleResult(message: { body: string; }) {
    if (message.body) {
      // JSON.parse(message.body);
      this.notifications.push(message.body);
    }
  }
  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }


  ngOnDestroy(): void {
    // Unsubscribe from the WebSocket stream when the component is destroyed
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }
}

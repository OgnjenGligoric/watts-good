import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../service/consumption-web-socket.service';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'], // Corrected typo here
  providers: [SocketService], // Add SocketService here, not StompRService
})
export class StatisticsComponent implements OnInit, OnDestroy {
  notifications: string[] = [];
  private notificationsSubscription: any;

  // Inject the SocketService into the constructor
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Subscribe to the WebSocket notifications
    this.notificationsSubscription = this.socketService.onEvent().subscribe(
      (message: Message) => {
        // Assuming the server sends notifications as a string or a JSON object
        this.notifications.push(message.body); // Add new notification to the list
      },
      (error) => {
        console.error('Error receiving WebSocket message:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the WebSocket stream when the component is destroyed
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }
}

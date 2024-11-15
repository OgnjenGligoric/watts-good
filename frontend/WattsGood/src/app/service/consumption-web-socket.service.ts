import { Injectable } from '@angular/core';
import { StompRService, StompConfig } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable } from 'rxjs';

/**
 * Must add dependency "@stomp/ng2-stompjs": "^6.0.1"
 */
@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(private stompService: StompRService) {}

  private init(): void {
    if (!this.stompService.connected()) {
      this.stompService.config = this.stompConfig();

      this.stompService.initAndConnect();
    }
  }

  onEvent(): Observable<Message> {
    this.init();

    return this.stompService.subscribe('/topic/notifications');
  }

  private stompConfig(): StompConfig {
    const provider = function() {
      return new SockJS('http://localhost:8080/ws');
    };

    const config = new StompConfig();
    config.url = provider;
    config.heartbeat_in = 0;
    config.heartbeat_out = 0;
    config.reconnect_delay = 10000;

    return config;
  }
}
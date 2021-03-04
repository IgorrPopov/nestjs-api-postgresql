import { Injectable } from '@nestjs/common';
import { admin } from './config/firebase-admin.config';

@Injectable()
export class FirebaseAdminService {

  public async sendMessage(userRegistrationToken: string, message: string) {
    const notification_options = {
      priority: 'high',
      timeToLive: 60 * 60 * 24
    };

    const response = await admin.messaging().sendToDevice(
      userRegistrationToken, 
      { notification: { message } }, 
      notification_options
    );
    
  }
}

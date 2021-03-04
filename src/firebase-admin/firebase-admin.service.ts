import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/users/dto/create-message.dto';
import { admin } from './config/firebase-admin.config';

@Injectable()
export class FirebaseAdminService {

  public async sendMessage(createMessageDto: CreateMessageDto): Promise<void> {
    const { userRegistrationToken, message} = createMessageDto;

    const notificationPptions = {
      priority: 'high',
      timeToLive: 60 * 60 * 24
    };

    await admin.messaging().sendToDevice(
      userRegistrationToken, 
      { notification: { message } }, 
      notificationPptions
    );
  }
}

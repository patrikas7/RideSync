import { NotificationTypes } from "../../Constants/types";
import { generatePictureUri } from "../../Utils/utils";

export const getNotificationHeadline = (notificationType) => {
  if (notificationType === NotificationTypes.TRIP_WAS_EDITED)
    return "Pakeitimai būsimoje kelionėje!";

  if (notificationType === NotificationTypes.TRIP_WAS_CANCELED)
    return "Jūsų būsima kelionė buvo atšaukta!";

  if (notificationType === NotificationTypes.I_WAS_REMOVED_FROM_TRIP)
    return "Kelionės vairuotojas atšaukė jūsų rezervaciją!";

  if (notificationType === NotificationTypes.TRIP_REVIEW)
    return "Jus gavote įvertinimą vienoje iš kelionių";
};

export const getHeadlineText = (notificationType) => {
  if (notificationType === NotificationTypes.TRIP_WAS_EDITED)
    return "Dėmesio, kelionės vairuotojas atliko pakeitimus susisjusius su kelionės informacija!";

  if (notificationType === NotificationTypes.TRIP_WAS_CANCELED)
    return "Dėmesio, kelionės vairuotojas atšaukė kelionę, kurioje turėjote rezervaciją!";

  if (notificationType === NotificationTypes.I_WAS_REMOVED_FROM_TRIP)
    return "Dėmesio, kelionės vairuotojas atšaukė jūsų rezervaciją!";

  if (notificationType === NotificationTypes.TRIP_REVIEW)
    return "Jus gavote įvertinimą vienoje iš kelionių";
};

export const parseChatNotificationData = (notification, id) => {
  const { users, messages } = notification;

  if (!users || !messages || messages.length === 0) {
    return null;
  }

  const lastMessage = messages[messages.length - 1];
  const lastMessageSender = users.find((user) => user._id === lastMessage.user);
  const chatReceiver = users.find((user) => user._id !== id);

  const isLastMessageSentByMe = lastMessageSender?._id === id;

  return {
    text: `${isLastMessageSentByMe ? "Aš" : lastMessageSender?.name}: ${
      lastMessage.text
    }`,
    profilePictureUri: generatePictureUri(chatReceiver?.profilePicture),
    receiver: chatReceiver,
  };
};

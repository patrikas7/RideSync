import { NotificationTypes } from "../../Constants/notifications";

export const getNotificationHeadline = (notificationType) => {
  if (notificationType === NotificationTypes.TRIP_WAS_EDITED)
    return "Pakeitimai būsimoje kelionėje!";

  if (notificationType === NotificationTypes.TRIP_WAS_CANCELED)
    return "Jūsų būsima kelionė buvo atšaukta!";

  if (notificationType === NotificationTypes.I_WAS_REMOVED_FROM_TRIP)
    return "Kelionės vairuotojas atšaukė jūsų rezervaciją!";
};

export const getHeadlineText = (notificationType) => {
  if (notificationType === NotificationTypes.TRIP_WAS_EDITED)
    return "Dėmesio, kelionės vairuotojas atliko pakeitimus susisjusius su kelionės informacija!";

  if (notificationType === NotificationTypes.TRIP_WAS_CANCELED)
    return "Dėmesio, kelionės vairuotojas atšaukė kelionę, kurioje turėjote rezervaciją!";

  if (notificationType === NotificationTypes.I_WAS_REMOVED_FROM_TRIP)
    return "Dėmesio, kelionės vairuotojas atšaukė jūsų rezervaciją!";
};

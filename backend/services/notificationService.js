const { sendEmail } = require('../utils/emailProvider');
const { sendSMS } = require('../utils/twilioProvider');

const formatPhone = (mobile) => {
  if (!mobile) return null;
  let phone = mobile.toString().trim();
  if (phone.length === 10 && !phone.startsWith('+')) {
    return `+91${phone}`;
  } else if (!phone.startsWith('+')) {
    return `+${phone}`;
  }
  return phone;
};

const notifyCustomerNewEnquiry = async (enquiry) => {
  if (!enquiry.mobile) return;
  
  const phone = formatPhone(enquiry.mobile);

  const messageBody = `Dear ${enquiry.fullName},\n\nThank you for your enquiry with Varanasi SN Tour & Travels! We have received your details and our team will contact you with a free customized itinerary within 2 hours.\n\nWarm Regards,\nVaranasi SN Tour & Travels`;

  console.log(`[Notification Service] Attempting to send Customer SMS to: ${phone}`);
  Promise.all([
    sendSMS(phone, messageBody)
  ]).catch(err => console.error("Error sending customer notification:", err));
};

const notifyAdminNewEnquiry = async (enquiry) => {
  const subject = `New Tour Enquiry from ${enquiry.fullName}`;
  const messageBody = `
New Enquiry Details:
--------------------
Name: ${enquiry.fullName}
Mobile: ${enquiry.mobile}
Email: ${enquiry.email || 'N/A'}
City: ${enquiry.city || 'N/A'}
Travel Date: ${enquiry.travelDate || 'N/A'}
Guests: ${enquiry.adults} Adults, ${enquiry.children} Children
Budget: ${enquiry.budget || 'N/A'}
--------------------
Please contact them back within 2 hours!
  `.trim();

  // Fire and forget notifications
  console.log(`[Notification Service] Attempting to send Admin Email and Admin SMS for new enquiry...`);
  Promise.all([
    sendEmail(null, subject, messageBody),
    sendSMS(null, messageBody)
  ]).catch(err => console.error("Error in admin notification service:", err));

  // Also notify the customer
  notifyCustomerNewEnquiry(enquiry);
};

const notifyBookingConfirmed = async (booking) => {
  if (!booking.customerDetails || !booking.customerDetails.email) return;

  const subject = `Your Booking is Confirmed! [${booking.bookingId}]`;
  const messageBody = `Dear ${booking.customerDetails.fullName},\n\nGreat news! Your booking (${booking.bookingId}) has been confirmed by our team.\n\nTour Details:\nRoute: ${booking.packageDetails?.sourceCity} to ${booking.packageDetails?.destinationCity}\nVehicle: ${booking.packageDetails?.vehicleName}\nTravel Date: ${new Date(booking.travelDate).toLocaleDateString()}\n\nWe look forward to hosting you!\n\nWarm Regards,\nVaranasi SN Tour & Travels`;

  const phone = formatPhone(booking.customerDetails.mobile);

  console.log(`[Notification Service] Sending Booking Confirmation Email to: ${booking.customerDetails.email} and SMS to: ${phone}`);
  Promise.all([
    sendEmail(booking.customerDetails.email, subject, messageBody),
    phone ? sendSMS(phone, messageBody) : Promise.resolve()
  ]).catch(err => console.error("Error sending booking confirmation notification:", err));
};

const notifyBookingCancelled = async (booking) => {
  if (!booking.customerDetails || !booking.customerDetails.email) return;

  const subject = `Booking Update - Cancelled [${booking.bookingId}]`;
  const messageBody = `Dear ${booking.customerDetails.fullName},\n\nWe regret to inform you that your booking (${booking.bookingId}) has been cancelled.\nIf you have already paid an advance, the refund process has been initiated and should reflect in your account within 5-7 business days.\n\nWe apologize for the inconvenience and hope to serve you in the future.\n\nWarm Regards,\nVaranasi SN Tour & Travels`;

  const phone = formatPhone(booking.customerDetails.mobile);

  console.log(`[Notification Service] Sending Booking Cancellation Email to: ${booking.customerDetails.email} and SMS to: ${phone}`);
  Promise.all([
    sendEmail(booking.customerDetails.email, subject, messageBody),
    phone ? sendSMS(phone, messageBody) : Promise.resolve()
  ]).catch(err => console.error("Error sending booking cancellation notification:", err));
};

module.exports = {
  notifyAdminNewEnquiry,
  notifyCustomerNewEnquiry,
  notifyBookingConfirmed,
  notifyBookingCancelled
};

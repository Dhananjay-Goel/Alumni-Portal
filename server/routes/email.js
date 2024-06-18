const express = require('express');
const router = express.Router();

const {
    sendOTPmail, 
    verifyOTPmail,
    sendContactUsmail,
    sendGivingBackInKindmail,
    sendSignUpAsAdminEmail,
    sendReunionAlertmail,
    sendJobsmail,
    sendEventsTalkmail,
    sendEventsWorkshopsmail,
    sendEventsStartupPresentationsmail,
    sendMentorshipProgramsmail,
    sendCommunityServiceProjectsmail,
    sendEventsHackathonsmail,
    sendRejectionEmail
} = require('../controllers/emailController.js');

router.post('/sendotp', sendOTPmail);
router.post('/verifyotp', verifyOTPmail);
router.post('/contactUs', sendContactUsmail);
router.post('/signUpAsAdmin', sendSignUpAsAdminEmail);
router.post('/givingBackInKind', sendGivingBackInKindmail);
router.post('/invite', sendReunionAlertmail);
router.post('/events/talks', sendEventsTalkmail);
router.post('/events/workshops', sendEventsWorkshopsmail);
router.post('/events/startupPresentations', sendEventsStartupPresentationsmail);
router.post('/events/mentorshipPrograms', sendMentorshipProgramsmail);
router.post('/events/communityServiceProjects', sendCommunityServiceProjectsmail);
router.post('/events/hackathons', sendEventsHackathonsmail);
router.post('/jobs', sendJobsmail);
router.post('/rejection', sendRejectionEmail);

module.exports = {
    routes: router
}
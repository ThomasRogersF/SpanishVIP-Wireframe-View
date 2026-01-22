
let isRecording = false;
let isDrillRecording = false;
let isVocabSpeakingRecording = false;
let timerInterval = null;
let timeRemaining = 119; // 1:59 in seconds

function showLessonRunner() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('lesson-screen').style.display = 'block';
}

function showVoiceMode() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('lesson-screen').style.display = 'none';
    document.getElementById('success-screen').style.display = 'none';
    document.getElementById('speed-drill-screen').style.display = 'none';
    document.getElementById('drill-complete-screen').style.display = 'none';
    document.getElementById('voice-mode-screen').style.display = 'flex';
    document.getElementById('active-call-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'none';
}

function startActiveCall() {
    document.getElementById('voice-mode-screen').style.display = 'none';
    document.getElementById('active-call-screen').style.display = 'flex';
}

function endCall() {
    document.getElementById('active-call-screen').style.display = 'none';
    document.getElementById('voice-mode-screen').style.display = 'flex';
}

function showReviewScreen() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('lesson-screen').style.display = 'none';
    document.getElementById('success-screen').style.display = 'none';
    document.getElementById('speed-drill-screen').style.display = 'none';
    document.getElementById('drill-complete-screen').style.display = 'none';
    document.getElementById('voice-mode-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'flex';

    // Reset to Mistakes tab
    showMistakesTab();
}

function showMistakesTab() {
    // Toggle tab styling
    document.getElementById('mistakes-tab').className = 'px-6 py-2 rounded-full font-semibold text-sm transition-all bg-white text-orange-500 shadow-sm';
    document.getElementById('vocabulary-tab').className = 'px-6 py-2 rounded-full font-semibold text-sm transition-all text-gray-500';

    // Toggle content
    document.getElementById('mistakes-content').style.display = 'block';
    document.getElementById('vocabulary-content').style.display = 'none';
}

function showVocabularyTab() {
    // Toggle tab styling
    document.getElementById('mistakes-tab').className = 'px-6 py-2 rounded-full font-semibold text-sm transition-all text-gray-500';
    document.getElementById('vocabulary-tab').className = 'px-6 py-2 rounded-full font-semibold text-sm transition-all bg-white text-orange-500 shadow-sm';

    // Toggle content
    document.getElementById('mistakes-content').style.display = 'none';
    document.getElementById('vocabulary-content').style.display = 'block';
}

function showDashboard() {
    document.getElementById('dashboard-screen').style.display = 'block';
    document.getElementById('lesson-screen').style.display = 'none';
    document.getElementById('success-screen').style.display = 'none';
    document.getElementById('speed-drill-screen').style.display = 'none';
    document.getElementById('drill-complete-screen').style.display = 'none';
    document.getElementById('voice-mode-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'none';
    document.getElementById('ser-estar-concept-screen').style.display = 'none';
    document.getElementById('ser-estar-logic-screen').style.display = 'none';
    document.getElementById('ser-estar-speaking-screen').style.display = 'none';
    document.getElementById('vocab-drill-intro-screen').style.display = 'none';
    document.getElementById('vocab-teach-card1-screen').style.display = 'none';
    document.getElementById('vocab-teach-card2-screen').style.display = 'none';
    document.getElementById('vocab-speaking-screen').style.display = 'none';
    document.getElementById('vocab-listening-screen').style.display = 'none';
    document.getElementById('vocab-success-screen').style.display = 'none';
    document.getElementById('vip-survival-intro-screen').style.display = 'none';
    document.getElementById('vip-teach-shield-screen').style.display = 'none';
    document.getElementById('vip-teach-brake-screen').style.display = 'none';
    document.getElementById('vip-teach-tool-screen').style.display = 'none';
    document.getElementById('vip-logic-check-screen').style.display = 'none';
    document.getElementById('vip-speaking-drill-screen').style.display = 'none';
    document.getElementById('vip-scenario-setup-screen').style.display = 'none';
    document.getElementById('vip-roleplay-screen').style.display = 'none';
    document.getElementById('vip-success-screen').style.display = 'none';
    document.getElementById('vip-access-offer-screen').style.display = 'none';

    // Clear countdown timer if running
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    // Reset lesson screen
    document.getElementById('user-response').style.display = 'none';
    document.getElementById('feedback-card').style.display = 'none';
    document.getElementById('mic-button').style.display = 'flex';
    document.getElementById('mic-status').style.display = 'block';

    // Reset drill screen
    document.getElementById('drill-response').style.display = 'none';
    document.getElementById('drill-mic-button').style.display = 'flex';
    document.getElementById('drill-mic-status').style.display = 'block';
    timeRemaining = 119;
    document.getElementById('drill-timer').textContent = '01:59';
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Reset Ser vs Estar screens
    document.getElementById('ser-estar-response').style.display = 'none';
    document.getElementById('ser-estar-mic-button').style.display = 'flex';
    document.getElementById('ser-estar-mic-status').style.display = 'block';
    document.getElementById('ser-estar-mic-status').textContent = 'Hold to speak';
    document.getElementById('ser-estar-mic-status').style.color = '#6B7280';

    isRecording = false;
    isDrillRecording = false;
    isSerEstarRecording = false;
    isVocabSpeakingRecording = false;
    isVIPSpeakingRecording = false;
    isVIPRoleplayRecording = false;
}

function showSpeedDrill() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('speed-drill-screen').style.display = 'flex';

    // Start countdown timer
    timeRemaining = 119;
    timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('drill-timer').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
}

function showDrillComplete() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    document.getElementById('speed-drill-screen').style.display = 'none';
    document.getElementById('drill-complete-screen').style.display = 'flex';
}

function startRecording() {
    isRecording = true;
    const pulseRing = document.getElementById('pulse-ring');
    const micStatus = document.getElementById('mic-status');

    pulseRing.style.animation = 'pulse-ring 1.5s ease-out infinite';
    pulseRing.style.opacity = '0.6';
    micStatus.textContent = 'Listening...';
    micStatus.style.color = '#0AA6A6';
}

function stopRecording() {
    if (!isRecording) return;

    const pulseRing = document.getElementById('pulse-ring');
    const micStatus = document.getElementById('mic-status');

    pulseRing.style.animation = 'none';
    pulseRing.style.opacity = '0';
    micStatus.textContent = 'Processing...';

    // Simulate response after a short delay
    setTimeout(() => {
        document.getElementById('user-response').style.display = 'block';
        document.getElementById('mic-button').style.display = 'none';
        document.getElementById('mic-status').style.display = 'none';

        setTimeout(() => {
            document.getElementById('feedback-card').style.display = 'block';
        }, 800);
    }, 1000);

    isRecording = false;
}

function tryAgain() {
    document.getElementById('user-response').style.display = 'none';
    document.getElementById('feedback-card').style.display = 'none';
    document.getElementById('mic-button').style.display = 'flex';
    document.getElementById('mic-status').style.display = 'block';
    document.getElementById('mic-status').textContent = 'Hold to speak';
    document.getElementById('mic-status').style.color = '#6B7280';
}

function showSuccess() {
    document.getElementById('lesson-screen').style.display = 'none';
    document.getElementById('ser-estar-speaking-screen').style.display = 'none';
    document.getElementById('success-screen').style.display = 'flex';
}

function startDrillRecording() {
    isDrillRecording = true;
    const pulseRing = document.getElementById('drill-pulse-ring');
    const micStatus = document.getElementById('drill-mic-status');

    pulseRing.style.animation = 'pulse-ring 1.5s ease-out infinite';
    pulseRing.style.opacity = '0.6';
    micStatus.textContent = 'Listening...';
    micStatus.style.color = '#0AA6A6';
}

function stopDrillRecording() {
    if (!isDrillRecording) return;

    const pulseRing = document.getElementById('drill-pulse-ring');
    const micStatus = document.getElementById('drill-mic-status');

    pulseRing.style.animation = 'none';
    pulseRing.style.opacity = '0';
    micStatus.textContent = 'Processing...';

    // Show response and move to complete screen
    setTimeout(() => {
        document.getElementById('drill-response').style.display = 'block';
        document.getElementById('drill-mic-button').style.display = 'none';
        document.getElementById('drill-mic-status').style.display = 'none';

        setTimeout(() => {
            showDrillComplete();
        }, 1500);
    }, 1000);

    isDrillRecording = false;
}

// Ser vs Estar flow functions
let isSerEstarRecording = false;

function showSerEstarConcept() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('ser-estar-concept-screen').style.display = 'flex';
}

function showSerEstarLogicCheck() {
    document.getElementById('ser-estar-concept-screen').style.display = 'none';
    document.getElementById('ser-estar-logic-screen').style.display = 'flex';
}

function selectWrongAnswer() {
    // Show a brief shake animation or feedback
    const wrongButton = event.currentTarget;
    wrongButton.style.animation = 'shake 0.5s';
    setTimeout(() => {
        wrongButton.style.animation = '';
    }, 500);
}

function showSerEstarSpeaking() {
    document.getElementById('ser-estar-logic-screen').style.display = 'none';
    document.getElementById('ser-estar-speaking-screen').style.display = 'flex';
}

function startSerEstarRecording() {
    isSerEstarRecording = true;
    const pulseRing = document.getElementById('ser-estar-pulse-ring');
    const micStatus = document.getElementById('ser-estar-mic-status');

    pulseRing.style.animation = 'pulse-ring 1.5s ease-out infinite';
    pulseRing.style.opacity = '0.6';
    micStatus.textContent = 'Listening...';
    micStatus.style.color = '#0AA6A6';
}

function stopSerEstarRecording() {
    if (!isSerEstarRecording) return;

    const pulseRing = document.getElementById('ser-estar-pulse-ring');
    const micStatus = document.getElementById('ser-estar-mic-status');

    pulseRing.style.animation = 'none';
    pulseRing.style.opacity = '0';
    micStatus.textContent = 'Processing...';

    // Show response and move to success screen
    setTimeout(() => {
        document.getElementById('ser-estar-response').style.display = 'block';
        document.getElementById('ser-estar-mic-button').style.display = 'none';
        document.getElementById('ser-estar-mic-status').style.display = 'none';

        setTimeout(() => {
            showSuccess();
        }, 1500);
    }, 1000);

    isSerEstarRecording = false;
}

// Vocab Drill flow functions
function showVocabDrillIntro() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('vocab-drill-intro-screen').style.display = 'flex';
}

function showVocabTeachCard1() {
    document.getElementById('vocab-drill-intro-screen').style.display = 'none';
    document.getElementById('vocab-teach-card1-screen').style.display = 'flex';
}

function showVocabTeachCard2() {
    document.getElementById('vocab-teach-card1-screen').style.display = 'none';
    document.getElementById('vocab-teach-card2-screen').style.display = 'flex';
}

function showVocabSpeaking() {
    document.getElementById('vocab-teach-card2-screen').style.display = 'none';
    document.getElementById('vocab-speaking-screen').style.display = 'flex';
}

function startVocabSpeakingRecording() {
    isVocabSpeakingRecording = true;
    const pulseRing = document.getElementById('vocab-speaking-pulse-ring');
    const micStatus = document.getElementById('vocab-speaking-mic-status');

    pulseRing.style.animation = 'pulse-ring 1.5s ease-out infinite';
    pulseRing.style.opacity = '0.6';
    micStatus.textContent = 'Listening...';
    micStatus.style.color = '#0AA6A6';
}

function stopVocabSpeakingRecording() {
    if (!isVocabSpeakingRecording) return;

    const pulseRing = document.getElementById('vocab-speaking-pulse-ring');
    const micStatus = document.getElementById('vocab-speaking-mic-status');

    pulseRing.style.animation = 'none';
    pulseRing.style.opacity = '0';
    micStatus.textContent = 'Processing...';

    // Show listening challenge
    setTimeout(() => {
        document.getElementById('vocab-speaking-screen').style.display = 'none';
        document.getElementById('vocab-listening-screen').style.display = 'flex';
    }, 1000);

    isVocabSpeakingRecording = false;
}

function selectWrongListeningAnswer(button) {
    button.style.animation = 'shake 0.5s';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

function showVocabSuccess() {
    document.getElementById('vocab-listening-screen').style.display = 'none';
    document.getElementById('vocab-success-screen').style.display = 'flex';
}

// VIP Survival Phrases flow functions
let isVIPSpeakingRecording = false;
let isVIPRoleplayRecording = false;

function showVIPSurvivalIntro() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('vip-survival-intro-screen').style.display = 'flex';
}

function showVIPTeachShield() {
    document.getElementById('vip-survival-intro-screen').style.display = 'none';
    document.getElementById('vip-teach-shield-screen').style.display = 'flex';
}

function showVIPTeachBrake() {
    document.getElementById('vip-teach-shield-screen').style.display = 'none';
    document.getElementById('vip-teach-brake-screen').style.display = 'flex';
}

function showVIPTeachTool() {
    document.getElementById('vip-teach-brake-screen').style.display = 'none';
    document.getElementById('vip-teach-tool-screen').style.display = 'flex';
}

function showVIPLogicCheck() {
    document.getElementById('vip-teach-tool-screen').style.display = 'none';
    document.getElementById('vip-logic-check-screen').style.display = 'flex';
}

function selectWrongVIPAnswer(button) {
    button.style.animation = 'shake 0.5s';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

function showVIPSpeakingDrill() {
    document.getElementById('vip-logic-check-screen').style.display = 'none';
    document.getElementById('vip-speaking-drill-screen').style.display = 'flex';
}

function startVIPSpeakingRecording() {
    isVIPSpeakingRecording = true;
    const pulseRing = document.getElementById('vip-speaking-pulse-ring');
    const micStatus = document.getElementById('vip-speaking-mic-status');

    pulseRing.style.animation = 'pulse-ring 1.5s ease-out infinite';
    pulseRing.style.opacity = '0.6';
    micStatus.textContent = 'Listening...';
    micStatus.style.color = '#0AA6A6';
}

function stopVIPSpeakingRecording() {
    if (!isVIPSpeakingRecording) return;

    const pulseRing = document.getElementById('vip-speaking-pulse-ring');
    const micStatus = document.getElementById('vip-speaking-mic-status');

    pulseRing.style.animation = 'none';
    pulseRing.style.opacity = '0';
    micStatus.textContent = 'Processing...';

    // Show scenario setup
    setTimeout(() => {
        document.getElementById('vip-speaking-drill-screen').style.display = 'none';
        document.getElementById('vip-scenario-setup-screen').style.display = 'flex';
    }, 1000);

    isVIPSpeakingRecording = false;
}

function showVIPScenarioSetup() {
    document.getElementById('vip-speaking-drill-screen').style.display = 'none';
    document.getElementById('vip-scenario-setup-screen').style.display = 'flex';
}

function showVIPRoleplay() {
    document.getElementById('vip-scenario-setup-screen').style.display = 'none';
    document.getElementById('vip-roleplay-screen').style.display = 'flex';
}

function startVIPRoleplayRecording() {
    isVIPRoleplayRecording = true;
    const pulseRing = document.getElementById('vip-roleplay-pulse-ring');
    const micStatus = document.getElementById('vip-roleplay-mic-status');

    pulseRing.style.animation = 'pulse-ring 1.5s ease-out infinite';
    pulseRing.style.opacity = '0.6';
    micStatus.textContent = 'Listening...';
    micStatus.style.color = '#0AA6A6';
}

function stopVIPRoleplayRecording() {
    if (!isVIPRoleplayRecording) return;

    const pulseRing = document.getElementById('vip-roleplay-pulse-ring');
    const micStatus = document.getElementById('vip-roleplay-mic-status');

    pulseRing.style.animation = 'none';
    pulseRing.style.opacity = '0';
    micStatus.textContent = 'Processing...';

    // Show success screen
    setTimeout(() => {
        document.getElementById('vip-roleplay-screen').style.display = 'none';
        document.getElementById('vip-success-screen').style.display = 'flex';
    }, 1000);

    isVIPRoleplayRecording = false;
}

// VIP Access Offer (Sales Page) functions
let countdownInterval = null;
let offerTimeRemaining = 299; // 4:59 in seconds

function showVIPAccessOffer() {
    // Hide all other screens
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('lesson-screen').style.display = 'none';
    document.getElementById('success-screen').style.display = 'none';
    document.getElementById('speed-drill-screen').style.display = 'none';
    document.getElementById('drill-complete-screen').style.display = 'none';
    document.getElementById('voice-mode-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'none';
    document.getElementById('ser-estar-concept-screen').style.display = 'none';
    document.getElementById('ser-estar-logic-screen').style.display = 'none';
    document.getElementById('ser-estar-speaking-screen').style.display = 'none';
    document.getElementById('vocab-drill-intro-screen').style.display = 'none';
    document.getElementById('vocab-teach-card1-screen').style.display = 'none';
    document.getElementById('vocab-teach-card2-screen').style.display = 'none';
    document.getElementById('vocab-speaking-screen').style.display = 'none';
    document.getElementById('vocab-listening-screen').style.display = 'none';
    document.getElementById('vocab-success-screen').style.display = 'none';
    document.getElementById('vip-survival-intro-screen').style.display = 'none';
    document.getElementById('vip-teach-shield-screen').style.display = 'none';
    document.getElementById('vip-teach-brake-screen').style.display = 'none';
    document.getElementById('vip-teach-tool-screen').style.display = 'none';
    document.getElementById('vip-logic-check-screen').style.display = 'none';
    document.getElementById('vip-speaking-drill-screen').style.display = 'none';
    document.getElementById('vip-scenario-setup-screen').style.display = 'none';
    document.getElementById('vip-roleplay-screen').style.display = 'none';
    document.getElementById('vip-success-screen').style.display = 'none';

    // Show VIP Access Offer screen
    document.getElementById('vip-access-offer-screen').style.display = 'flex';

    // Start countdown
    offerTimeRemaining = 299;
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(() => {
        offerTimeRemaining--;
        const minutes = Math.floor(offerTimeRemaining / 60);
        const seconds = offerTimeRemaining % 60;
        document.getElementById('offer-countdown').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (offerTimeRemaining <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }, 1000);
}

function selectFlexiblePlan() {
    // Visual feedback for selection
    const flexibleCard = document.getElementById('flexible-plan-card');
    const intensiveCard = document.getElementById('intensive-plan-card');

    flexibleCard.classList.remove('border-gray-300');
    flexibleCard.classList.add('border-teal-500');

    intensiveCard.classList.remove('border-teal-500');
    intensiveCard.classList.add('border-gray-300');
}

function selectIntensivePlan() {
    // Visual feedback for selection (default selected)
    const flexibleCard = document.getElementById('flexible-plan-card');
    const intensiveCard = document.getElementById('intensive-plan-card');

    flexibleCard.classList.remove('border-teal-500');
    flexibleCard.classList.add('border-gray-300');

    intensiveCard.classList.remove('border-gray-300');
    intensiveCard.classList.add('border-teal-500');
}

// Toggle Module 1 expansion on dashboard
function toggleModule1() {
    const lessonsList = document.getElementById('module1-lessons');
    const icon = document.getElementById('module1-icon');

    if (lessonsList.style.display === 'none') {
        lessonsList.style.display = 'block';
        icon.style.transform = 'rotate(90deg)';
    } else {
        lessonsList.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}

const defaultConfig = {
    hero_headline: "Continue Unit 1: Cafe Culture",
    hero_subheadline: "Lesson 4: Ordering with Politeness",
    hero_button: "Resume Class",
    sofia_nudge: "You left off at the Roleplay. Let's finish ordering that coffee.",
    quick_win_headline: "Short on time?",
    quick_win_action: "Do a 2-Min Vocab Drill ⚡",
    upsell_text: "Stuck on a concept?",
    upsell_action: "Book a Human Tutor ($15)",
    hero_card_bg: "#14B8A6",
    hero_card_text: "#FFFFFF",
    surface_color: "#FFFFFF",
    text_color: "#111827",
    primary_action_color: "#FFFFFF"
};

let config = { ...defaultConfig };

async function onConfigChange(cfg) {
    config = { ...defaultConfig, ...cfg };

    // Update text content
    const heroHeadline = document.getElementById('hero-headline');
    if (heroHeadline) heroHeadline.textContent = config.hero_headline || defaultConfig.hero_headline;

    const heroSub = document.getElementById('hero-subheadline');
    if (heroSub) heroSub.textContent = config.hero_subheadline || defaultConfig.hero_subheadline;

    const heroBtn = document.getElementById('hero-button');
    if (heroBtn) heroBtn.textContent = config.hero_button || defaultConfig.hero_button;

    const sofiaNudge = document.getElementById('sofia-nudge');
    if (sofiaNudge) sofiaNudge.textContent = config.sofia_nudge || defaultConfig.sofia_nudge;

    const quickWinHead = document.getElementById('quick-win-headline');
    if (quickWinHead) quickWinHead.textContent = config.quick_win_headline || defaultConfig.quick_win_headline;

    const quickWinAction = document.getElementById('quick-win-action');
    if (quickWinAction) quickWinAction.textContent = config.quick_win_action || defaultConfig.quick_win_action;

    const upsellText = document.getElementById('upsell-text');
    if (upsellText) upsellText.textContent = config.upsell_text || defaultConfig.upsell_text;

    const upsellAction = document.getElementById('upsell-action');
    if (upsellAction) upsellAction.textContent = config.upsell_action || defaultConfig.upsell_action;

    // Update colors
    const heroBg = config.hero_card_bg || defaultConfig.hero_card_bg;
    const heroText = config.hero_card_text || defaultConfig.hero_card_text;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryAction = config.primary_action_color || defaultConfig.primary_action_color;

    // Apply hero card colors
    const heroCard = document.getElementById('hero-card');
    if (heroCard) {
        heroCard.style.backgroundColor = heroBg;
        heroCard.style.color = heroText;
    }

    if (heroHeadline) heroHeadline.style.color = heroText;
    if (heroSub) heroSub.style.color = heroText;
    if (sofiaNudge) sofiaNudge.style.color = heroText;

    // Hero button
    if (heroBtn) {
        heroBtn.style.backgroundColor = primaryAction;
        heroBtn.style.color = heroBg;
    }

    // Main background
    const appWrapper = document.getElementById('app-wrapper');
    if (appWrapper) appWrapper.style.backgroundColor = surfaceColor;

    // Text colors
    document.querySelectorAll('h3, h4, .text-gray-900').forEach(el => {
        if (!el.closest('#hero-card')) {
            el.style.color = textColor;
        }
    });
}

function mapToCapabilities(cfg) {
    return {
        recolorables: [
            {
                get: () => cfg.hero_card_bg || defaultConfig.hero_card_bg,
                set: (value) => { cfg.hero_card_bg = value; window.elementSdk.setConfig({ hero_card_bg: value }); }
            },
            {
                get: () => cfg.hero_card_text || defaultConfig.hero_card_text,
                set: (value) => { cfg.hero_card_text = value; window.elementSdk.setConfig({ hero_card_text: value }); }
            },
            {
                get: () => cfg.surface_color || defaultConfig.surface_color,
                set: (value) => { cfg.surface_color = value; window.elementSdk.setConfig({ surface_color: value }); }
            },
            {
                get: () => cfg.text_color || defaultConfig.text_color,
                set: (value) => { cfg.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
            },
            {
                get: () => cfg.primary_action_color || defaultConfig.primary_action_color,
                set: (value) => { cfg.primary_action_color = value; window.elementSdk.setConfig({ primary_action_color: value }); }
            }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(cfg) {
    return new Map([
        ["hero_headline", cfg.hero_headline || defaultConfig.hero_headline],
        ["hero_subheadline", cfg.hero_subheadline || defaultConfig.hero_subheadline],
        ["hero_button", cfg.hero_button || defaultConfig.hero_button],
        ["sofia_nudge", cfg.sofia_nudge || defaultConfig.sofia_nudge],
        ["quick_win_headline", cfg.quick_win_headline || defaultConfig.quick_win_headline],
        ["quick_win_action", cfg.quick_win_action || defaultConfig.quick_win_action],
        ["upsell_text", cfg.upsell_text || defaultConfig.upsell_text],
        ["upsell_action", cfg.upsell_action || defaultConfig.upsell_action]
    ]);
}

// Initialize SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
} else {
    onConfigChange(defaultConfig);
}

// Export functions to window for onclick handlers
window.showLessonRunner = showLessonRunner;
window.showVoiceMode = showVoiceMode;
window.startActiveCall = startActiveCall;
window.endCall = endCall;
window.showReviewScreen = showReviewScreen;
window.showMistakesTab = showMistakesTab;
window.showVocabularyTab = showVocabularyTab;
window.showDashboard = showDashboard;
window.showSpeedDrill = showSpeedDrill;
window.showDrillComplete = showDrillComplete;
window.startRecording = startRecording;
window.stopRecording = stopRecording;
window.tryAgain = tryAgain;
window.showSuccess = showSuccess;
window.startDrillRecording = startDrillRecording;
window.stopDrillRecording = stopDrillRecording;
window.showSerEstarConcept = showSerEstarConcept;
window.showSerEstarLogicCheck = showSerEstarLogicCheck;
window.selectWrongAnswer = selectWrongAnswer;
window.showSerEstarSpeaking = showSerEstarSpeaking;
window.startSerEstarRecording = startSerEstarRecording;
window.stopSerEstarRecording = stopSerEstarRecording;
window.showVocabDrillIntro = showVocabDrillIntro;
window.showVocabTeachCard1 = showVocabTeachCard1;
window.showVocabTeachCard2 = showVocabTeachCard2;
window.showVocabSpeaking = showVocabSpeaking;
window.startVocabSpeakingRecording = startVocabSpeakingRecording;
window.stopVocabSpeakingRecording = stopVocabSpeakingRecording;
window.selectWrongListeningAnswer = selectWrongListeningAnswer;
window.showVocabSuccess = showVocabSuccess;
window.showVIPSurvivalIntro = showVIPSurvivalIntro;
window.showVIPTeachShield = showVIPTeachShield;
window.showVIPTeachBrake = showVIPTeachBrake;
window.showVIPTeachTool = showVIPTeachTool;
window.showVIPLogicCheck = showVIPLogicCheck;
window.selectWrongVIPAnswer = selectWrongVIPAnswer;
window.showVIPSpeakingDrill = showVIPSpeakingDrill;
window.startVIPSpeakingRecording = startVIPSpeakingRecording;
window.stopVIPSpeakingRecording = stopVIPSpeakingRecording;
window.showVIPScenarioSetup = showVIPScenarioSetup;
window.showVIPRoleplay = showVIPRoleplay;
window.startVIPRoleplayRecording = startVIPRoleplayRecording;
window.stopVIPRoleplayRecording = stopVIPRoleplayRecording;
window.showVIPAccessOffer = showVIPAccessOffer;
window.selectFlexiblePlan = selectFlexiblePlan;
window.selectIntensivePlan = selectIntensivePlan;
window.toggleModule1 = toggleModule1;

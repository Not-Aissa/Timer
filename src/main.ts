import storageGet from "./scripts/helpers/storageGet";
import storageSet from "./scripts/helpers/storageSet";
import { TimerInfo } from "./scripts/types";
import { Button, Paragraph, Span } from "./scripts/types/elements";

const minutesElm = document.querySelector<Paragraph>("#minutes_content")!;
const secondsElm = document.querySelector<Paragraph>("#seconds_content")!;
const mSecondsElm = document.querySelector<Paragraph>("#m_seconds_content")!;
const startButton = document.querySelector<Button>("#start_btn")!;
const stopButton = document.querySelector<Button>("#stop_btn")!;
const resetButton = document.querySelector<Button>("#reset_btn")!;
const developerElm = document.querySelector<Span>("#developer")!;
const currentYearElm = document.querySelector<Span>("#current_year")!;

const timer_info: Readonly<TimerInfo> = {
  developer: "Aissa Bedr",
  email: "aissabedr74@gmail.com",
  currentYear: new Date().getFullYear(),
};

let timer = 0;
let minutes: number = storageGet("minutes", true) || 0;
let seconds: number = storageGet("seconds", true) || 0;
let m_seconds: number = storageGet("m_seconds", true) || 0;
let is_timer_start = false;

window.addEventListener("load", () => {
  setupTimer();
  handleStorageChanges();
  showTimerInfo();
});

startButton.addEventListener("click", () => startTimer());

stopButton.addEventListener("click", () => stopTimer());

resetButton.addEventListener("click", () => resetTimer());

function setupTimer(): void {
  updateMinutes();
  updateSeconds();
  updateMSeconds();
}

function updateMinutes(): number {
  minutesElm.textContent = `${minutes < 10 ? "0" : ""}${minutes}`;

  storageSet("minutes", minutes);

  return minutes;
}

function updateSeconds(): number {
  secondsElm.textContent = `${seconds < 10 ? "0" : ""}${seconds}`;

  storageSet("seconds", seconds);

  return seconds;
}

function updateMSeconds(): number {
  mSecondsElm.textContent = `${m_seconds < 10 ? "0" : ""}${m_seconds}`;

  storageSet("m_seconds", m_seconds);

  return m_seconds;
}

function startTimer(): void {
  if (!is_timer_start) {
    timer = setInterval(() => {
      m_seconds += 1;

      updateMSeconds();

      mSecondsElm.classList.add("active");

      is_timer_start = true;

      if (m_seconds === 100) {
        seconds += 1;

        updateSeconds();

        secondsElm.classList.add("active");

        m_seconds = 0;
      }

      if (seconds === 60) {
        minutes += 1;

        updateMinutes();

        minutesElm.classList.add("active");

        seconds = 0;
      }

      if (minutes === 60) {
        m_seconds = 0;

        seconds = 0;

        minutes = 0;

        mSecondsElm.classList.remove("active");
        secondsElm.classList.remove("active");
        minutesElm.classList.remove("active");

        updateMSeconds();
        updateSeconds();
        updateMinutes();
      }
    }, 0);
  }
}

function stopTimer(): void {
  if (is_timer_start) {
    clearInterval(timer);

    is_timer_start = false;
  }
}

function resetTimer(): void {
  stopTimer();

  m_seconds = 0;

  seconds = 0;

  minutes = 0;

  mSecondsElm.classList.remove("active");
  secondsElm.classList.remove("active");
  minutesElm.classList.remove("active");

  updateMSeconds();
  updateSeconds();
  updateMinutes();
}

function handleStorageChanges(): void {
  handleMSecondsChange();
  handleSecondsChange();
  handleMinutesChange();
}

function handleMinutesChange(): void {
  if (storageGet("minutes", true)) minutesElm.classList.add("active");
}

function handleSecondsChange(): void {
  if (storageGet("seconds", true)) secondsElm.classList.add("active");
}

function handleMSecondsChange(): void {
  if (storageGet("m_seconds", true)) mSecondsElm.classList.add("active");
}

function showTimerInfo(): void {
  const { developer, currentYear } = timer_info;

  developerElm.textContent = developer;

  currentYearElm.textContent = `${currentYear}`;
}

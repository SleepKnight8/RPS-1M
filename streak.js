export let current_streak = Number(localStorage.getItem("current_streak")) || 0;
export let best_streak = Number(localStorage.getItem("best_streak")) || current_streak;

export function isNextDay(lastDateStr) {
    if (!lastDateStr) {
        current_streak = 1;
        localStorage.setItem("current_streak", current_streak);
        localStorage.setItem("last_visit", new Date().toISOString());
        return;
    }

    const last = new Date(lastDateStr);
    const today = new Date();

    last.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diff = today.getTime() - last.getTime();

    if (diff === 86400000) {
        current_streak++;
        localStorage.setItem("current_streak", current_streak);
    }
    else if (diff > 86400000) {
        current_streak = 1;
        localStorage.setItem("current_streak", current_streak);
    }

    if (current_streak > best_streak) {
        best_streak = current_streak;
        localStorage.setItem("best_streak", best_streak);
    }

    localStorage.setItem("last_visit", new Date().toISOString());
}

//Written by ChatGPT

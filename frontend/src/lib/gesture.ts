// src/lib/gesture.ts
// Two-finger long-press detection utility for touch devices.
// Used by Focus Prayer to activate focus mode via a two-finger hold gesture.
//
// Usage:
//   const handlers = useTwoFingerPress({ onTrigger: () => startFocus() });
//   <div {...handlers}>...</div>
//
// The gesture fires `onTrigger` when:
//   1. Exactly two touch points are active simultaneously.
//   2. They are held for at least `holdMs` milliseconds without moving > `moveTolerance` px.

export interface TwoFingerPressOptions {
  /** Milliseconds the two fingers must be held before triggering. Default: 600 */
  holdMs?: number;
  /** Maximum pixel drift allowed during the hold. Default: 10 */
  moveTolerance?: number;
  /** Callback fired when the gesture is recognised */
  onTrigger: () => void;
}

export interface TwoFingerPressHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTouchCancel: (e: React.TouchEvent) => void;
}

interface TouchPoint {
  id: number;
  startX: number;
  startY: number;
}

/**
 * Returns touch event handlers that detect a two-finger long-press.
 * Intended to be spread onto a touchable JSX element.
 */
export function createTwoFingerPressHandlers(
  options: TwoFingerPressOptions
): TwoFingerPressHandlers {
  const { holdMs = 600, moveTolerance = 10, onTrigger } = options;

  let timer: ReturnType<typeof setTimeout> | null = null;
  let points: TouchPoint[] = [];
  let triggered = false;

  function clear() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    points = [];
    triggered = false;
  }

  function onTouchStart(e: React.TouchEvent) {
    // Rebuild points from the current touch list
    points = Array.from(e.touches).map((t) => ({
      id: t.identifier,
      startX: t.clientX,
      startY: t.clientY,
    }));

    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    triggered = false;

    if (points.length === 2) {
      timer = setTimeout(() => {
        if (points.length === 2 && !triggered) {
          triggered = true;
          onTrigger();
        }
        timer = null;
      }, holdMs);
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (points.length !== 2 || triggered) return;

    for (const touch of Array.from(e.changedTouches)) {
      const start = points.find((p) => p.id === touch.identifier);
      if (!start) continue;
      const dx = Math.abs(touch.clientX - start.startX);
      const dy = Math.abs(touch.clientY - start.startY);
      if (dx > moveTolerance || dy > moveTolerance) {
        clear();
        return;
      }
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    // If either finger lifts before the hold completes, cancel
    if (e.touches.length < 2) {
      clear();
    }
  }

  function onTouchCancel() {
    clear();
  }

  return { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel };
}

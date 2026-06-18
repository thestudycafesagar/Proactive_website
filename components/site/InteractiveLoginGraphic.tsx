"use client";

// === TYPES ===
interface Props {
  emailLength: number;
  isPasswordFocused: boolean;
  hasError: boolean;
}

export function InteractiveLoginGraphic({ emailLength, isPasswordFocused, hasError }: Props) {
  // Pupil tracking — maps email length (0-30) to horizontal shift (-5 to +5)
  const max = 30;
  const clamped = Math.min(emailLength, max);
  // When no input and not in password, eyes look slightly left-center
  const trackX = emailLength > 0 ? -5 + (clamped / max) * 10 : 0;
  const trackY = emailLength > 0 ? 2 : 0;

  const transitionStyle = "transition-all duration-400 ease-out";

  // ─── Paths for MOUTHS ─────────────────────────────────────────────
  // Purple character mouth
  const purpleSmile = "M -8,2 Q 0,8 8,2";
  const purpleFrown = "M -8,-2 Q 0,-8 8,-2";
  const purpleMouth = hasError ? purpleFrown : purpleSmile;

  // Orange character mouth
  const orangeSmile = "M -6,2 Q 0,7 6,2";
  const orangeFrown = "M -6,-2 Q 0,-7 6,-2";
  const orangeMouth = hasError ? orangeFrown : orangeSmile;

  // Yellow bird beak (horizontal line)
  const yellowBeak = "M 0,0 L 22,0";

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#EDECEA]">
      {/*
        SVG Viewport: 440 × 520
        Characters are arranged from bottom-center, growing upward.
        Layout (approximate pixel positions):
          • Orange semicircle  — cx=155, bottom=480, r=100
          • Purple tall rect   — x=120, y=155, w=90, h=255 → to y=410
          • Black  rect        — x=195, y=235, w=68, h=175 → to y=410
          • Yellow bird        — cx=305, bottom=410, ellipse 60x90

        Blindfold: black rect + eyes, slides in from top when password is focused.
      */}
      <svg
        viewBox="0 0 440 520"
        className="w-full h-full max-w-[500px]"
        style={{ maxHeight: "100%" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ════════════════════════════════════════
            CHARACTER GROUP — shifts slightly when password focused
            ════════════════════════════════════════ */}
        <g
          className={transitionStyle}
          style={{ transform: isPasswordFocused ? "translateY(8px)" : "translateY(0px)" }}
        >

          {/* ── ORANGE SEMICIRCLE (bottom, background) ── */}
          {/* A semicircle facing up: path from left edge, arc up to right edge, straight back */}
          <g
            className={transitionStyle}
            style={{
              transform: isPasswordFocused
                ? "translate(-12px, 12px)"
                : "translate(0px, 0px)",
            }}
          >
            {/* Body: large half-circle. Sits at y=380, radius ≈108 */}
            <path
              d="M 47,480 A 108,108 0 0,1 263,480 Z"
              fill="#FF7A37"
            />

            {/* Orange eyes */}
            {!isPasswordFocused ? (
              <>
                {/* left eye */}
                <circle cx="117" cy="415" r="5" fill="#1A1A1A" />
                {/* right eye */}
                <circle cx="153" cy="415" r="5" fill="#1A1A1A" />
              </>
            ) : (
              <>
                <path d="M 110,415 L 124,415" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 146,415 L 160,415" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
              </>
            )}

            {/* Orange mouth */}
            <g transform="translate(135, 442)">
              <path
                d={orangeMouth}
                stroke="#1A1A1A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                className={transitionStyle}
              />
            </g>
          </g>

          {/* ── PURPLE TALL RECTANGLE ── */}
          <g
            className={transitionStyle}
            style={{
              transformOrigin: "165px 410px",
              transform: isPasswordFocused
                ? "rotate(-6deg) translate(-4px, 0px)"
                : "rotate(0deg)",
            }}
          >
            {/* Body */}
            <rect x="120" y="155" width="90" height="255" rx="6" fill="#6B3FD4" />

            {/* Purple eyes */}
            {!isPasswordFocused ? (
              <>
                {/* White sclera left */}
                <ellipse cx="143" cy="194" rx="8" ry="9" fill="white" />
                {/* Pupil left */}
                <circle
                  r="4.5"
                  fill="#1A1A1A"
                  className={transitionStyle}
                  style={{ transform: `translate(${143 + trackX}px, ${194 + trackY}px)` }}
                />
                {/* White sclera right */}
                <ellipse cx="170" cy="194" rx="8" ry="9" fill="white" />
                {/* Pupil right */}
                <circle
                  r="4.5"
                  fill="#1A1A1A"
                  className={transitionStyle}
                  style={{ transform: `translate(${170 + trackX}px, ${194 + trackY}px)` }}
                />
              </>
            ) : (
              <>
                {/* Closed eyes — horizontal dashes */}
                <path d="M 135,194 L 151,194" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M 162,194 L 178,194" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {/* Purple mouth */}
            <g transform="translate(157, 222)">
              <path
                d={purpleMouth}
                stroke="#1A1A1A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                className={transitionStyle}
              />
            </g>
          </g>

          {/* ── BLACK RECTANGLE (middle, shorter) ── */}
          <g
            className={transitionStyle}
            style={{
              transformOrigin: "229px 410px",
              transform: isPasswordFocused
                ? "translateY(-18px)"
                : "translateY(0px)",
            }}
          >
            {/* Body */}
            <rect x="195" y="235" width="68" height="175" rx="5" fill="#1A1A1A" />

            {/* Black char eyes */}
            {!isPasswordFocused ? (
              <>
                {/* Left eye */}
                <ellipse cx="212" cy="265" rx="7" ry="8" fill="white" />
                <circle
                  r="4"
                  fill="#1A1A1A"
                  style={{ transform: `translate(${212 + trackX}px, ${265 + trackY}px)` }}
                  className={transitionStyle}
                />
                {/* Right eye */}
                <ellipse cx="247" cy="265" rx="7" ry="8" fill="white" />
                <circle
                  r="4"
                  fill="#1A1A1A"
                  style={{ transform: `translate(${247 + trackX}px, ${265 + trackY}px)` }}
                  className={transitionStyle}
                />
              </>
            ) : (
              <>
                <path d="M 204,265 L 220,265" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M 239,265 L 255,265" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* ── YELLOW BIRD (right side, teardrop / Pac-Man shape) ── */}
          <g
            className={transitionStyle}
            style={{
              transformOrigin: "305px 410px",
              transform: isPasswordFocused
                ? "rotate(8deg) translate(6px, -4px)"
                : "rotate(0deg)",
            }}
          >
            {/* Body: an upright oval/teardrop — pointed at top, flat at bottom */}
            <ellipse cx="305" cy="335" rx="55" ry="75" fill="#EFC93D" />

            {/* Beak — horizontal line sticking out right */}
            {!isPasswordFocused ? (
              <g transform="translate(340, 345)">
                <path d={yellowBeak} stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
              </g>
            ) : (
              <g transform="translate(340, 345)">
                <path d={yellowBeak} stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {/* Yellow eye (single, small dot) */}
            {!isPasswordFocused ? (
              <circle
                r="3.5"
                fill="#1A1A1A"
                style={{ transform: `translate(${291 + trackX}px, ${305 + trackY}px)` }}
                className={transitionStyle}
              />
            ) : (
              <path d="M 286,305 L 300,305" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
            )}
          </g>

        </g>

        {/* ════════════════════════════════════════
            BLINDFOLD — slides in from top on password focus
            Matches screenshot: a black rounded rectangle with 2 white dot eyes
            ════════════════════════════════════════ */}
        <g
          className="transition-all duration-500 ease-in-out"
          style={{
            transform: isPasswordFocused ? "translateY(0)" : "translateY(-260px)",
          }}
        >
          {/* The black hanging strip, positioned to slide over characters' faces */}
          <rect x="148" y="0" width="74" height="195" rx="6" fill="#1A1A1A" />

          {/* Eyes on the blindfold */}
          <circle cx="172" cy="170" r="6" fill="white" />
          <circle cx="172" cy="170" r="3" fill="#1A1A1A" />
          <circle cx="198" cy="170" r="6" fill="white" />
          <circle cx="198" cy="170" r="3" fill="#1A1A1A" />
        </g>
      </svg>
    </div>
  );
}

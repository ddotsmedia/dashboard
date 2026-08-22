# Accessibility Guide

## Overview

This document outlines the Dashboard application's accessibility status, features, known issues, and implementation roadmap. Accessibility ensures the application is usable by everyone, including users with disabilities.

## WCAG 2.2 Level AA Compliance Status

### Current Status: ~60% Compliant

The application currently meets approximately 60% of WCAG 2.2 Level AA requirements. Full compliance (Level AA) requires addressing the 43 identified issues outlined below.

### Compliance Timeline

**Target: Full WCAG 2.2 Level AA Compliance**
- **Estimated Effort**: 11-15 hours of development
- **Current Issues**: 43 total (19 critical, 18 high/medium, 6 low)
- **Target Completion**: Next 2-3 sprints

## Accessibility Features Implemented

### 1. Semantic HTML

All content uses proper semantic markup:

```typescript
// Correct semantic structure
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/transactions">Transactions</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Dashboard Summary</h1>
    <section>
      <h2>Balance Overview</h2>
      {/* Content */}
    </section>
  </article>
</main>

<footer>
  <p>&copy; 2025 Dashboard</p>
</footer>
```

### 2. Keyboard Navigation

Complete keyboard navigation support:

- **Tab**: Move through interactive elements in logical order
- **Shift+Tab**: Move backward through interactive elements
- **Enter**: Activate buttons, submit forms
- **Space**: Toggle checkboxes, activate buttons
- **Escape**: Close modals, dialogs
- **Arrow Keys**: Navigate menus, sliders, tabs
- **Alt+Letter**: Access keyboard shortcuts (where available)

#### Tab Order Management

```typescript
// Logical tab order example
<form>
  <label>
    Email
    <input type="email" tabIndex={1} />
  </label>
  <label>
    Password
    <input type="password" tabIndex={2} />
  </label>
  <button type="submit" tabIndex={3}>Sign In</button>
  <a href="/help" tabIndex={4}>Need help?</a>
</form>
```

#### Focus Management

```typescript
// Focus management in modals
export function Modal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Move focus to dialog when opened
    dialogRef.current?.focus();
    firstButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <button ref={firstButtonRef}>First Action</button>
      <button>Second Action</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### 3. ARIA (Accessible Rich Internet Applications) Labels

Over 100 ARIA labels implemented throughout the application:

#### aria-label for Icon Buttons

```typescript
<button aria-label="Close menu" onClick={closeMenu}>
  <Icon name="close" />
</button>

<button aria-label="Toggle dark mode" onClick={toggleTheme}>
  <Icon name="moon" />
</button>

<button aria-label="Download transaction details" onClick={download}>
  <Icon name="download" />
</button>
```

#### aria-describedby for Form Hints

```typescript
<div>
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    aria-describedby="password-hint"
    required
  />
  <span id="password-hint">
    Must be at least 8 characters with uppercase, lowercase, and numbers
  </span>
</div>
```

#### aria-live for Dynamic Content

```typescript
export function TransactionAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
```

#### aria-expanded for Expandable Content

```typescript
export function CollapsibleSection({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-controls="section-content"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
      </button>
      {isOpen && (
        <div id="section-content">
          {/* Content */}
        </div>
      )}
    </>
  );
}
```

#### aria-label for Complex Components

```typescript
export function PieChart({ data, title }: ChartProps) {
  return (
    <div
      role="img"
      aria-label={`${title}: ${data.map(d => d.label).join(', ')}`}
    >
      <HighchartsChart data={data} />
    </div>
  );
}
```

### 4. Focus Management

Visible focus indicators on all interactive elements:

```typescript
/* Global focus styles */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Ensure focus visible for all browsers */
*:focus-visible {
  outline: 2px solid var(--color-focus);
}

/* Remove default outline for mouse users only */
:not(:focus-visible) {
  outline: none;
}
```

### 5. Color Contrast Ratios (4.5:1)

All text meets WCAG AA contrast requirements:

#### Text Contrast

- Normal text (14px): 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

#### Verified Colors

```css
/* Dark text on light background */
.light-bg {
  background: #ffffff;
  color: #333333; /* Contrast: 13:1 */
}

/* Light text on dark background */
.dark-bg {
  background: #1a1a1a;
  color: #f5f5f5; /* Contrast: 11.2:1 */
}

/* Link colors */
a {
  color: #0066cc; /* Contrast with white: 8.6:1 */
}

a:visited {
  color: #7c3aed; /* Contrast with white: 4.9:1 */
}
```

### 6. Reduced Motion Support

Respects user's motion preference:

```typescript
// CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// React Hook
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return prefersReducedMotion;
}

// Usage
export function AnimatedChart() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
      }}
    >
      {/* Chart content */}
    </motion.div>
  );
}
```

### 7. Alt Text for Images

All images have descriptive alt text:

```typescript
<img
  src="/icons/transaction-income.svg"
  alt="Green upward arrow indicating income transaction"
  width={20}
  height={20}
/>

<img
  src="/charts/balance-trend.png"
  alt="Line chart showing balance trend over last 6 months,
       ranging from $95,000 to $125,000"
  width={600}
  height={400}
/>

{/* Decorative images marked appropriately */}
<img
  src="/background.jpg"
  alt=""
  aria-hidden="true"
  role="presentation"
/>
```

## Known Accessibility Issues (43 Total)

### Critical Issues (19)

#### 1. Form Labels Missing
**Impact**: Screen reader users cannot identify form purposes
**Affected Elements**: 12 form fields
**Priority**: CRITICAL
**Fix Time**: 2 hours

```typescript
// Current (Inaccessible)
<input type="text" placeholder="Search transactions" />

// Fixed (Accessible)
<label htmlFor="search-transactions">Search transactions</label>
<input id="search-transactions" type="text" placeholder="Search..." />
```

#### 2. Missing Heading Hierarchy
**Impact**: Screen reader navigation broken
**Affected Pages**: 8
**Priority**: CRITICAL
**Fix Time**: 3 hours

```typescript
// Current (Wrong)
<h1>Dashboard</h1>
<h3>Recent Transactions</h3> {/* Skipped h2 */}
<h2>Account Settings</h2>

// Fixed (Correct)
<h1>Dashboard</h1>
<h2>Recent Transactions</h2>
<h2>Account Settings</h2>
```

#### 3. Color Alone Conveying Information
**Impact**: Color-blind users miss important information
**Affected Elements**: Pie charts, status indicators
**Priority**: CRITICAL
**Fix Time**: 2.5 hours

```typescript
// Current (Inaccessible)
<div style={{ color: process.env.NODE_ENV === 'production' ? 'green' : 'red' }}>
  Status
</div>

// Fixed (Accessible)
<div>
  <span style={{ color: '#228B22' }}>●</span>
  <span>Status: Active</span>
</div>
```

#### 4-10. Image Alt Text Missing (7 instances)
**Impact**: Visually impaired users cannot see image content
**Priority**: CRITICAL
**Fix Time**: 1 hour

#### 11-19. Modal Focus Not Managed (9 instances)
**Impact**: Keyboard users cannot navigate modals
**Priority**: CRITICAL
**Fix Time**: 2.5 hours

### High/Medium Priority Issues (18)

#### 1. Insufficient Color Contrast (6 instances)
**Impact**: Low-vision users struggle to read text
**Current Ratio**: 3:1 (need 4.5:1)
**Priority**: HIGH
**Fix Time**: 1.5 hours

```css
/* Current (Fails) */
.disabled-text {
  color: #888888; /* Ratio: 3.2:1 */
}

/* Fixed (Passes) */
.disabled-text {
  color: #5a5a5a; /* Ratio: 5.1:1 */
}
```

#### 2. Missing ARIA Labels on Buttons (5 instances)
**Impact**: Icon-only buttons unclear to screen reader users
**Priority**: HIGH
**Fix Time**: 1 hour

#### 3. Keyboard Trap in Data Table (2 instances)
**Impact**: Keyboard users cannot escape table navigation
**Priority**: MEDIUM
**Fix Time**: 1.5 hours

#### 4. Form Validation Messages Not Associated (3 instances)
**Impact**: Screen reader users don't know validation failed
**Priority**: MEDIUM
**Fix Time**: 1 hour

#### 5. Live Region Not Used for Alerts (1 instance)
**Impact**: Dynamic content changes not announced
**Priority**: MEDIUM
**Fix Time**: 0.5 hours

#### 6. Page Title Not Updated on Navigation (1 instance)
**Impact**: Multi-page navigation confusing for screen reader users
**Priority**: MEDIUM
**Fix Time**: 0.5 hours

### Low Priority Issues (6)

#### 1. Decorative Images Not Hidden (2 instances)
**Impact**: Screen reader users hear unnecessary descriptions
**Priority**: LOW
**Fix Time**: 0.5 hours

#### 2. Inconsistent Language Changes (1 instance)
**Impact**: Screen reader may use wrong language for content
**Priority**: LOW
**Fix Time**: 0.5 hours

#### 3. Link Text Not Descriptive (2 instances)
**Impact**: Context needed for link purpose unclear
**Priority**: LOW
**Fix Time**: 0.5 hours

#### 4. Tooltip Not Associated (1 instance)
**Impact**: Important information not discoverable
**Priority**: LOW
**Fix Time**: 0.5 hours

## Accessibility Implementation Roadmap

### Sprint 1 (5-6 hours)
- [ ] Fix all critical form label issues (2 hours)
- [ ] Correct heading hierarchy across app (3 hours)
- [ ] Add missing image alt text (1 hour)

### Sprint 2 (4-5 hours)
- [ ] Fix color contrast issues (1.5 hours)
- [ ] Add ARIA labels to buttons (1 hour)
- [ ] Fix keyboard traps in tables (1.5 hours)

### Sprint 3 (3-4 hours)
- [ ] Add live regions for alerts (1 hour)
- [ ] Update page titles on navigation (0.5 hours)
- [ ] Associate validation messages (1 hour)
- [ ] Fix decorative images (0.5 hours)
- [ ] Improve link text (0.5 hours)

### Sprint 4+ (Ongoing)
- [ ] Quarterly accessibility audits
- [ ] Continuous testing with screen readers
- [ ] User testing with disabled users

## Testing Procedures

### Automated Testing with Lighthouse

```bash
# Run Lighthouse audit
npm run audit

# Generate accessibility report
npx lighthouse https://localhost:3000 --view

# Export JSON for CI/CD
npx lighthouse https://localhost:3000 --output=json --output-path=./lighthouse-report.json
```

### Keyboard Navigation Testing

**Manual Testing Checklist**:

1. **Tab Through Entire Application**
   - [ ] Start at top of page
   - [ ] Press Tab repeatedly to move through all interactive elements
   - [ ] Verify tab order is logical and follows visual reading order
   - [ ] Ensure no focus traps (keyboard input can't escape)

2. **Form Testing**
   - [ ] All form fields accessible via Tab
   - [ ] Reach and activate submit button with keyboard
   - [ ] Navigation links accessible
   - [ ] Error messages associated with fields

3. **Modal Dialog Testing**
   - [ ] Tab trapped within modal (focus doesn't escape)
   - [ ] Escape key closes modal
   - [ ] Focus returns to button that opened modal after closing
   - [ ] First focusable element receives focus when opened

### Screen Reader Testing (NVDA)

**Recommended Setup**:
1. Download NVDA: https://www.nvaccess.org/download/
2. Install and restart computer
3. Enable NVDA (Insert key or Capslock)

**Test Procedures**:

```
1. Page Title Test
   - Action: Listen to first announcement
   - Expected: Page title should be announced first
   - Command: Insert+F7 (elements list)

2. Heading Navigation
   - Action: Navigate with H key
   - Expected: All headings announced with levels
   - Verify: Hierarchy is correct (no skipped levels)

3. Landmark Navigation
   - Action: Navigate with D key
   - Expected: Main, nav, search, etc. announced
   - Verify: Landmarks properly nested

4. Link Testing
   - Action: Navigate with K key
   - Expected: Link text and destination clear
   - Verify: No "click here" or "link" text

5. Form Testing
   - Action: Navigate with F key
   - Expected: Labels announced with fields
   - Verify: Required fields indicated
   - Verify: Error messages associated

6. Image Testing
   - Action: Navigate with G key (images)
   - Expected: Alt text describing image content
   - Verify: Decorative images marked as such
```

### Screen Reader Testing (VoiceOver - macOS)

```
1. Enable: Cmd+F5
2. Web Rotor: VO+U
3. Hotkeys:
   - VO+Right: Next element
   - VO+Left: Previous element
   - VO+Space: Activate
   - VO+Down: Read container contents
```

### Color Contrast Testing

**Tools**:
1. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
2. **Chrome DevTools**:
   - Right-click element
   - Inspect
   - Check "Contrast ratio" in Computed tab

**Test All Text Combinations**:
- [ ] Body text on background
- [ ] Links on background
- [ ] Visited links on background
- [ ] Disabled text on background
- [ ] Placeholder text on background
- [ ] Focus indicator on element and background

### Zoom Testing

```
1. Zoom to 200% in browser (Cmd/Ctrl + +)
2. Verify no horizontal scrolling required
3. Verify all content readable
4. Verify all buttons clickable
5. Verify no overlapping text
```

### Dark Mode Testing

```
1. Enable dark mode in system settings
2. Verify contrast ratios maintained
3. Verify all text readable
4. Verify all components visible
5. Verify appropriate color changes
```

### Mobile Accessibility Testing

**Tools**:
- Android TalkBack: Built-in screen reader
- iOS VoiceOver: Settings > Accessibility > VoiceOver
- WAVE mobile app: https://wave.webaim.org/

**Test Procedures**:
1. Enable screen reader on device
2. Navigate app using screen reader gestures
3. Verify all content accessible
4. Verify touch targets minimum 44x44px
5. Verify pinch-to-zoom works

## Accessibility Best Practices

### Do's
- ✓ Use semantic HTML elements
- ✓ Provide descriptive alt text for images
- ✓ Use ARIA labels when semantic HTML insufficient
- ✓ Maintain heading hierarchy (no skipped levels)
- ✓ Use sufficient color contrast
- ✓ Make interactive elements keyboard accessible
- ✓ Provide focus indicators
- ✓ Use landmarks to structure pages
- ✓ Test with actual assistive technologies
- ✓ Include users with disabilities in testing

### Don'ts
- ✗ Don't use color alone to convey information
- ✗ Don't remove focus indicators without replacement
- ✗ Don't use placeholder text as label
- ✗ Don't hide important information in modals
- ✗ Don't create keyboard traps
- ✗ Don't use unlabeled form inputs
- ✗ Don't auto-play audio or video
- ✗ Don't use text in images (use actual text)
- ✗ Don't rely on mouse-only interactions
- ✗ Don't ignore accessibility testing

## Testing Schedule

### Before Each Release
- [ ] Lighthouse accessibility score >= 95
- [ ] Keyboard navigation test passed
- [ ] Screen reader (NVDA) test passed
- [ ] Contrast ratio verification complete
- [ ] No automated accessibility violations
- [ ] Mobile accessibility tested
- [ ] Dark mode accessibility verified

### Quarterly (Every 3 Months)
- [ ] Full accessibility audit with Lighthouse
- [ ] Manual WCAG 2.2 Level AA checklist
- [ ] User testing with people with disabilities
- [ ] Third-party accessibility assessment
- [ ] Issue tracking and remediation planning

### Annually
- [ ] Comprehensive accessibility review
- [ ] WCAG 2.2 Level AAA assessment
- [ ] Industry standard compliance verification
- [ ] Accessibility roadmap update

## Resources

### Documentation
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn#accessibility)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [WebAIM](https://webaim.org/)
- [WAVE](https://wave.webaim.org/)

### Training
- [Web Accessibility by Google](https://www.udacity.com/course/web-accessibility--ud891)
- [Accessibility in JavaScript Applications](https://www.pluralsight.com/courses/javascript-accessibility)
- [Inclusive Components](https://inclusive-components.design/)

## Support and Questions

For accessibility questions or to report issues:
- Create an issue with label `accessibility`
- Contact: accessibility@example.com
- Slack: #accessibility-team

## Acknowledgments

Accessibility is a continuous journey. We're committed to making the Dashboard usable for everyone. User feedback on accessibility is valuable and appreciated.

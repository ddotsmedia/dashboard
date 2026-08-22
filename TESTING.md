# Testing Guide

## Overview

Comprehensive testing framework ensuring the Dashboard application meets quality, accessibility, and performance standards. This guide covers manual testing procedures, automated test strategies, and validation criteria.

## Manual Testing Checklist

### Pre-Test Setup
- [ ] Clear browser cache and localStorage
- [ ] Use latest browser version (Chrome, Firefox, Safari, Edge)
- [ ] Test on multiple devices (desktop, tablet, mobile)
- [ ] Disable browser extensions (may interfere with testing)
- [ ] Open DevTools (F12) for console error monitoring

### Core Functionality
- [ ] Dashboard loads within 3 seconds on 4G connection
- [ ] Summary metrics display correct data
- [ ] Chart visualizations render properly
- [ ] Transaction list displays all columns
- [ ] Alert notifications appear correctly
- [ ] Date filtering works on transactions
- [ ] Amount range filtering updates results
- [ ] Category filtering shows relevant transactions
- [ ] Search functionality finds transactions
- [ ] Sorting (amount, date, category) works
- [ ] Pagination displays correct pages
- [ ] "Load More" button loads additional results
- [ ] Refresh button updates data
- [ ] Empty states display appropriately

### User Interactions
- [ ] Clicking chart segments filters data
- [ ] Hovering tooltips appear with details
- [ ] Expanding transaction rows shows full details
- [ ] Modal dialogs open/close smoothly
- [ ] Form inputs accept proper values
- [ ] Form validation shows error messages
- [ ] Success notifications appear after actions
- [ ] Error notifications are dismissible
- [ ] Loading spinners indicate async operations
- [ ] Skeleton loaders appear on initial load

### Navigation
- [ ] Main navigation links work
- [ ] Breadcrumb navigation functions correctly
- [ ] Back button returns to previous page
- [ ] Deep links load correct content
- [ ] Page title updates on navigation
- [ ] Meta tags are appropriate
- [ ] Browser back/forward buttons work

### Performance Baseline
- [ ] Initial page load (First Contentful Paint) < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.5s
- [ ] No layout thrashing observed

## Keyboard Navigation Testing

### Essential Keyboard Commands

| Key | Expected Behavior | Notes |
|-----|-------------------|-------|
| Tab | Move focus to next element | Follow logical tab order |
| Shift+Tab | Move focus to previous element | Reverse logical order |
| Enter | Activate button or link | Submit forms, toggle modals |
| Space | Activate button or checkbox | Same as Enter for buttons |
| Escape | Close modal or dropdown | Return focus to trigger |
| Arrow Keys | Navigate menu items, adjust sliders | Context-dependent |
| Alt+[Letter] | Activate keyboard shortcut | When available |

### Keyboard Testing Procedures

#### 1. Tab Order Verification
- [ ] Tab through entire application without mouse
- [ ] Tab order follows logical reading order
- [ ] No focus traps (keyboard input can't escape)
- [ ] Focus visible on all interactive elements
- [ ] Focus indicator has sufficient contrast
- [ ] Focus indicator is at least 2px in size

#### 2. Form Navigation
- [ ] Tab moves between form fields
- [ ] All form fields accessible via keyboard
- [ ] Submit button activated with Enter
- [ ] Submit button activated with Space
- [ ] Form validation triggered on blur
- [ ] Error messages associated with fields
- [ ] Required field indicators present

#### 3. Menu Navigation
- [ ] Arrow keys navigate menu items
- [ ] Home/End keys go to first/last items
- [ ] Enter/Space activates menu item
- [ ] Escape closes menu
- [ ] Focus returns to menu trigger

#### 4. Modal Dialog Testing
- [ ] Tab confined within modal (focus trap)
- [ ] Escape closes modal
- [ ] Focus returns to trigger after closing
- [ ] Focus moved to first focusable element when opened
- [ ] Close button accessible via keyboard
- [ ] Cancel button accessible via keyboard

#### 5. Data Table Navigation
- [ ] Rows selectable with checkbox (Space/Enter)
- [ ] Column sortable via keyboard
- [ ] Pagination controls accessible
- [ ] Table header explains structure
- [ ] Scrollable table doesn't trap focus

### Keyboard Shortcuts (if implemented)
- [ ] Shortcuts documented in help
- [ ] Shortcuts don't conflict with browser shortcuts
- [ ] Shortcuts work in all contexts
- [ ] Shortcuts can be disabled in settings
- [ ] Shortcut keys displayed next to buttons

## Screen Reader Testing

### Supported Screen Readers
- [ ] NVDA (Windows, free)
- [ ] JAWS (Windows, commercial)
- [ ] VoiceOver (macOS/iOS built-in)
- [ ] TalkBack (Android built-in)

### Screen Reader Testing Procedures

#### 1. NVDA Testing (Windows)
```
Download: https://www.nvaccess.org/
Hotkey: Insert key (or Capslock if configured)
Commands:
  Insert+F7: Launch elements list
  Insert+F5: Refresh page
  Insert+H: Toggle heading detection
  Down Arrow: Read next line
  Up Arrow: Read previous line
```

**Test Checklist**:
- [ ] Page title announced first
- [ ] Headings announced with level (H1, H2, etc.)
- [ ] Landmarks announced (main, navigation, etc.)
- [ ] Links announced with accessible names
- [ ] Buttons announced with accessible names
- [ ] Form labels associated with inputs
- [ ] Required fields indicated
- [ ] Error messages associated with fields
- [ ] Images have alt text
- [ ] Decorative images marked as such
- [ ] Dynamic content updates announced
- [ ] Table headers associated with cells
- [ ] List structure preserved
- [ ] No unrelated aria-label on elements

#### 2. VoiceOver Testing (macOS/iOS)
```
Enable: System Preferences > Accessibility > VoiceOver
Hotkey: Cmd+F5
Commands:
  VO+U: Rotor (navigate by type)
  VO+Right: Next element
  VO+Left: Previous element
  VO+Space: Activate element
  VO+Down: Read selected container
```

**Test Checklist**:
- [ ] Page title announced
- [ ] All interactive elements announced
- [ ] Focus indicator visible
- [ ] Form labels readable
- [ ] Error messages clear
- [ ] Chart data accessible (table alternative)
- [ ] Images have descriptions

#### 3. Content Announcement Testing
- [ ] All text content readable
- [ ] Button purpose clear
- [ ] Link destination clear
- [ ] Form field purpose clear
- [ ] Required fields marked
- [ ] Error messages understandable
- [ ] Success messages announced
- [ ] Status updates announced (live regions)
- [ ] Loading states announced

#### 4. Landmark Navigation
- [ ] Main content landmark present
- [ ] Navigation landmark present
- [ ] Header landmark appropriate
- [ ] Footer landmark present
- [ ] Landmarks properly nested
- [ ] Skip to main content link functional
- [ ] Landmarks don't create redundancy

#### 5. Semantic Structure
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Heading hierarchy matches content structure
- [ ] Lists marked with `<ul>`, `<ol>`, `<li>`
- [ ] Emphasis markup (`<strong>`, `<em>`) used
- [ ] Quotes marked with `<blockquote>`
- [ ] Code marked with `<code>`, `<pre>`

#### 6. ARIA Usage
- [ ] ARIA attributes used correctly
- [ ] aria-label used for icon-only buttons
- [ ] aria-describedby links descriptions to inputs
- [ ] aria-live regions update appropriately
- [ ] aria-hidden hides decorative elements
- [ ] aria-expanded for collapsible content
- [ ] aria-disabled for disabled elements
- [ ] aria-selected for tab panels

#### 7. Dynamic Content
- [ ] Toast notifications announced
- [ ] Loading spinners have aria-busy
- [ ] Progress indicators have aria-valuenow
- [ ] Modals have role="dialog"
- [ ] Modals trap focus
- [ ] Alert messages use role="alert"
- [ ] Status updates use live regions

## Color Contrast Testing

### Contrast Requirements

| Element | Minimum Ratio | WCAG Level |
|---------|---------------|-----------|
| Normal Text | 4.5:1 | AA |
| Large Text (18pt+) | 3:1 | AA |
| UI Components | 3:1 | AA |
| Graphics | 3:1 | AA |

### Contrast Testing Tools

1. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
2. **Chrome DevTools**: Right-click element > Inspect > Computed tab
3. **Lighthouse**: Built into Chrome DevTools
4. **WAVE**: https://wave.webaim.org/ (browser extension)

### Manual Testing Procedures

#### 1. Text Contrast
- [ ] Body text (14px) 4.5:1 contrast
- [ ] Links 4.5:1 contrast with background
- [ ] Links distinguishable from surrounding text
- [ ] Placeholder text has sufficient contrast
- [ ] Disabled text readable (minimum 3:1)
- [ ] Error text readable (red text alone insufficient)
- [ ] Hover text maintains contrast

#### 2. Component Contrast
- [ ] Buttons have 3:1 contrast ratio
- [ ] Button text readable on background
- [ ] Input borders visible
- [ ] Input focus indicator visible
- [ ] Icons have sufficient contrast
- [ ] Icon + text combination readable
- [ ] Chart colors distinguishable

#### 3. Dark Mode Contrast
- [ ] All contrast requirements met in dark mode
- [ ] Text readable on dark backgrounds
- [ ] Components visible in dark theme
- [ ] No inverted contrast issues
- [ ] Sufficient light/dark ratio maintained

#### 4. Focus Indicators
- [ ] Focus outline 2px minimum thickness
- [ ] Focus outline visible on all backgrounds
- [ ] Focus outline contrasts with both element and background
- [ ] Focus outline clearly visible
- [ ] No focus-visible removed without replacement

### Testing with Lighthouse

```bash
# Run Lighthouse audit from Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Desktop" or "Mobile"
4. Check "Contrast" option
5. Click "Analyze page load"
6. Review contrast issues in report
```

## Lighthouse Audit Performance

### Target Scores

| Metric | Desktop | Mobile |
|--------|---------|--------|
| Performance | 95+ | 90+ |
| Accessibility | 95+ | 90+ |
| Best Practices | 95+ | 90+ |
| SEO | 95+ | 90+ |

### Web Vitals Targets

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Interaction to Next Paint (INP)**: < 200ms

### Lighthouse Testing Procedure

#### Desktop Audit
```bash
1. Open application in Chrome
2. Open DevTools (F12)
3. Click "Lighthouse" tab
4. Select "Desktop"
5. Uncheck "Simulate throttling"
6. Click "Analyze page load"
7. Review each category
8. Note issues and opportunities
```

#### Mobile Audit
```bash
1. Open DevTools with mobile simulation (Cmd+Shift+M)
2. Set device to Pixel 5 or similar
3. Click "Lighthouse" tab
4. Select "Mobile"
5. Keep "Simulate throttling" checked (default)
6. Click "Analyze page load"
7. Address flagged issues
```

#### Performance Improvements
- [ ] Lazy load images below fold
- [ ] Compress images to < 100KB each
- [ ] Minify and split CSS bundles
- [ ] Defer non-critical JavaScript
- [ ] Use production build (not development)
- [ ] Enable gzip compression
- [ ] Implement code splitting
- [ ] Remove unused dependencies

## Responsive Breakpoint Testing

### Supported Breakpoints

| Device | Width | Testing Focus |
|--------|-------|----------------|
| Mobile | 320px-480px | Small screens, touch targets |
| Mobile | 481px-768px | Medium phones, tablets |
| Tablet | 769px-1024px | Large tablets, small laptops |
| Desktop | 1025px+ | Desktop and larger screens |

### Responsive Testing Procedures

#### 1. Mobile Testing (320px-480px)
- [ ] Content fits without horizontal scroll
- [ ] Touch targets minimum 44x44px
- [ ] Text readable without zooming
- [ ] Images scale properly
- [ ] Navigation accessible (hamburger menu)
- [ ] Forms single column
- [ ] Buttons full width or center
- [ ] Bottom navigation or hamburger menu
- [ ] No two-column layout
- [ ] Modals fit screen
- [ ] Tables scrollable horizontally

#### 2. Small Tablet Testing (481px-768px)
- [ ] Navigation visible or accessible
- [ ] Two-column layout appropriate
- [ ] Images scale properly
- [ ] Forms well-organized
- [ ] Data tables readable
- [ ] Modals appropriate size
- [ ] Charts readable

#### 3. Large Tablet Testing (769px-1024px)
- [ ] Three-column layout functional
- [ ] Navigation sidebar visible
- [ ] Charts displayed optimally
- [ ] Data tables fully visible
- [ ] Whitespace appropriate
- [ ] Font sizes readable

#### 4. Desktop Testing (1025px+)
- [ ] Multi-column layout optimal
- [ ] Whitespace proportional
- [ ] Charts fully visible
- [ ] Tables with all columns visible
- [ ] Modals centered
- [ ] Sidebar navigation stable

### Using Chrome DevTools for Responsive Testing

```
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Cmd+Shift+M)
3. Select device from dropdown:
   - iPhone SE (375px)
   - iPhone 12/13 (390px)
   - Pixel 5 (393px)
   - Galaxy S10 (412px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Custom: Set any width
4. Test interactions and layout
5. Check DevTools console for errors
6. Test both portrait and landscape
```

## Dark Mode Testing

### Dark Mode Implementation Checklist
- [ ] Dark theme available in settings
- [ ] Default follows system preference
- [ ] Theme persists across sessions
- [ ] Toggle button accessible and clear
- [ ] Smooth theme transition animation
- [ ] All text readable in dark mode
- [ ] All interactive elements visible
- [ ] Images display appropriately
- [ ] Charts/graphs readable with colors
- [ ] Contrast ratios maintained
- [ ] No placeholder text overlaps

### Dark Mode Testing Procedures

#### 1. Visual Testing
- [ ] Enable dark mode in settings
- [ ] Verify all text readable
- [ ] Verify all images visible
- [ ] Verify all buttons visible
- [ ] Verify all form inputs visible
- [ ] Verify contrast adequate
- [ ] Verify no unreadable overlaps
- [ ] Verify charts distinguishable
- [ ] Verify icons visible
- [ ] Verify focus indicators visible

#### 2. System Preference Testing
```
macOS:
  System Preferences > General > Appearance > Dark
  
Windows:
  Settings > Personalization > Colors > Dark
  
Browser (Chrome DevTools):
  DevTools > Rendering > Emulate CSS media feature prefers-color-scheme
```

#### 3. Theme Toggle Testing
- [ ] Light mode button works in dark mode
- [ ] Dark mode button works in light mode
- [ ] Theme persists after page refresh
- [ ] Theme persists after browser close/open
- [ ] Theme preference saved to localStorage

## Internationalization (i18n) Testing

### Supported Languages
- [ ] English (en-US)
- [ ] Arabic (ar-SA)

### i18n Testing Procedures

#### 1. Language Switching
- [ ] Language dropdown accessible
- [ ] Language switch changes all UI text
- [ ] Language persists across sessions
- [ ] Browser language preference respected
- [ ] Date formats change per locale
- [ ] Number formats change per locale
- [ ] Currency symbols change per locale

#### 2. Right-to-Left (RTL) Testing (Arabic)
- [ ] Layout mirrors correctly
- [ ] Navigation flows right-to-left
- [ ] Text direction correct
- [ ] Images positioned correctly
- [ ] Icons positioned correctly
- [ ] Form inputs right-aligned
- [ ] Numbers display correctly (left-to-right within RTL)
- [ ] No placeholder text direction issues
- [ ] Modals positioned correctly
- [ ] Charts/graphs oriented correctly

#### 3. Text Content
- [ ] No hardcoded text in components
- [ ] All text in translation files
- [ ] Translations complete for both languages
- [ ] No untranslated phrases visible
- [ ] Abbreviations translated
- [ ] Tooltips translated
- [ ] Alt text translated
- [ ] Placeholders translated
- [ ] Validation messages translated
- [ ] Error messages translated

#### 4. Character Support
- [ ] Arabic characters display correctly
- [ ] Special characters supported
- [ ] Diacritical marks appear correctly
- [ ] Long text wraps appropriately
- [ ] Font supports all characters

### Translation Testing Checklist
- [ ] All UI text translated
- [ ] All button labels translated
- [ ] All error messages translated
- [ ] All validation messages translated
- [ ] All tooltips translated
- [ ] All modal content translated
- [ ] All form labels translated
- [ ] No missing translations (check console for warnings)
- [ ] Professional translation quality (not just Google Translate)
- [ ] Culturally appropriate content

## Role-Based Access Control (RBAC) Testing

### User Roles
- [ ] Admin: Full access to all features
- [ ] User: Can view and manage own data
- [ ] Guest: Limited read-only access

### RBAC Testing Procedures

#### 1. Admin Role Testing
- [ ] Can view all users' data
- [ ] Can edit system settings
- [ ] Can manage user accounts
- [ ] Can export data
- [ ] Can access analytics
- [ ] Admin-only menu items visible
- [ ] Admin routes accessible
- [ ] Admin modals available

#### 2. User Role Testing
- [ ] Can view own dashboard
- [ ] Can view own transactions
- [ ] Can create transactions
- [ ] Cannot view other users' data
- [ ] Cannot access admin features
- [ ] Cannot edit settings
- [ ] User-specific menu items visible
- [ ] User routes accessible

#### 3. Guest Role Testing
- [ ] Can view public data only
- [ ] Cannot create/edit data
- [ ] Cannot access user features
- [ ] Limited menu items
- [ ] Cannot access authenticated routes
- [ ] Guest routes accessible

#### 4. Permission Enforcement
- [ ] Direct URL access to restricted pages redirects
- [ ] API requests for unauthorized resources fail
- [ ] Buttons for restricted actions hidden
- [ ] Menu items for restricted features hidden
- [ ] API returns 403 for unauthorized access
- [ ] Session timeout redirects to login
- [ ] Token expiration handled correctly

## Error and Loading States Testing

### Error State Testing

#### 1. Network Errors
- [ ] No internet connection shows appropriate message
- [ ] Timeout errors display with retry option
- [ ] 404 errors show user-friendly message
- [ ] 500 errors show generic message (no technical details)
- [ ] Error page/component accessible
- [ ] Error can be dismissed
- [ ] Can retry failed request
- [ ] Error logged to monitoring service

#### 2. Validation Errors
- [ ] Required fields show error when empty
- [ ] Email format validation works
- [ ] Number range validation works
- [ ] Date format validation works
- [ ] Error message clear and actionable
- [ ] Error message near field
- [ ] Error icon/color visible
- [ ] Multiple errors shown
- [ ] Error text color contrasts

#### 3. Application Errors
- [ ] Unhandled errors caught gracefully
- [ ] Error boundary displays fallback UI
- [ ] Error message user-friendly
- [ ] User can recover from error
- [ ] Error reported (if implemented)
- [ ] No console errors visible
- [ ] No blank/white screens on error

#### 4. Empty States
- [ ] Empty state message clear
- [ ] Empty state has helpful guidance
- [ ] Empty state image/icon visible
- [ ] CTA button for empty state present
- [ ] Empty state accessible
- [ ] No confusing empty state messages

### Loading State Testing

#### 1. Skeleton Loaders
- [ ] Skeleton placeholders match content size
- [ ] Animation smooth and not distracting
- [ ] Skeleton loaders appear immediately
- [ ] Actual content replaces skeleton smoothly
- [ ] Accessible (aria-busy or skeleton role)
- [ ] Multiple skeletons animate uniformly

#### 2. Loading Spinners
- [ ] Spinner appears during async operations
- [ ] Spinner centered and visible
- [ ] Spinner animation smooth
- [ ] Spinner has accessible label
- [ ] Spinner disappears when loading complete
- [ ] Spinner doesn't block user interaction (if appropriate)

#### 3. Progress Indicators
- [ ] Progress bar shows during long operations
- [ ] Progress percentage accurate
- [ ] Progress can be cancelled
- [ ] Progress updates smoothly
- [ ] Can retry if cancelled

#### 4. Disabled States
- [ ] Buttons disable during submission
- [ ] Disabled buttons not keyboard accessible
- [ ] Disabled buttons appear disabled (visual)
- [ ] Disabled form fields appear disabled
- [ ] Cannot submit while loading
- [ ] Feedback given when action in progress

## Accessibility Audit Tools

### Automated Tools
1. **Lighthouse**: Built into Chrome DevTools
2. **axe DevTools**: https://www.deque.com/axe/devtools/
3. **WAVE**: https://wave.webaim.org/
4. **NVDA Screen Reader**: https://www.nvaccess.org/
5. **Colour Contrast Analyzer**: https://www.tpgi.com/color-contrast-checker/

### Testing Workflow

```
1. Run Lighthouse accessibility audit
2. Fix identified issues
3. Run WAVE analysis
4. Fix identified issues
5. Manual keyboard navigation test
6. Manual screen reader test (NVDA)
7. Manual contrast verification
8. Manual RTL/i18n verification
9. Code review for semantic HTML
10. Re-test with automation tools
```

## Continuous Testing

### Automated Testing Setup
```bash
# Run all tests
npm test

# Run specific test suite
npm test -- accessibility

# Generate coverage report
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```

### Pre-Commit Hooks
- [ ] Automated tests run before commit
- [ ] Linting checks pass
- [ ] No console errors/warnings
- [ ] Accessibility checks pass

### CI/CD Pipeline
- [ ] Tests run on every PR
- [ ] Lighthouse scores reported
- [ ] Accessibility violations flagged
- [ ] Performance metrics tracked

## Test Documentation

### Test Case Template
```
Test Case ID: TC-001
Title: Dashboard loads and displays summary
Preconditions: User logged in, network available
Steps:
  1. Navigate to dashboard
  2. Wait for content to load
Expected Result: Dashboard visible, metrics displayed, no errors
Acceptance Criteria:
  - Page loads in < 3 seconds
  - All metrics visible
  - No console errors
  - Contrast ratio meets WCAG AA
```

## Reporting Test Results

### Bug Report Template
```
Title: [Component] [Issue]
Severity: Critical / High / Medium / Low
Browser: [Browser and version]
Device: [Device type and screen size]
Steps to Reproduce:
  1.
  2.
Expected Behavior:
Actual Behavior:
Screenshots/Video:
Console Errors:
```

## Testing Checklist by Release

### Pre-Release Testing
- [ ] All manual tests passed
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] Contrast ratios verified
- [ ] Lighthouse scores above targets
- [ ] Responsive design tested
- [ ] Dark mode tested
- [ ] All languages tested
- [ ] All user roles tested
- [ ] Error states tested
- [ ] Performance meets targets
- [ ] No console errors

### Post-Release Monitoring
- [ ] Monitor error logs
- [ ] Track performance metrics
- [ ] Gather user feedback
- [ ] Fix critical issues immediately
- [ ] Plan fixes for non-critical issues

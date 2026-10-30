# Single-Creative Analytics & Spotlight Inspector

Deliver an interactive **Single-Creative Inspection Mode** inside the **Performance → Creatives** dashboard (and accessible in one click from **Overview → Top Creatives**) that dynamically recalibrates the top KPI clusters, Conversion Funnel, and Trend Chart to any selected creative while displaying a dedicated **Creative Spotlight & Retention Panel**.

## User Review & Critical Decisions

> [!IMPORTANT]
> The design decisions below reflect your confirmed choices from our brainstorming phase:

- **Confirmed Display Pattern**: **Filter dashboard in-place + Creative Spotlight card** — selecting a creative dynamically recalculates the 4 top KPI clusters, Sankey Conversion Funnel, and Conversion Metrics Trend chart for that specific ad, and reveals a rich **Creative Spotlight Panel** above the table.
- **Confirmed Entry Points**:
  1. **Performance → Creatives**: Clicking any row in the **Creative Performance** table or choosing an ad from a new **`Creative: All creatives ▾`** top dropdown filter.
  2. **Overview → Top Creatives**: Clicking the Top Creative summary card or any of the 4 **Top creatives this week** cards (`UGC-042`, `UGC-038`, `STA-017`, `UGC-029`) navigates straight to `Performance → Creatives` with that creative pre-selected.
- **Confirmed Specialized Single-Creative Metrics**:
  1. **Video / Creative Retention Curve**: Interactive SVG drop-off curve tracking **Thumbstop (0–2s) → 3s Hold → 50% Watch → 100% Completion → CTA Click**.
  2. **Element DNA Tags & Lift Attribution**: Breakdown of the specific Hook, Visual style, Format, and CTA inside that creative with their individual CTR lift percentages (`+32%`, `+24%`, etc.) and Brand DNA score.
  3. **Fatigue & Frequency Gauge with One-Click Remix**: Visual frequency meter (`1.8x` to `4.4x`), fatigue status indicator (`Scaling`, `Active`, `Fatigue Watch`), and a direct **`Remix creative`** / **`Open in Studio`** action.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms the `Performance → Creatives` tab from a static aggregate report into a dual-mode workspace. In **All Creatives** mode, it shows account-wide creative metrics. When a single creative is selected, every metric cluster, funnel stage, and trend line updates to reflect that individual creative's performance, accompanied by a dedicated **Creative Spotlight Card** with retention diagnostics, Element DNA attribution, and fatigue controls.
- **Target Audience / Persona**: Growth marketers and creative directors at Mochi & Bean diagnosing why a specific dog-cap ad (like `UGC-042 · Corgi Sunny Walk`) is outperforming or fatiguing, and deciding whether to scale or remix it.
- **Key Value**: Eliminates context switching between aggregate tables and creative diagnostics—letting users click through rows in the Creative Performance table and immediately compare each ad's funnel, retention curve, and DNA elements in place.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **From Overview (`Top Creatives`)**: Clicking `UGC-042`, `UGC-038`, `STA-017`, or `UGC-029` switches the active view to `Performance`, activates the `Creatives` sub-tab, and sets `selectedCreativeFilterId` to that creative.
  2. **From Performance Top Bar (`Creative Selector`)**: When on the `Creatives` sub-tab, a new pill dropdown (`All creatives (7)` vs. individual creatives like `UGC-042 · Corgi Sunny Walk`) appears in the top filter bar alongside Campaign and Date filters, with a quick `× Clear` badge when a single creative is active.
  3. **From Creative Performance Table**: Clicking any row in the bottom `Creative Performance` table selects (or deselects) that creative, highlighting the active row with an ice-blue (`#ACD9F3`) left accent border and updating the entire dashboard above it.
  4. **Inside the Creative Spotlight Card**: Users can inspect the creative's preview image, hook copy, **Video Retention Curve** (Thumbstop → 3s → 50% → 100%), **Element DNA Attribution** tags (clicking an element tag jumps to the `Elements` sub-tab with that element highlighted), and **Fatigue & Frequency Gauge** with one-click **Remix variations** or **Open in Studio** buttons.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Dark precision analytics workspace matching the AdStudio token system (`#08090B` shell, `#121419` primary panels, `#1A1D24` inner tiles, `#252831` borders).
  - *Color Palette & Semantic Accents*:
    - Ice-Blue (`#ACD9F3`): Active creative selection border, retention curve primary stroke, and interactive filter controls.
    - Mint (`#66D4AA`): Positive lift tags (`+32% CTR lift`), healthy frequency (`< 2.5x`), and scaling status.
    - Lavender (`#BEB0F4` / `#292638`): AI Element DNA attribution insights and one-click Remix actions.
    - Amber (`#F4C36A`) & Coral (`#F18E87`): High frequency (`> 3.8x`) and Creative Fatigue alerts.
  - *Typography & Hierarchy*: `Outfit` for headings and metric values; `JetBrains Mono` / `tabular-nums` for all CTRs, spend, frequency multipliers, and retention percentages so numbers never jitter when switching between creatives.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: In-Place Dashboard Recalculation + Collapsible Spotlight Banner**
  - *Chosen Approach*: Keep the 4 KPI clusters, Sankey Conversion Funnel, and Trend Chart visible and recalculate their numbers for the selected creative, while inserting the **Creative Spotlight Card** right above the funnel/table.
  - *Why*: Preserves the familiar mental model of the dashboard so users can see how a single creative's funnel and efficiency metrics compare to the overall account structure, while adding creative-specific diagnostics (retention curve, DNA tags, fatigue gauge) that don't apply at the aggregate level.
  - *Alternatives Considered*: Opening a modal dialog over the page (rejected because it blocks clicking through multiple rows in the Creative Performance table to compare ads side by side).

- **Decision 2: Shared Context State (`selectedPerformanceCreativeId`)**
  - *Chosen Approach*: Store `selectedPerformanceCreativeId: string | null` in `AppContext` (paired with a helper `inspectCreativePerformance(creativeCodeOrId)`).
  - *Why*: Allows seamless deep-linking from `OverviewView` (Top Creatives cards) straight into `PerformanceView` (`Creatives` sub-tab) with zero prop-drilling.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                               AppContext                                   │
│  • currentView ('overview' | 'performance' | 'studio' | ...)               │
│  • performanceTab ('Campaigns' | 'Creatives' | 'Elements')                 │
│  • selectedPerformanceCreativeId: string | null                            │
│  • inspectCreativePerformance(idOrCode: string)                            │
└───────────────────┬────────────────────────────────────┬───────────────────┘
                    │                                    │
                    ▼                                    ▼
┌───────────────────────────────────────┐  ┌─────────────────────────────────┐
│             OverviewView              │  │         PerformanceView         │
│  • Top Creative KPI Card (UGC-042)    │  │  • Top Filter Bar               │
│  • Top Creatives This Week (4 cards)  │  │    └─ Creative Selector Pill    │
│    └─ onClick -> inspectCreative()    │  │  • [When Creative Selected]:    │
└───────────────────────────────────────┘  │    ├─ Creative Spotlight Panel  │
                                           │    │  ├─ Ad Preview & Hook Copy │
                                           │    │  ├─ Retention Curve SVG    │
                                           │    │  ├─ Element DNA & Lift     │
                                           │    │  └─ Fatigue Gauge & Remix  │
                                           │    ├─ Recalculated 4 KPI Cards  │
                                           │    ├─ Single-Ad Sankey Funnel   │
                                           │    └─ Single-Ad Trend Chart     │
                                           │  • Creative Performance Table   │
                                           │    └─ Row click toggles focus   │
                                           └─────────────────────────────────┘
```

### Data Model & Enriched Creative Telemetry

Each record in `CREATIVE_PERFORMANCE_DATA` will be enriched with deterministic single-creative telemetry:
- `frequency`: Number (e.g., `2.1` for scaling ads, `4.1` for fatigued ads)
- `fatigueScore`: `'Low' | 'Moderate' | 'High'`
- `brandScore`: Number (`91`–`96`)
- `retentionCurve`: `{ thumbstop: number; hold3s: number; watch50: number; watch100: number; ctaClick: number }` (for static images, represents `Impression → Attention Dwell → Detail Zoom → Product Click`)
- `dnaElements`: Array of `{ label: string; category: 'Hook' | 'Visual' | 'Format' | 'CTA'; lift: string; positive: boolean }`
- `dailySeries`: 10-point daily array so the Conversion Metrics Trend chart renders a unique, realistic trajectory for each creative.

### Interactive Component & State Mapping

1. **Overview → Performance Deep Link**: Clicking any Top Creative card in `OverviewView` calls `inspectCreativePerformance('cr-1')`, which sets `currentView = 'performance'`, `performanceTab = 'Creatives'`, and `selectedPerformanceCreativeId = 'cr-1'`.
2. **In-Place Table & Dropdown Selection**: Clicking any row in the `Creative Performance` table (or choosing from the top `Creative` dropdown) sets `selectedPerformanceCreativeId`. Clicking the active row again or clicking `Reset to All Creatives` sets it back to `null`.
3. **One-Click Actions Inside Spotlight**:
   - Clicking **Open in Studio** jumps to `StudioView` with the matching concept selected.
   - Clicking **Remix variations** opens the Remix modal (`setIsRemixModalOpen(true)`) pre-contextualized for that creative.
   - Clicking any **Element DNA tag** switches `performanceTab` to `'Elements'` so the user can inspect cross-campaign evidence for that element.

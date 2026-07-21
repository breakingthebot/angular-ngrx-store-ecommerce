# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-20

### Added
- Created `CatalogComponent` rendering responsive product card grid layouts with hover zoom states.
- Implemented category filter chips, search input lookups, and price/rating sorting selectors.
- Configured sticky navigation top bar in `AppComponent` with brand badges and navigation links.
- Wrote unit specs verifying grid card rendering, search input lookups, and category filter selections.

## [0.1.0] - 2026-07-20

### Added
- Bootstrapped Angular 19 standalone application with NgRx Store, Effects, and Store-DevTools.
- Built `Product` data model and `ProductService` providing 6 detailed e-commerce mock items with simulated network latency.
- Configured catalog state slice actions, reducers, selectors, and async side effect handlers.
- Created `karma.conf.js` specifying `ChromeHeadless` execution for background unit tests.

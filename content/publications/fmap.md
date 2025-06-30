---
title: Generating ensembles of spatially-coherent in-situ forecasts using flow matching
authors: David Landry, Claire Monteleoni and Anastase Charantonis
doi: 10.48550/arXiv.2504.03463
arxiv: 2504.03463
pinned: true
date: 2025-04-25
type: Preprint
abstract: |
  We propose a machine-learning-based methodology for in-situ weather forecast
  postprocessing that is both spatially coherent and multivariate. Compared to previous work,
  our Flow MAtching Postprocessing (FMAP) better represents the correlation structures of the
  observations distribution, while also improving marginal performance at the stations. FMAP
  generates forecasts that are not bound to what is already modeled by the underlying gridded
  prediction and can infer new correlation structures from data. The resulting model can generate
  an arbitrary number of forecasts from a limited number of numerical simulations, allowing for
  low-cost forecasting systems. A single training is sufficient to perform postprocessing at multiple
  lead times, in contrast with other methods which use multiple trained networks at generation time.
  This work details our methodology, including a spatial attention transformer backbone trained
  within a flow matching generative modeling framework. FMAP shows promising performance in
  experiments on the EUPPBench dataset, forecasting surface temperature and wind gust values at
  station locations in western Europe up to five-day lead times.
---



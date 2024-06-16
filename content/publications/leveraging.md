---
title: Leveraging deterministic weather forecasts for in-situ probabilistic temperature predictions via deep learning
authors: David Landry, Anastase Charantonis and Claire Monteleoni
venue: Monthly Weather Review
doi: 10.1175/MWR-D-23-0273.1
arxiv: 2406.02141
pinned: true
date: 2024-06-11
abstract: |
  We propose a neural network approach to produce probabilistic weather forecasts from a deterministic numerical weather prediction. Our approach is applied to operational surface temperature outputs from the Global Deterministic Prediction System up to ten-day lead times, targeting METAR observations in Canada and the United States. We show how postprocessing performance is improved by training a single model for multiple lead times. Multiple strategies to condition the network for the lead time are studied, including a supplementary predictor and an embedding. The proposed model is evaluated for accuracy, spread, distribution calibration, and its behavior under extremes. The neural network approach decreases CRPS by 15% and has improved distribution calibration compared to a naive probabilistic model based on past forecast errors. Our approach increases the value of a deterministic forecast by adding information about the uncertainty, without incurring the cost of simulating multiple trajectories. It applies to any gridded forecast including the recent machine learning-based weather prediction models. It requires no information regarding forecast spread and can be trained to generate probabilistic predictions from any deterministic forecast.
---



---
title: "coursera机器学习第一周笔记"
categories: "technology"
tags:
  - machine-learning
---


---

## machine learning

supervised learning, unsupervised learning, others(reinforcement learning, recommender system)

### supervised learning

regressing，predict input into continuous result

classification, predict input into distract result

examples：

given size, rooms, predict house price, like 1M, 100Grand, 1B house prize is expensive or cheap ?

given picture with human, predict his age: 0.1，12.5，78.8

given a patient with tumor, predict it's a malignant or benign

### unsupervised learning

problems with little or no idea what our results should look like

derive structure from data

clustering the data based on relationships among the variables in the data.

there is no feedback based on the prediction results

examples：

Clustering: Take a collection of 1,000,000 different genes, and find a way to automatically group these genes into groups that are somehow similar or related by different variables, such as lifespan, location, roles, and so on.
Non-clustering: The "Cocktail Party Algorithm", allows you to find structure in a chaotic environment. (i.e. identifying individual voices and music from a mesh of sounds at a cocktail party).

Linear Regression with one var

cost function

$$J(\theta) = \frac{1}{m} \sum _{i=1}^m {\frac{1}{2}(h(\theta x^{(i)})-y^{(i)})^2} = \frac{1}{m} \sum _{i=1}^m Cost(h(\theta x^{(i)}), y^{(i)})$$

gradient descent

$$\theta _j := \theta _j - \alpha \frac{\partial J(\theta)}{\partial \theta _j}$$

repeat until convergence:



pay attention to the simultaneous update:


about the alpha, gradient

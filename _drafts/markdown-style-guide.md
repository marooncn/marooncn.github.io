---
title: "写作样式参考（草稿，不会发布）"
description: 演示 Blog 支持的各种 Markdown 元素，写新文章时可对照参考。
date: 2026-11-11
math: true
---

`_drafts/` 下的文章不会发布。本地预览草稿：`bundle exec jekyll serve --drafts`。

## 标题与段落

正文段落。**加粗**、*斜体*、`inline code`、[链接](https://github.com/marooncn)。中英文混排时 English words 与中文之间建议加空格。

### 三级标题

- 无序列表项
- 第二项
  - 嵌套项

1. 有序列表
2. 第二项

> 引用块：Reinforcement learning is learning what to do—how to map situations to actions—so as to maximize a numerical reward signal.

## 公式

行内公式写成 $$\pi_\theta(a \mid s)$$，独立公式单独成段：

$$
\mathcal{L}_{\text{FM}}(\theta) = \mathbb{E}_{t, x_0, x_1} \left\| v_\theta(x_t, t) - (x_1 - x_0) \right\|^2
$$

## 代码

```python
import torch

def flow_matching_loss(model, x0, x1):
    """Conditional flow matching loss."""
    t = torch.rand(x0.shape[0], 1)
    xt = (1 - t) * x0 + t * x1
    return ((model(xt, t) - (x1 - x0)) ** 2).mean()
```

## 表格

| Model | NAVSIM v1 | NAVSIM v2 |
|---|---|---|
| Baseline | 85.0 | 83.1 |
| **HyWorldVLA** | **90.6** | **89.7** |

## 图片与视频

![navbot](/img/navbot-env.png)
*图 1：图片下方紧跟一行斜体文字作为图注。*

<video src="/img/rl-narrowdoor.mp4" autoplay loop muted playsinline width="560"></video>

## 脚注

这里有一个脚注[^1]。

[^1]: 脚注内容会显示在文末。

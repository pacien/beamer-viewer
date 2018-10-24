---
title: Beamer Viewer demonstration
author: Pacien TRAN-GIRARD (CC BY-NC-SA)
date: August 24, 2018

theme: metropolis
header-includes: |
  \usepackage{pgfpages}
  \setbeameroption{show notes on second screen}
---

# What is Beamer Viewer?

* A Beamer presentation viewer

* that runs in a web browser

* and displays speaker notes alongside the slides


::: notes
* A presentation viewer for Beamer

* that runs in _fairly recent_ web browsers

* and keeps speaker notes in sync with the slides
:::


# Beamer Viewer is web-based

* No installation is required

* It can be used on a provided computer

* It is offline capable


::: notes
* No installation required: just visit the website and load a presentation
* -> If your presentation room has a desktop computer with a web browser, you can use it! No need to setup your laptop.


Offline capability:

* The presentation is rendered locally, it's not sent to the server.
* The app remains in the browser's cache and can be used offline, so you can bring your laptop and do presentations in places with no Internet connection, or avoid the hassle of asking for the WiFi passphrase
:::


# Slides and speaker notes

* Slides and speaker notes are opened in two separate windows

* One for the speaker's screen, the other to be projected

* Both are kept in sync automatically


::: notes
* Takes a double-width presentation PDF as input, with slides on the left and speaker notes on the right, and splits it into two separate windows.

* One for the speaker's screen, the other to be projected for the audience: simply move those windows around and press the `F11` key to enter fullscreen mode

* Both are kept in sync: use the keyboard arrows or swipe gestures on either one of the windows, the other will follow automatically
:::


# Beamer with notes in \LaTeX


```{.latex .numberLines}
\documentclass{beamer}
\usepackage{pgfpages}
\setbeameroption{show notes on second screen}

\begin{document}
  \begin{frame}{Slide title}
    Slide content
  \end{frame}
  \note{Some notes}
\end{document}
```

::: notes
Here's how to make a Beamer presentation with notes in classic LaTeX.

* `show notes on second screen` is set at line 3

* notes for the sldie are added at line 9
:::


# Beamer with notes in Pandoc Markdown

```{.markdown .numberLines}
---
header-includes: |
  \usepackage{pgfpages}
  \setbeameroption{show notes on second screen}
---

# Slide title

Slide content

::: notes
Some notes
:::
```

::: notes
Here's how to do the same using Markdown and Pandoc.

* the Beamer note option is set in `header-includes`

* notes are added to the slide at line 11-13
:::



# {.standout}

This was a demo of Beamer Viewer

::: notes
* Please submit issues on the bug tracker if you encounter any!

* Code contributions are welcome!
:::
